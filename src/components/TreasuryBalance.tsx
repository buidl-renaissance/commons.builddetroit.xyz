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

        // Look specifically for USDC balance
        let usdcBalance = 0;
        
        if (data.result && data.result.tokenBalances) {
          // USDC contract address on Base: 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913
          const usdcContractAddress = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';
          
          for (const token of data.result.tokenBalances as Array<{ tokenBalance: string; contractAddress: string }>) {
            if (token.contractAddress.toLowerCase() === usdcContractAddress.toLowerCase()) {
              // Convert hex balance to decimal (USDC has 6 decimals)
              const balance = parseInt(token.tokenBalance, 16);
              usdcBalance = balance / Math.pow(10, 6); // USDC has 6 decimals
              break;
            }
          }
        }
        
        setBalance(`$${usdcBalance.toFixed(2)} USDC`);
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
