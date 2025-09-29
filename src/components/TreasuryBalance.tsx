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

        // Use public Base chain RPC endpoint
        const baseRpcUrl = 'https://mainnet.base.org';
        
        const response = await fetch(baseRpcUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            jsonrpc: '2.0',
            method: 'eth_getBalance',
            params: [address, 'latest'],
            id: 1,
          }),
        });

        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error.message);
        }

        // Convert wei to ETH
        const weiBalance = parseInt(data.result, 16);
        const ethBalance = weiBalance / Math.pow(10, 18);
        
        // Convert to USD (assuming ETH price)
        const ethPriceResponse = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
        const ethPriceData = await ethPriceResponse.json();
        const ethPrice = ethPriceData.ethereum?.usd || 0;
        
        const usdValue = ethBalance * ethPrice;
        
        setBalance(`$${usdValue.toFixed(2)} USD`);
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
