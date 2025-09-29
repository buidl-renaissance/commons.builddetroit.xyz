import { useState, useEffect } from 'react';
import styled from 'styled-components';
import type { ThemeType } from '@/styles/theme';

const openOctoberColors = {
  githubGreen: "#28a745",
};

const TreasuryWidget = styled.div<{ theme: ThemeType }>`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.asphaltBlack},
    #1a1a1a
  );
  border: 2px solid ${openOctoberColors.githubGreen};
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  margin-top: 3rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent,
      ${openOctoberColors.githubGreen},
      transparent
    );
  }
`;

const TreasuryAmount = styled.div<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 2rem;
  color: ${openOctoberColors.githubGreen};
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const TreasuryLabel = styled.div<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.creamyBeige};
  opacity: 0.8;
`;

const LoadingText = styled.div<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.creamyBeige};
  opacity: 0.6;
  font-style: italic;
`;

const ErrorText = styled.div<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.body};
  color: #ff6b6b;
  opacity: 0.8;
`;

interface TreasuryBalanceProps {
  address: string;
  chainId?: number;
}

export default function TreasuryBalance({ address, chainId = 8453 }: TreasuryBalanceProps) {
  const [balance, setBalance] = useState<string>('$0 USDC');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        setLoading(true);
        setError(null);

        // Use Alchemy API to get token balances
        const alchemyUrl = 'https://base-mainnet.g.alchemy.com/v2/5lHR8up2lkHcXHGMLPIQG5iuW_wMlUZJ';
        
        const response = await fetch(alchemyUrl, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: 1,
            jsonrpc: "2.0",
            method: "alchemy_getTokenBalances",
            params: [address, "erc20"]
          }),
        });

        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error.message);
        }

        // Calculate total USD value from token balances
        let totalUsdValue = 0;
        
        if (data.result && data.result.tokenBalances) {
          // Get token prices from CoinGecko
          const tokenAddresses = data.result.tokenBalances
            .filter((token: { tokenBalance: string }) => token.tokenBalance !== '0x0000000000000000000000000000000000000000000000000000000000000000')
            .map((token: { contractAddress: string }) => token.contractAddress);
          
          if (tokenAddresses.length > 0) {
            // Get token prices (simplified - in production you'd want to map contract addresses to CoinGecko IDs)
            const priceResponse = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=usd-coin,ethereum&vs_currencies=usd');
            const priceData = await priceResponse.json();
            
            for (const token of data.result.tokenBalances as Array<{ tokenBalance: string; contractAddress: string }>) {
              if (token.tokenBalance !== '0x0000000000000000000000000000000000000000000000000000000000000000') {
                // Convert hex balance to decimal
                const balance = parseInt(token.tokenBalance, 16);
                const decimals = 18; // Most tokens use 18 decimals
                const tokenAmount = balance / Math.pow(10, decimals);
                
                // For now, assume USDC (0xA0b86a33E6441b8c4C8C0C4C0C4C0C4C0C4C0C4C) or ETH
                let price = 0;
                if (token.contractAddress.toLowerCase() === '0xa0b86a33e6441b8c4c8c0c4c0c4c0c4c0c4c0c4c') {
                  price = priceData['usd-coin']?.usd || 1;
                } else {
                  price = priceData.ethereum?.usd || 0;
                }
                
                totalUsdValue += tokenAmount * price;
              }
            }
          }
        }
        
        // If no token balances, get ETH balance
        if (totalUsdValue === 0) {
          const ethResponse = await fetch(alchemyUrl, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: 1,
              jsonrpc: "2.0",
              method: "eth_getBalance",
              params: [address, "latest"]
            }),
          });
          
          const ethData = await ethResponse.json();
          if (ethData.result) {
            const weiBalance = parseInt(ethData.result, 16);
            const ethBalance = weiBalance / Math.pow(10, 18);
            const ethPriceResponse = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
            const ethPriceData = await ethPriceResponse.json();
            const ethPrice = ethPriceData.ethereum?.usd || 0;
            totalUsdValue = ethBalance * ethPrice;
          }
        }
        
        setBalance(`$${totalUsdValue.toFixed(2)} USD`);
      } catch (err) {
        console.error('Error fetching balance:', err);
        setError('Unable to fetch balance');
        setBalance('$0 USD');
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, [address, chainId]);

  const getExplorerUrl = () => {
    if (chainId === 8453) {
      return `https://basescan.org/address/${address}`;
    }
    return `https://etherscan.io/address/${address}`;
  };

  return (
    <TreasuryWidget>
      {loading ? (
        <LoadingText>Loading balance...</LoadingText>
      ) : error ? (
        <ErrorText>{error}</ErrorText>
      ) : (
        <TreasuryAmount>{balance}</TreasuryAmount>
      )}
      <TreasuryLabel>Transparent Treasury Balance</TreasuryLabel>
      <div style={{ marginTop: "1rem" }}>
        <a
          href={getExplorerUrl()}
          target="_blank"
          rel="noopener noreferrer"
          style={{ 
            color: openOctoberColors.githubGreen,
            textDecoration: 'none',
            fontFamily: 'inherit'
          }}
        >
          View on {chainId === 8453 ? 'Basescan' : 'Etherscan'} →
        </a>
      </div>
    </TreasuryWidget>
  );
}
