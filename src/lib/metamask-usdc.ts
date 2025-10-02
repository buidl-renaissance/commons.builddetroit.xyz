// MetaMask USDC transaction integration
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
      on: (event: string, callback: (accounts: string[]) => void) => void;
      removeListener: (event: string, callback: (accounts: string[]) => void) => void;
    };
  }
}

// USDC contract address on Base
const USDC_CONTRACT_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';

// USDC contract method signatures
// balanceOf(address): 0x70a08231
// transfer(address,uint256): 0xa9059cbb

export interface MetaMaskTransactionResult {
  success: boolean;
  txHash?: string;
  error?: string;
}

export async function checkMetaMaskConnection(): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  
  if (!window.ethereum) {
    throw new Error('MetaMask is not installed. Please install MetaMask to continue.');
  }

  try {
    // Request account access
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }) as string[];
    return accounts.length > 0;
    } catch {
      throw new Error('Failed to connect to MetaMask');
    }
}

export async function getCurrentNetwork(): Promise<{ chainId: string; isBase: boolean }> {
  if (!window.ethereum) {
    throw new Error('MetaMask is not installed');
  }

  const chainId = await window.ethereum.request({ method: 'eth_chainId' }) as string;
  const isBase = chainId === '0x2105' || chainId === '8453'; // Base mainnet
  
  return { chainId, isBase };
}

export async function switchToBaseNetwork(): Promise<void> {
  if (!window.ethereum) {
    throw new Error('MetaMask is not installed');
  }

  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x2105' }], // Base mainnet
    });
    } catch (switchError: unknown) {
    // This error code indicates that the chain has not been added to MetaMask
    if ((switchError as { code?: number })?.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0x2105',
              chainName: 'Base',
              rpcUrls: ['https://mainnet.base.org'],
              blockExplorerUrls: ['https://basescan.org'],
              nativeCurrency: {
                name: 'Ethereum',
                symbol: 'ETH',
                decimals: 18,
              },
            },
          ],
        });
      } catch {
        throw new Error('Failed to add Base network to MetaMask');
      }
    } else {
      throw new Error('Failed to switch to Base network');
    }
  }
}

export async function getUSDCBalance(address: string): Promise<string> {
  if (!window.ethereum) {
    throw new Error('MetaMask is not installed');
  }

  try {
    // Use direct contract call via eth_call
    const balanceHex = await window.ethereum.request({
      method: 'eth_call',
      params: [
        {
          to: USDC_CONTRACT_ADDRESS,
          data: `0x70a08231000000000000000000000000${address.slice(2)}` // balanceOf(address) method call
        },
        'latest'
      ]
    }) as string;
    
    // Convert from hex to decimal (6 decimals for USDC)
    const balanceDecimal = parseInt(balanceHex, 16);
    return (balanceDecimal / Math.pow(10, 6)).toString();
  } catch (error) {
    console.error('USDC balance fetch error:', error);
    throw new Error('Failed to fetch USDC balance');
  }
}

export async function sendUSDCPayout(
  amountCents: number,
  recipientAddress: string
): Promise<MetaMaskTransactionResult> {
  try {
    // Check MetaMask connection
    await checkMetaMaskConnection();

    // Check network
    const { isBase } = await getCurrentNetwork();
    if (!isBase) {
      await switchToBaseNetwork();
    }

    // Validate inputs
    if (!amountCents || amountCents <= 0) {
      throw new Error('Invalid amount');
    }

    if (!recipientAddress || !recipientAddress.match(/^0x[a-fA-F0-9]{40}$/)) {
      throw new Error('Invalid recipient address');
    }

    // Get current account
    if (!window.ethereum) {
      throw new Error('MetaMask is not installed');
    }
    const accounts = await window.ethereum.request({ method: 'eth_accounts' }) as string[];
    if (accounts.length === 0) {
      throw new Error('No MetaMask account connected');
    }

    const senderAddress = accounts[0];

    // Check USDC balance
    const balance = await getUSDCBalance(senderAddress);
    const requiredAmount = (amountCents / 100).toString();
    
    if (parseFloat(balance) < parseFloat(requiredAmount)) {
      throw new Error(`Insufficient USDC balance. Required: $${requiredAmount}, Available: $${balance}`);
    }

    // Convert amount to USDC units (6 decimals)
    const amountInUSDC = Math.floor(amountCents * 10000); // Convert cents to smallest USDC unit
    const amountHex = '0x' + amountInUSDC.toString(16);

    // Send transaction using eth_sendTransaction
    const tx = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [
        {
          to: USDC_CONTRACT_ADDRESS,
          from: senderAddress,
          data: `0xa9059cbb000000000000000000000000${recipientAddress.slice(2)}${amountHex.slice(2).padStart(64, '0')}` // transfer(address,uint256) method call
        }
      ]
    }) as string;

    return {
      success: true,
      txHash: tx
    };

  } catch (error) {
    console.error('USDC payout error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

export async function waitForTransaction(txHash: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    if (!window.ethereum) {
      reject(new Error('MetaMask is not available'));
      return;
    }

    const checkTransaction = async () => {
      try {
        if (!window.ethereum) {
          reject(new Error('MetaMask is not available'));
          return;
        }
        const receipt = await window.ethereum.request({
          method: 'eth_getTransactionReceipt',
          params: [txHash]
        }) as { status?: string };

        if (receipt && receipt.status === '0x1') {
          resolve(true);
        } else if (receipt && receipt.status === '0x0') {
          reject(new Error('Transaction failed'));
        } else {
          // Transaction not yet mined, check again in 2 seconds
          setTimeout(checkTransaction, 2000);
        }
      } catch (err) {
        reject(err);
      }
    };

    // Start checking after 2 seconds
    setTimeout(checkTransaction, 2000);
  });
}
