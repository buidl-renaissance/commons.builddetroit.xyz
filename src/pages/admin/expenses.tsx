import { useState, useEffect } from 'react';
import styled from 'styled-components';
import type { ThemeType } from '@/styles/theme';
import { sendUSDCPayout, checkMetaMaskConnection, getCurrentNetwork, switchToBaseNetwork } from '@/lib/metamask-usdc';

const Container = styled.div<{ theme: ThemeType }>`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.creamyBeige};
`;

const Header = styled.div<{ theme: ThemeType }>`
  margin-bottom: 2rem;
`;

const Title = styled.h1<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.creamyBeige};
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p<{ theme: ThemeType }>`
  color: ${({ theme }) => theme.colors.creamyBeige};
  opacity: 0.8;
  font-size: 1.1rem;
`;

const UploadSection = styled.div<{ theme: ThemeType }>`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.asphaltBlack}, #1a1a1a);
  border: 2px solid ${({ theme }) => theme.colors.creamyBeige};
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 3rem;
`;

const UploadTitle = styled.h2<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.creamyBeige};
  margin-bottom: 1rem;
`;

const UploadArea = styled.div<{ theme: ThemeType; isDragOver: boolean }>`
  border: 2px dashed ${({ theme, isDragOver }) => 
    isDragOver ? theme.colors.creamyBeige : 'rgba(255, 255, 255, 0.3)'};
  border-radius: 8px;
  padding: 3rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${({ isDragOver }) => isDragOver ? 'rgba(255, 255, 255, 0.05)' : 'transparent'};

  &:hover {
    border-color: ${({ theme }) => theme.colors.creamyBeige};
    background: rgba(255, 255, 255, 0.02);
  }
`;

const UploadText = styled.div<{ theme: ThemeType }>`
  color: ${({ theme }) => theme.colors.creamyBeige};
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;

const UploadSubtext = styled.div<{ theme: ThemeType }>`
  color: ${({ theme }) => theme.colors.creamyBeige};
  opacity: 0.6;
  font-size: 0.9rem;
`;

const HiddenInput = styled.input`
  display: none;
`;

const Button = styled.button<{ theme: ThemeType; primary?: boolean; disabled?: boolean }>`
  background: ${({ theme, primary, disabled }) => 
    disabled ? 'rgba(255, 255, 255, 0.1)' :
    primary ? theme.colors.creamyBeige : 'transparent'};
  color: ${({ theme, primary, disabled }) => 
    disabled ? 'rgba(255, 255, 255, 0.3)' :
    primary ? theme.colors.asphaltBlack : theme.colors.creamyBeige};
  border: 2px solid ${({ theme, disabled }) => 
    disabled ? 'rgba(255, 255, 255, 0.1)' : theme.colors.creamyBeige};
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1rem;
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover:not(:disabled) {
    background: ${({ theme, primary }) => 
      primary ? 'rgba(255, 255, 255, 0.9)' : theme.colors.creamyBeige};
    color: ${({ theme, primary }) => 
      primary ? theme.colors.asphaltBlack : theme.colors.asphaltBlack};
  }
`;

const LoadingSpinner = styled.div<{ theme: ThemeType }>`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: ${({ theme }) => theme.colors.creamyBeige};
  animation: spin 1s ease-in-out infinite;
  margin-right: 0.5rem;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const ExpensesList = styled.div<{ theme: ThemeType }>`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.asphaltBlack}, #1a1a1a);
  border: 2px solid ${({ theme }) => theme.colors.creamyBeige};
  border-radius: 12px;
  padding: 2rem;
`;

const ExpensesTitle = styled.h2<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.creamyBeige};
  margin-bottom: 1.5rem;
`;

const ExpenseCard = styled.div<{ theme: ThemeType }>`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.2);
  }
`;

const ExpenseHeader = styled.div<{ theme: ThemeType }>`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
`;

const ExpenseTitle = styled.h3<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.creamyBeige};
  margin: 0;
`;

const ExpenseAmount = styled.div<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.creamyBeige};
  font-weight: bold;
`;

const ExpenseDetails = styled.div<{ theme: ThemeType }>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const ExpenseDetail = styled.div<{ theme: ThemeType }>`
  color: ${({ theme }) => theme.colors.creamyBeige};
  opacity: 0.8;
  font-size: 0.9rem;
`;

const ExpenseLabel = styled.span<{ theme: ThemeType }>`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.creamyBeige};
`;

const ErrorMessage = styled.div<{ theme: ThemeType }>`
  background: rgba(255, 107, 107, 0.1);
  border: 1px solid rgba(255, 107, 107, 0.3);
  border-radius: 6px;
  padding: 1rem;
  color: #ff6b6b;
  margin-top: 1rem;
`;

const SuccessMessage = styled.div<{ theme: ThemeType }>`
  background: rgba(40, 167, 69, 0.1);
  border: 1px solid rgba(40, 167, 69, 0.3);
  border-radius: 6px;
  padding: 1rem;
  color: #28a745;
  margin-top: 1rem;
`;

const PayoutButton = styled.button<{ theme: ThemeType; status: string; disabled?: boolean }>`
  background: ${({ status, disabled }) => 
    disabled ? 'rgba(255, 255, 255, 0.1)' :
    status === 'completed' ? 'rgba(40, 167, 69, 0.2)' :
    status === 'processing' ? 'rgba(255, 193, 7, 0.2)' :
    status === 'failed' ? 'rgba(220, 53, 69, 0.2)' :
    'rgba(0, 123, 255, 0.2)'};
  color: ${({ status, disabled }) => 
    disabled ? 'rgba(255, 255, 255, 0.3)' :
    status === 'completed' ? '#28a745' :
    status === 'processing' ? '#ffc107' :
    status === 'failed' ? '#dc3545' :
    '#007bff'};
  border: 1px solid ${({ status, disabled }) => 
    disabled ? 'rgba(255, 255, 255, 0.1)' :
    status === 'completed' ? '#28a745' :
    status === 'processing' ? '#ffc107' :
    status === 'failed' ? '#dc3545' :
    '#007bff'};
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  margin-top: 0.5rem;

  &:hover:not(:disabled) {
    opacity: 0.8;
  }
`;

const PayoutStatus = styled.div<{ theme: ThemeType; status: string }>`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
  background: ${({ status }) => 
    status === 'completed' ? 'rgba(40, 167, 69, 0.2)' :
    status === 'processing' ? 'rgba(255, 193, 7, 0.2)' :
    status === 'failed' ? 'rgba(220, 53, 69, 0.2)' :
    'rgba(108, 117, 125, 0.2)'};
  color: ${({ status }) => 
    status === 'completed' ? '#28a745' :
    status === 'processing' ? '#ffc107' :
    status === 'failed' ? '#dc3545' :
    '#6c757d'};
  margin-left: 0.5rem;
`;

const TransactionLink = styled.a<{ theme: ThemeType }>`
  color: #28a745;
  text-decoration: none;
  font-size: 0.8rem;
  margin-left: 0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

const ImageUploadArea = styled.div<{ theme: ThemeType }>`
  background: rgba(255, 255, 255, 0.02);
  border: 1px dashed rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  padding: 1rem;
  margin-top: 1rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.creamyBeige};
    background: rgba(255, 255, 255, 0.05);
  }
`;

const ImageUploadText = styled.div<{ theme: ThemeType }>`
  color: ${({ theme }) => theme.colors.creamyBeige};
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const ImageUploadSubtext = styled.div<{ theme: ThemeType }>`
  color: ${({ theme }) => theme.colors.creamyBeige};
  opacity: 0.6;
  font-size: 0.8rem;
`;

const ImageGrid = styled.div<{ theme: ThemeType }>`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const ImageItem = styled.div<{ theme: ThemeType }>`
  position: relative;
  border-radius: 6px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const ImagePreview = styled.img<{ theme: ThemeType }>`
  width: 100%;
  height: 120px;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const ImageOverlay = styled.div<{ theme: ThemeType }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${ImageItem}:hover & {
    opacity: 1;
  }
`;

const ImageActions = styled.div<{ theme: ThemeType }>`
  display: flex;
  gap: 0.5rem;
`;

const ImageActionButton = styled.button<{ theme: ThemeType; variant?: 'view' | 'delete' }>`
  background: ${({ variant }) => 
    variant === 'delete' ? 'rgba(220, 53, 69, 0.8)' : 'rgba(40, 167, 69, 0.8)'};
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ variant }) => 
      variant === 'delete' ? 'rgba(220, 53, 69, 1)' : 'rgba(40, 167, 69, 1)'};
  }
`;

const ImageDescription = styled.div<{ theme: ThemeType }>`
  padding: 0.5rem;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.creamyBeige};
  opacity: 0.8;
  word-break: break-word;
`;

const ImageTypeBadge = styled.span<{ theme: ThemeType; type?: string }>`
  display: inline-block;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: bold;
  text-transform: uppercase;
  background: ${({ type }) => 
    type === 'proof' ? 'rgba(40, 167, 69, 0.2)' :
    type === 'receipt' ? 'rgba(0, 123, 255, 0.2)' :
    type === 'documentation' ? 'rgba(255, 193, 7, 0.2)' :
    'rgba(108, 117, 125, 0.2)'};
  color: ${({ type }) => 
    type === 'proof' ? '#28a745' :
    type === 'receipt' ? '#007bff' :
    type === 'documentation' ? '#ffc107' :
    '#6c757d'};
  margin-bottom: 0.5rem;
`;

interface ExpenseImage {
  id: number;
  expenseId: number;
  imageUrl: string;
  description?: string;
  imageType?: string;
  uploadedBy?: string;
  createdAt: string;
}

interface Expense {
  id: number;
  title: string;
  merchant?: string;
  category?: string;
  amountCents?: number;
  currency: string;
  expenseDate?: string;
  notes?: string;
  receiptUrl?: string;
  metadata?: string;
  payoutStatus?: string;
  payoutTxHash?: string;
  payoutAmountCents?: number;
  payoutDate?: string;
  createdAt: string;
  updatedAt: string;
  images?: ExpenseImage[];
}

export default function AdminExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [processingPayouts, setProcessingPayouts] = useState<Set<number>>(new Set());
  const [uploadingImages, setUploadingImages] = useState<Set<number>>(new Set());
  // const [editingImage, setEditingImage] = useState<number | null>(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await fetch('/api/expenses');
      const data = await response.json();
      if (data.success) {
        setExpenses(data.expenses);
      } else {
        setError('Failed to fetch expenses');
      }
    } catch {
      setError('Failed to fetch expenses');
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      setError('File size must be less than 10MB');
      return;
    }

    setIsUploading(true);
    setError(null);
    setSuccess(null);

    try {
      // Convert file to base64
      const reader = new FileReader();
      const base64Data = await new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const response = await fetch('/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'upload',
          file: base64Data,
          fileName: `receipt-${Date.now()}.${file.name.split('.').pop()}`,
          fileType: file.type,
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setSuccess('Receipt uploaded and analyzed successfully!');
        fetchExpenses(); // Refresh the list
      } else {
        setError(data.error || 'Failed to upload receipt');
      }
    } catch {
      setError('Failed to upload receipt');
    } finally {
      setIsUploading(false);
    }
  };

  const handlePayout = async (expenseId: number) => {
    setProcessingPayouts(prev => new Set(prev).add(expenseId));
    setError(null);
    setSuccess(null);

    try {
      // Find the expense to get the amount
      const expense = expenses.find(e => e.id === expenseId);
      if (!expense || !expense.amountCents) {
        setError('Expense not found or invalid amount');
        return;
      }

      // Check MetaMask connection
      await checkMetaMaskConnection();

      // Check and switch to Base network if needed
      const { isBase } = await getCurrentNetwork();
      if (!isBase) {
        await switchToBaseNetwork();
      }

      // Send USDC transaction via MetaMask
      const result = await sendUSDCPayout(
        expense.amountCents,
        '0x3C6eF34939aaA850bA787cB775128746f86b8661' // Recipient address
      );

      if (result.success && result.txHash) {
        // Record the payout in the database
        const response = await fetch('/api/expenses', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'payout',
            expenseId: expenseId,
            txHash: result.txHash,
          }),
        });

        const data = await response.json();
        
        if (data.success) {
          setSuccess(`Payout sent successfully! Transaction: ${result.txHash}`);
          fetchExpenses(); // Refresh the list
        } else {
          setError(data.error || 'Failed to record payout');
        }
      } else {
        setError(result.error || 'Failed to send payout');
      }
    } catch {
      setError('Failed to send payout');
    } finally {
      setProcessingPayouts(prev => {
        const newSet = new Set(prev);
        newSet.delete(expenseId);
        return newSet;
      });
    }
  };

  const handleImageUpload = async (expenseId: number, file: File, description?: string, imageType?: string) => {
    setUploadingImages(prev => new Set(prev).add(expenseId));
    setError(null);

    try {
      // Convert file to base64
      const reader = new FileReader();
      const base64Data = await new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const response = await fetch('/api/expense-images', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          expenseId,
          file: base64Data,
          fileName: `proof-${Date.now()}.${file.name.split('.').pop()}`,
          fileType: file.type,
          description: description || '',
          imageType: imageType || 'proof',
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setSuccess('Proof image uploaded successfully!');
        fetchExpenses(); // Refresh the list
      } else {
        setError(data.error || 'Failed to upload image');
      }
    } catch {
      setError('Failed to upload image');
    } finally {
      setUploadingImages(prev => {
        const newSet = new Set(prev);
        newSet.delete(expenseId);
        return newSet;
      });
    }
  };

  const handleDeleteImage = async (imageId: number) => {
    try {
      const response = await fetch(`/api/expense-images?imageId=${imageId}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      
      if (data.success) {
        setSuccess('Image deleted successfully!');
        fetchExpenses(); // Refresh the list
      } else {
        setError(data.error || 'Failed to delete image');
      }
    } catch {
      setError('Failed to delete image');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const formatAmount = (amountCents: number, currency: string) => {
    const amount = amountCents / 100;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    // Handle date strings that might be in YYYY-MM-DD format
    // If it's just a date (no time), treat it as local date to avoid timezone issues
    if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
      const [year, month, day] = dateString.split('-').map(Number);
      const date = new Date(year, month - 1, day); // month is 0-indexed
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    }
    
    // For ISO date strings with time, use the original logic
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Container>
      <Header>
        <Title>Expense Tracking</Title>
        <Subtitle>Upload receipts to automatically extract expense information using AI</Subtitle>
      </Header>

      <UploadSection>
        <UploadTitle>Upload Receipt</UploadTitle>
        <UploadArea
          isDragOver={isDragOver}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => document.getElementById('file-input')?.click()}
        >
          <UploadText>
            {isUploading ? (
              <>
                <LoadingSpinner />
                Analyzing receipt...
              </>
            ) : (
              'Drop receipt image here or click to browse'
            )}
          </UploadText>
          <UploadSubtext>
            Supports JPG, PNG, and other image formats (max 10MB)
          </UploadSubtext>
        </UploadArea>
        <HiddenInput
          id="file-input"
          type="file"
          accept="image/*"
          onChange={handleFileInput}
        />
        <Button disabled={isUploading}>
          {isUploading ? 'Processing...' : 'Select File'}
        </Button>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}
      </UploadSection>

      <ExpensesList>
        <ExpensesTitle>Recent Expenses ({expenses.length})</ExpensesTitle>
        <div style={{ 
          background: 'rgba(0, 123, 255, 0.1)', 
          border: '1px solid rgba(0, 123, 255, 0.3)', 
          borderRadius: '6px', 
          padding: '1rem', 
          marginBottom: '1.5rem',
          fontSize: '0.9rem',
          color: '#007bff'
        }}>
          💡 <strong>MetaMask Required:</strong> To send payouts, you&apos;ll need MetaMask installed and connected to the Base network. 
          Make sure you have USDC in your wallet for the transaction amount.
        </div>
        {expenses.length === 0 ? (
          <div style={{ color: 'rgba(255, 255, 255, 0.6)', textAlign: 'center', padding: '2rem' }}>
            No expenses yet. Upload a receipt to get started!
          </div>
        ) : (
          expenses.map((expense) => (
            <ExpenseCard key={expense.id}>
              <ExpenseHeader>
                <ExpenseTitle>{expense.title}</ExpenseTitle>
                {expense.amountCents && (
                  <ExpenseAmount>
                    {formatAmount(expense.amountCents, expense.currency)}
                  </ExpenseAmount>
                )}
              </ExpenseHeader>
              
              <ExpenseDetails>
                {expense.merchant && (
                  <ExpenseDetail>
                    <ExpenseLabel>Merchant:</ExpenseLabel> {expense.merchant}
                  </ExpenseDetail>
                )}
                {expense.category && (
                  <ExpenseDetail>
                    <ExpenseLabel>Category:</ExpenseLabel> {expense.category}
                  </ExpenseDetail>
                )}
                {expense.expenseDate && (
                  <ExpenseDetail>
                    <ExpenseLabel>Date:</ExpenseLabel> {formatDate(expense.expenseDate)}
                  </ExpenseDetail>
                )}
                {expense.notes && (
                  <ExpenseDetail>
                    <ExpenseLabel>Notes:</ExpenseLabel> {expense.notes}
                  </ExpenseDetail>
                )}
                {expense.receiptUrl && (
                  <ExpenseDetail>
                    <ExpenseLabel>Receipt:</ExpenseLabel>{' '}
                    <a 
                      href={expense.receiptUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ color: '#28a745', textDecoration: 'none' }}
                    >
                      View Image
                    </a>
                  </ExpenseDetail>
                )}
                <ExpenseDetail>
                  <ExpenseLabel>Added:</ExpenseLabel> {formatDate(expense.createdAt)}
                </ExpenseDetail>
                {expense.payoutStatus && (
                  <ExpenseDetail>
                    <ExpenseLabel>Payout Status:</ExpenseLabel>
                    <PayoutStatus status={expense.payoutStatus}>
                      {expense.payoutStatus}
                    </PayoutStatus>
                    {expense.payoutTxHash && (
                      <TransactionLink 
                        href={`https://basescan.org/tx/${expense.payoutTxHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Transaction
                      </TransactionLink>
                    )}
                  </ExpenseDetail>
                )}
              </ExpenseDetails>
              
              {/* Payout Button */}
              {expense.amountCents && expense.amountCents > 0 && (
                <div style={{ marginTop: '1rem' }}>
                  <PayoutButton
                    status={expense.payoutStatus || 'pending'}
                    disabled={
                      expense.payoutStatus === 'completed' || 
                      expense.payoutStatus === 'processing' ||
                      processingPayouts.has(expense.id)
                    }
                    onClick={() => handlePayout(expense.id)}
                  >
                    {processingPayouts.has(expense.id) ? (
                      <>
                        <LoadingSpinner />
                        Processing...
                      </>
                    ) : expense.payoutStatus === 'completed' ? (
                      'Paid Out'
                    ) : expense.payoutStatus === 'processing' ? (
                      'Processing...'
                    ) : expense.payoutStatus === 'failed' ? (
                      'Retry Payout'
                    ) : (
                      'Pay with MetaMask'
                    )}
                  </PayoutButton>
                </div>
              )}

              {/* Additional Images Section */}
              <div style={{ marginTop: '1.5rem' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  marginBottom: '1rem' 
                }}>
                  <ExpenseTitle style={{ fontSize: '1rem', margin: 0 }}>
                    Proof Images ({expense.images?.length || 0})
                  </ExpenseTitle>
                  <Button 
                    onClick={() => document.getElementById(`image-input-${expense.id}`)?.click()}
                    disabled={uploadingImages.has(expense.id)}
                  >
                    {uploadingImages.has(expense.id) ? (
                      <>
                        <LoadingSpinner />
                        Uploading...
                      </>
                    ) : (
                      'Add Image'
                    )}
                  </Button>
                </div>

                <HiddenInput
                  id={`image-input-${expense.id}`}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const description = prompt('Describe what this image shows (optional):');
                      const imageType = prompt('Image type (proof, receipt, documentation) [default: proof]:') || 'proof';
                      handleImageUpload(expense.id, file, description || undefined, imageType);
                    }
                  }}
                />

                {expense.images && expense.images.length > 0 && (
                  <ImageGrid>
                    {expense.images.map((image) => (
                      <ImageItem key={image.id}>
                        <ImagePreview
                          src={image.imageUrl}
                          alt={image.description || 'Proof image'}
                          onClick={() => window.open(image.imageUrl, '_blank')}
                        />
                        <ImageOverlay>
                          <ImageActions>
                            <ImageActionButton
                              onClick={() => window.open(image.imageUrl, '_blank')}
                            >
                              View
                            </ImageActionButton>
                            <ImageActionButton
                              variant="delete"
                              onClick={() => {
                                if (confirm('Are you sure you want to delete this image?')) {
                                  handleDeleteImage(image.id);
                                }
                              }}
                            >
                              Delete
                            </ImageActionButton>
                          </ImageActions>
                        </ImageOverlay>
                        <ImageDescription>
                          {image.imageType && (
                            <ImageTypeBadge type={image.imageType}>
                              {image.imageType}
                            </ImageTypeBadge>
                          )}
                          {image.description && (
                            <div>{image.description}</div>
                          )}
                          <div style={{ fontSize: '0.7rem', opacity: 0.6, marginTop: '0.25rem' }}>
                            {formatDate(image.createdAt)}
                          </div>
                        </ImageDescription>
                      </ImageItem>
                    ))}
                  </ImageGrid>
                )}

                {(!expense.images || expense.images.length === 0) && (
                  <ImageUploadArea
                    onClick={() => document.getElementById(`image-input-${expense.id}`)?.click()}
                  >
                    <ImageUploadText>
                      📸 Upload proof images
                    </ImageUploadText>
                    <ImageUploadSubtext>
                      Show items obtained, receipts, or documentation
                    </ImageUploadSubtext>
                  </ImageUploadArea>
                )}
              </div>
            </ExpenseCard>
          ))
        )}
      </ExpensesList>
    </Container>
  );
}
