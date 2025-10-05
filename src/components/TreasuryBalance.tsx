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
  max-width: 600px;
  margin: 0 auto;
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

const BalanceBreakdown = styled.div<{ theme: ThemeType }>`
  margin-top: 1.5rem;
  text-align: left;
`;

const BalanceItem = styled.div<{ theme: ThemeType }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  &:last-child {
    border-bottom: none;
  }
`;

const AssetInfo = styled.div<{ theme: ThemeType }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const AssetSymbol = styled.span<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.creamyBeige};
  font-size: 1rem;
`;

const AssetName = styled.span<{ theme: ThemeType }>`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.creamyBeige};
  opacity: 0.7;
`;

const AssetAmount = styled.div<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.mono};
  color: ${({ theme }) => theme.colors.creamyBeige};
  font-weight: bold;
  margin-bottom: 0.25rem;
`;

const AssetValue = styled.div<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.mono};
  color: ${openOctoberColors.githubGreen};
  font-weight: bold;
  font-size: 0.9rem;
`;

const AssetDetails = styled.div<{ theme: ThemeType }>`
  text-align: right;
`;

const TotalSection = styled.div<{ theme: ThemeType }>`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 2px solid rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TotalLabel = styled.div<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.creamyBeige};
  font-weight: bold;
  font-size: 1.1rem;
`;

const TotalValue = styled.div<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.mono};
  color: ${openOctoberColors.githubGreen};
  font-weight: bold;
  font-size: 1.3rem;
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

interface BalanceData {
  ethBalance: string;
  ethUsdValue: string;
  usdcBalance: string;
  usdcUsdValue: string;
  totalUsdValue: string;
}

interface TreasuryBalanceProps {
  address: string;
  chainId?: number;
}

export default function TreasuryBalance({ address, chainId = 8453 }: TreasuryBalanceProps) {
  const [balances, setBalances] = useState<BalanceData>({
    ethBalance: '0',
    ethUsdValue: '$0',
    usdcBalance: '0',
    usdcUsdValue: '$0',
    totalUsdValue: '$0'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBalances = async () => {
    try {
      setLoading(true);
      setError(null);

      const alchemyUrl = 'https://base-mainnet.g.alchemy.com/v2/5lHR8up2lkHcXHGMLPIQG5iuW_wMlUZJ';
      
      // Fetch both ETH and USDC balances in parallel
      const [ethResponse, usdcResponse] = await Promise.all([
        // Get native ETH balance
        fetch(alchemyUrl, {
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
        }),
        // Get USDC token balance
        fetch(alchemyUrl, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: 2,
            jsonrpc: "2.0",
            method: "alchemy_getTokenBalances",
            params: [address, ["0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"]] // USDC contract address
          }),
        })
      ]);

      const [ethData, usdcData] = await Promise.all([
        ethResponse.json(),
        usdcResponse.json()
      ]);

      if (ethData.error) {
        throw new Error(ethData.error.message);
      }
      if (usdcData.error) {
        throw new Error(usdcData.error.message);
      }

      // Process ETH balance
      const weiBalance = parseInt(ethData.result, 16);
      const ethBalance = weiBalance / Math.pow(10, 18);
      
      // Process USDC balance
      let usdcBalance = 0;
      if (usdcData.result && usdcData.result.tokenBalances && usdcData.result.tokenBalances.length > 0) {
        const usdcTokenBalance = parseInt(usdcData.result.tokenBalances[0].tokenBalance, 16);
        usdcBalance = usdcTokenBalance / Math.pow(10, 6); // USDC has 6 decimals
      }
      
      // Fetch real-time ETH price with fallback
      let ethPrice = 3000; // Fallback price
      try {
        const ethPriceResponse = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
        if (ethPriceResponse.ok) {
          const ethPriceData = await ethPriceResponse.json();
          ethPrice = ethPriceData.ethereum?.usd || ethPrice;
        }
      } catch (priceError) {
        console.warn('Failed to fetch ETH price, using fallback:', priceError);
      }
      
      // Calculate USD values
      const ethUsdValue = ethBalance * ethPrice;
      const usdcUsdValue = usdcBalance; // USDC is 1:1 with USD
      const totalUsdValue = ethUsdValue + usdcUsdValue;

      setBalances({
        ethBalance: ethBalance.toFixed(4),
        ethUsdValue: `$${ethUsdValue.toFixed(2)}`,
        usdcBalance: usdcBalance.toFixed(2),
        usdcUsdValue: `$${usdcUsdValue.toFixed(2)}`,
        totalUsdValue: `$${totalUsdValue.toFixed(2)}`
      });
    } catch (err) {
      console.error('Error fetching balances:', err);
      setError('Unable to fetch balances');
      setBalances({
        ethBalance: '0',
        ethUsdValue: '$0',
        usdcBalance: '0',
        usdcUsdValue: '$0',
        totalUsdValue: '$0'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalances();
  }, [address, chainId]); // eslint-disable-line react-hooks/exhaustive-deps

  const getExplorerUrl = () => {
    if (chainId === 8453) {
      return `https://basescan.org/address/${address}`;
    }
    return `https://etherscan.io/address/${address}`;
  };

  return (
    <TreasuryWidget>
      {loading ? (
        <LoadingText>Loading balances...</LoadingText>
      ) : error ? (
        <ErrorText>{error}</ErrorText>
      ) : (
        <>
          <TreasuryAmount>{balances.totalUsdValue}</TreasuryAmount>
          <TreasuryLabel>Transparent Treasury Balance</TreasuryLabel>
          
          <BalanceBreakdown>
            <BalanceItem>
              <AssetInfo>
                <AssetSymbol>ETH</AssetSymbol>
                <AssetName>Ethereum</AssetName>
              </AssetInfo>
              <AssetDetails>
                <AssetAmount>{balances.ethBalance} ETH</AssetAmount>
                <AssetValue>{balances.ethUsdValue}</AssetValue>
              </AssetDetails>
            </BalanceItem>
            
            <BalanceItem>
              <AssetInfo>
                <AssetSymbol>USDC</AssetSymbol>
                <AssetName>USD Coin</AssetName>
              </AssetInfo>
              <AssetDetails>
                <AssetAmount>{balances.usdcBalance} USDC</AssetAmount>
                <AssetValue>{balances.usdcUsdValue}</AssetValue>
              </AssetDetails>
            </BalanceItem>
            
            <TotalSection>
              <TotalLabel>Total Value</TotalLabel>
              <TotalValue>{balances.totalUsdValue}</TotalValue>
            </TotalSection>
          </BalanceBreakdown>
        </>
      )}
      
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
          View on Basescan →
        </a>
      </div>
    </TreasuryWidget>
  );
}
