import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled, { ThemeProvider } from 'styled-components';
import { theme, ThemeType } from '../../../styles/theme';
import { compressImage, getBase64SizeMB } from '@/lib/imageCompression';
import ExpenseCard from '@/components/ExpenseCard';

const Container = styled.div<{ theme: ThemeType }>`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.creamyBeige};

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Header = styled.div<{ theme: ThemeType }>`
  margin-bottom: 2rem;
`;

const Title = styled.h1<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.creamyBeige};
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const Subtitle = styled.p<{ theme: ThemeType }>`
  color: ${({ theme }) => theme.colors.creamyBeige};
  opacity: 0.8;
  font-size: 1.1rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const BackLink = styled(Link)<{ theme: ThemeType }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.creamyBeige};
  text-decoration: none;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.9rem;
  margin-bottom: 2rem;
  transition: color 0.3s ease;
  opacity: 0.8;

  &:hover {
    color: ${({ theme }) => theme.colors.neonOrange};
    opacity: 1;
  }
`;

const Section = styled.div<{ theme: ThemeType }>`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const SectionTitle = styled.h2<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.creamyBeige};
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Form = styled.form<{ theme: ThemeType }>`
  display: grid;
  gap: 1.5rem;
`;

const FormRow = styled.div<{ theme: ThemeType }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div<{ theme: ThemeType }>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.creamyBeige};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Input = styled.input<{ theme: ThemeType }>`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  padding: 0.75rem;
  color: ${({ theme }) => theme.colors.creamyBeige};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.neonOrange};
    background: rgba(255, 255, 255, 0.15);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const TextArea = styled.textarea<{ theme: ThemeType }>`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  padding: 0.75rem;
  color: ${({ theme }) => theme.colors.creamyBeige};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.9rem;
  min-height: 100px;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.neonOrange};
    background: rgba(255, 255, 255, 0.15);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const Select = styled.select<{ theme: ThemeType }>`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  padding: 0.75rem;
  color: ${({ theme }) => theme.colors.creamyBeige};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.neonOrange};
    background: rgba(255, 255, 255, 0.15);
  }

  option {
    background: ${({ theme }) => theme.colors.asphaltBlack};
    color: ${({ theme }) => theme.colors.creamyBeige};
  }
`;

const Button = styled.button<{ theme: ThemeType; variant?: 'primary' | 'secondary' }>`
  background: ${({ variant, theme }) => 
    variant === 'secondary' ? 'transparent' : theme.colors.neonOrange};
  color: ${({ variant, theme }) => 
    variant === 'secondary' ? theme.colors.creamyBeige : theme.colors.asphaltBlack};
  border: 2px solid ${({ variant, theme }) => 
    variant === 'secondary' ? theme.colors.creamyBeige : theme.colors.neonOrange};
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover:not(:disabled) {
    background: ${({ variant, theme }) => 
      variant === 'secondary' ? theme.colors.creamyBeige : theme.colors.neonYellow};
    color: ${({ variant, theme }) => 
      variant === 'secondary' ? theme.colors.asphaltBlack : theme.colors.asphaltBlack};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
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

const Message = styled.div<{ theme: ThemeType; success?: boolean; error?: boolean }>`
  padding: 1rem;
  border-radius: 6px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.9rem;
  margin-bottom: 1rem;
  background: ${({ success, error, theme }) => 
    success 
      ? 'rgba(40, 167, 69, 0.1)' 
      : error 
      ? 'rgba(220, 53, 69, 0.1)'
      : 'rgba(220, 53, 69, 0.1)'
  };
  border: 1px solid ${({ success, error, theme }) => 
    success 
      ? 'rgba(40, 167, 69, 0.3)' 
      : error 
      ? 'rgba(220, 53, 69, 0.3)'
      : 'rgba(220, 53, 69, 0.3)'
  };
  color: ${({ success, error, theme }) => 
    success 
      ? '#28a745' 
      : error 
      ? '#dc3545'
      : '#dc3545'
  };
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
  margin-bottom: 1rem;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

const ExpenseTitle = styled.h3<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.3rem;
  color: ${({ theme }) => theme.colors.creamyBeige};
  margin: 0 0 0.5rem 0;
`;

const ExpenseAmount = styled.div<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.neonOrange};
  font-weight: bold;
  text-align: right;
  white-space: nowrap;

  @media (max-width: 768px) {
    text-align: left;
  }
`;

const StatusBadge = styled.span<{ theme: ThemeType; status: string }>`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: ${({ status, theme }) => {
    switch (status) {
      case 'pending_approval': return 'rgba(255, 193, 7, 0.2)';
      case 'pending': return 'rgba(0, 123, 255, 0.2)';
      case 'processing': return 'rgba(255, 193, 7, 0.2)';
      case 'completed': return 'rgba(40, 167, 69, 0.2)';
      case 'failed': return 'rgba(220, 53, 69, 0.2)';
      case 'rejected': return 'rgba(220, 53, 69, 0.2)';
      default: return 'rgba(108, 117, 125, 0.2)';
    }
  }};
  color: ${({ status, theme }) => {
    switch (status) {
      case 'pending_approval': return '#ffc107';
      case 'pending': return '#007bff';
      case 'processing': return '#ffc107';
      case 'completed': return '#28a745';
      case 'failed': return '#dc3545';
      case 'rejected': return '#dc3545';
      default: return '#6c757d';
    }
  }};
  margin-left: 0.5rem;
`;

const ExpenseDetails = styled.div<{ theme: ThemeType }>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
`;

const ExpenseDetail = styled.div<{ theme: ThemeType }>`
  color: ${({ theme }) => theme.colors.creamyBeige};
  opacity: 0.9;
  font-size: 0.9rem;
`;

const ExpenseLabel = styled.span<{ theme: ThemeType }>`
  font-weight: 600;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: ${({ theme }) => theme.colors.creamyBeige};
  opacity: 0.6;
  display: block;
  margin-bottom: 0.25rem;
`;

const ExpenseValue = styled.span<{ theme: ThemeType }>`
  color: ${({ theme }) => theme.colors.creamyBeige};
  word-break: break-word;
`;

const FilterTabs = styled.div<{ theme: ThemeType }>`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

const FilterTab = styled.button<{ theme: ThemeType; active?: boolean }>`
  background: ${({ active, theme }) => 
    active ? theme.colors.neonOrange : 'transparent'};
  color: ${({ active, theme }) => 
    active ? theme.colors.asphaltBlack : theme.colors.creamyBeige};
  border: 1px solid ${({ active, theme }) => 
    active ? theme.colors.neonOrange : 'rgba(255, 255, 255, 0.3)'};
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    background: ${({ active, theme }) => 
      active ? theme.colors.neonYellow : 'rgba(255, 255, 255, 0.1)'};
    border-color: ${({ theme }) => theme.colors.neonOrange};
  }
`;

const EmptyState = styled.div<{ theme: ThemeType }>`
  text-align: center;
  padding: 2rem;
  color: rgba(255, 255, 255, 0.6);
  font-family: ${({ theme }) => theme.fonts.body};
  font-style: italic;
  font-size: 0.9rem;
`;

const UploadArea = styled.div<{ theme: ThemeType; isDragOver: boolean }>`
  border: 2px dashed ${({ isDragOver, theme }) => 
    isDragOver ? theme.colors.neonOrange : theme.colors.rustedSteel};
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: ${({ isDragOver, theme }) => 
    isDragOver ? `${theme.colors.neonOrange}10` : 'transparent'};
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.neonOrange};
    background-color: ${({ theme }) => `${theme.colors.neonOrange}05`};
  }
`;

const EditButton = styled.button<{ theme: ThemeType }>`
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.rustedSteel};
  color: ${({ theme }) => theme.colors.rustedSteel};
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.neonOrange};
    color: ${({ theme }) => theme.colors.neonOrange};
  }
`;

const EditForm = styled.div<{ theme: ThemeType }>`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-top: 0.5rem;
  
  input {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid ${({ theme }) => theme.colors.rustedSteel};
    border-radius: 4px;
    font-size: 0.875rem;
  }
  
  button {
    padding: 0.5rem 1rem;
    background-color: ${({ theme }) => theme.colors.neonOrange};
    color: ${({ theme }) => theme.colors.asphaltBlack};
    border: none;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
    
    &:hover {
      background-color: ${({ theme }) => theme.colors.neonYellow};
    }
  }
`;

const ModalOverlay = styled.div<{ theme: ThemeType }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalContent = styled.div<{ theme: ThemeType }>`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 2rem;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  color: ${({ theme }) => theme.colors.asphaltBlack};
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
`;

const ModalHeader = styled.div<{ theme: ThemeType }>`
  margin-bottom: 1.5rem;
  text-align: center;
`;

const ModalTitle = styled.h2<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.asphaltBlack};
  margin: 0 0 0.5rem 0;
`;

const ModalSubtitle = styled.p<{ theme: ThemeType }>`
  color: ${({ theme }) => theme.colors.rustedSteel};
  font-size: 0.9rem;
  margin: 0;
`;

const ModalForm = styled.form<{ theme: ThemeType }>`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ModalFormGroup = styled.div<{ theme: ThemeType }>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ModalLabel = styled.label<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.asphaltBlack};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ModalInput = styled.input<{ theme: ThemeType }>`
  background: white;
  border: 2px solid ${({ theme }) => theme.colors.rustedSteel}60;
  border-radius: 6px;
  padding: 0.75rem;
  color: ${({ theme }) => theme.colors.asphaltBlack};
  font-size: 1rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.neonOrange};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.neonOrange}20;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.rustedSteel}80;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.rustedSteel}CC;
  }
`;

const ModalSelect = styled.select<{ theme: ThemeType }>`
  background: white;
  border: 2px solid ${({ theme }) => theme.colors.rustedSteel}60;
  border-radius: 6px;
  padding: 0.75rem;
  color: ${({ theme }) => theme.colors.asphaltBlack};
  font-size: 1rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.neonOrange};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.neonOrange}20;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.rustedSteel}80;
  }
`;

const ModalTextArea = styled.textarea<{ theme: ThemeType }>`
  background: white;
  border: 2px solid ${({ theme }) => theme.colors.rustedSteel}60;
  border-radius: 6px;
  padding: 0.75rem;
  color: ${({ theme }) => theme.colors.asphaltBlack};
  font-size: 1rem;
  min-height: 80px;
  resize: vertical;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.neonOrange};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.neonOrange}20;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.rustedSteel}80;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.rustedSteel}CC;
  }
`;

const ModalButton = styled.button<{ theme: ThemeType; variant?: 'primary' | 'secondary' }>`
  background: ${({ variant, theme }) => 
    variant === 'secondary' ? 'transparent' : theme.colors.neonOrange};
  color: ${({ variant, theme }) => 
    variant === 'secondary' ? theme.colors.asphaltBlack : theme.colors.asphaltBlack};
  border: 2px solid ${({ variant, theme }) => 
    variant === 'secondary' ? theme.colors.rustedSteel : theme.colors.neonOrange};
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover:not(:disabled) {
    background: ${({ variant, theme }) => 
      variant === 'secondary' ? theme.colors.rustedSteel : theme.colors.neonYellow};
    color: ${({ variant, theme }) => 
      variant === 'secondary' ? 'white' : theme.colors.asphaltBlack};
    transform: translateY(-2px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ModalActions = styled.div<{ theme: ThemeType }>`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  justify-content: flex-end;
`;

const CloseButton = styled.button<{ theme: ThemeType }>`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.rustedSteel};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
    color: ${({ theme }) => theme.colors.asphaltBlack};
  }
`;

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
  payoutStatus?: string;
  payoutAddress?: string;
  approvedBy?: string;
  approvedAt?: string;
  rejectedBy?: string;
  rejectedAt?: string;
  rejectionReason?: string;
  createdAt: string;
  images?: string[];
}

interface MemberData {
  id: number;
  name: string;
  email: string;
  payoutAddress?: string;
}

export default function BuilderExpenses() {
  const router = useRouter();
  const { key } = router.query;
  
  const [memberData, setMemberData] = useState<MemberData | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [editingExpense, setEditingExpense] = useState<number | null>(null);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    merchant: '',
    category: '',
    amount: '',
    currency: 'USD',
    expenseDate: '',
    notes: '',
    payoutAddress: ''
  });
  
  // Edit expense state
  const [editFormData, setEditFormData] = useState({
    payoutAddress: ''
  });

  useEffect(() => {
    if (key) {
      fetchMemberData(key as string);
      fetchExpenses(key as string);
    }
  }, [key]);

  const fetchMemberData = async (modificationKey: string) => {
    try {
      const response = await fetch(`/api/builders/${modificationKey}`);
      if (response.ok) {
        const data = await response.json();
        setMemberData(data);
        setFormData(prev => ({
          ...prev,
          payoutAddress: data.payoutAddress || ''
        }));
      } else {
        setError('Invalid builder link. Please check the URL and try again.');
      }
    } catch {
      setError('Failed to load builder data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchExpenses = async (modificationKey: string) => {
    try {
      const memberResponse = await fetch(`/api/builders/${modificationKey}`);
      if (memberResponse.ok) {
        const memberData = await memberResponse.json();
        const response = await fetch(`/api/expenses?builderId=${memberData.id}`);
        if (response.ok) {
          const data = await response.json();
          setExpenses(data.expenses || []);
        }
      }
    } catch (err) {
      console.error('Failed to load expenses:', err);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    setIsUploading(true);
    setError('');
    setSuccess('');

    try {
      // Compress image before uploading to stay within Vercel's 4.5MB limit
      const compressedData = await compressImage(file, {
        maxWidth: 1920,
        maxHeight: 1920,
        quality: 0.8,
        maxSizeMB: 2, // Target 2MB to stay well under Vercel's limits
      });

      const compressedSize = getBase64SizeMB(compressedData);
      console.log(`Compressed receipt size: ${compressedSize.toFixed(2)}MB`);

      const response = await fetch('/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'upload',
          file: compressedData,
          fileName: `receipt-${Date.now()}.${file.name.split('.').pop()}`,
          fileType: file.type,
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        // Update the form with AI-extracted data
        setFormData(prev => ({
          ...prev,
          title: data.analysis.title || '',
          merchant: data.analysis.merchant || '',
          category: data.analysis.category || '',
          amount: data.analysis.amount ? (data.analysis.amount / 100).toString() : '',
          currency: data.analysis.currency || 'USD',
          expenseDate: data.analysis.date || '',
          notes: data.analysis.notes || '',
          payoutAddress: memberData?.payoutAddress || ''
        }));
        setSuccess('Receipt uploaded and analyzed successfully!');
        setShowSubmitModal(true);
      } else {
        setError(data.error || 'Failed to upload receipt');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setError('Failed to upload receipt. Please try a smaller file.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'submit',
          title: formData.title,
          merchant: formData.merchant,
          category: formData.category,
          amountCents: Math.round(parseFloat(formData.amount) * 100),
          currency: formData.currency,
          expenseDate: formData.expenseDate,
          notes: formData.notes,
          payoutAddress: formData.payoutAddress,
          submittedBy: memberData?.id,
          modificationKey: key
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setSuccess('Expense submitted successfully! It will be reviewed by admins.');
        setFormData({
          title: '',
          merchant: '',
          category: '',
          amount: '',
          currency: 'USD',
          expenseDate: '',
          notes: '',
          payoutAddress: memberData?.payoutAddress || ''
        });
        setShowSubmitModal(false);
        fetchExpenses(key as string);
      } else {
        setError(data.error || 'Failed to submit expense');
      }
    } catch (error) {
      console.error('Submit error:', error);
      setError('Failed to submit expense. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdatePayoutAddress = async (expenseId: number) => {
    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'update_payout_address',
          expenseId: expenseId,
          payoutAddress: editFormData.payoutAddress,
          modificationKey: key
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setSuccess('Payout address updated successfully!');
        setEditingExpense(null);
        setEditFormData({ payoutAddress: '' });
        fetchExpenses(key as string);
      } else {
        setError(data.error || 'Failed to update payout address');
      }
    } catch (error) {
      console.error('Update error:', error);
      setError('Failed to update payout address. Please try again.');
    } finally {
      setSubmitting(false);
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
    if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
      const [year, month, day] = dateString.split('-').map(Number);
      const date = new Date(year, month - 1, day);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    }
    
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const filteredExpenses = activeFilter === 'all' 
    ? expenses 
    : expenses.filter(expense => expense.payoutStatus === activeFilter);

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <Head>
          <title>Loading... - Detroit Commons</title>
        </Head>
        <Container>
          <Header>
            <Title>Loading...</Title>
            <Subtitle>Please wait while we load your expense information.</Subtitle>
          </Header>
        </Container>
      </ThemeProvider>
    );
  }

  if (error && !memberData) {
    return (
      <ThemeProvider theme={theme}>
        <Head>
          <title>Error - Detroit Commons</title>
        </Head>
        <Container>
          <Header>
            <Title>Error</Title>
            <Subtitle>We couldn&apos;t load your builder information.</Subtitle>
          </Header>
          <Message>{error}</Message>
          <BackLink href={`/builder/${key}`}>
            ← Back to Builder Dashboard
          </BackLink>
        </Container>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Expenses - {memberData?.name} - Detroit Commons</title>
        <meta name="description" content={`${memberData?.name}'s expense management on Detroit Commons`} />
      </Head>
      <Container>
        <Header>
          <BackLink href={`/builder/${key}`}>
            ← Back to Builder Dashboard
          </BackLink>
          <Title>Expense Management</Title>
          <Subtitle>
            Submit new expenses and track their approval status.
          </Subtitle>
        </Header>

        <Section>
          <SectionTitle>Submit New Expense</SectionTitle>
          
          {/* Receipt Upload Section */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ 
              fontFamily: theme.fonts.heading,
              fontSize: '1.2rem',
              marginBottom: '1rem',
              color: theme.colors.asphaltBlack
            }}>
              Upload Receipt
            </h3>
            <UploadArea
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => document.getElementById('receipt-upload')?.click()}
              isDragOver={isDragOver}
            >
              <input
                id="receipt-upload"
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                style={{ display: 'none' }}
              />
              {isUploading ? (
                <div style={{ textAlign: 'center' }}>
                  <LoadingSpinner />
                  <p style={{ marginTop: '1rem', color: theme.colors.rustedSteel }}>
                    Analyzing receipt...
                  </p>
                </div>
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <p style={{ 
                    fontSize: '1.1rem', 
                    marginBottom: '0.5rem',
                    color: theme.colors.asphaltBlack
                  }}>
                    📷 Upload Receipt
                  </p>
                  <p style={{ 
                    fontSize: '0.9rem', 
                    color: theme.colors.rustedSteel,
                    marginBottom: '1rem'
                  }}>
                    Drag and drop or click to upload
                  </p>
                  <p style={{ 
                    fontSize: '0.8rem', 
                    color: theme.colors.rustedSteel,
                    lineHeight: '1.4'
                  }}>
                    We&apos;ll automatically extract expense details from your receipt
                  </p>
                </div>
              )}
            </UploadArea>
          </div>
          
          {error && (
            <Message error>{error}</Message>
          )}
          
          {success && (
            <Message success>{success}</Message>
          )}
        </Section>

        <Section>
          <SectionTitle>Your Expenses</SectionTitle>
          
          <FilterTabs>
            <FilterTab 
              active={activeFilter === 'all'} 
              onClick={() => setActiveFilter('all')}
            >
              All ({expenses.length})
            </FilterTab>
            <FilterTab 
              active={activeFilter === 'pending_approval'} 
              onClick={() => setActiveFilter('pending_approval')}
            >
              Pending Approval ({expenses.filter(e => e.payoutStatus === 'pending_approval').length})
            </FilterTab>
            <FilterTab 
              active={activeFilter === 'pending'} 
              onClick={() => setActiveFilter('pending')}
            >
              Approved ({expenses.filter(e => e.payoutStatus === 'pending').length})
            </FilterTab>
            <FilterTab 
              active={activeFilter === 'completed'} 
              onClick={() => setActiveFilter('completed')}
            >
              Paid ({expenses.filter(e => e.payoutStatus === 'completed').length})
            </FilterTab>
            <FilterTab 
              active={activeFilter === 'rejected'} 
              onClick={() => setActiveFilter('rejected')}
            >
              Rejected ({expenses.filter(e => e.payoutStatus === 'rejected').length})
            </FilterTab>
          </FilterTabs>

          {filteredExpenses.length === 0 ? (
            <EmptyState>
              {activeFilter === 'all' 
                ? 'No expenses yet. Submit your first expense above!'
                : `No ${activeFilter.replace('_', ' ')} expenses.`
              }
            </EmptyState>
          ) : (
            filteredExpenses.map((expense) => (
              <ExpenseCard
                key={expense.id}
                expense={expense}
                showBuilderInfo={false}
                showActions={false}
                showEditForm={false}
              />
            ))
                      <ExpenseLabel>Merchant</ExpenseLabel>
                      <ExpenseValue>{expense.merchant}</ExpenseValue>
                    </ExpenseDetail>
                  )}
                  {expense.category && (
                    <ExpenseDetail>
                      <ExpenseLabel>Category</ExpenseLabel>
                      <ExpenseValue>{expense.category}</ExpenseValue>
                    </ExpenseDetail>
                  )}
                  <ExpenseDetail>
                    <ExpenseLabel>Date</ExpenseLabel>
                    <ExpenseValue>
                      {expense.expenseDate ? formatDate(expense.expenseDate) : formatDate(expense.createdAt)}
                    </ExpenseValue>
                  </ExpenseDetail>
                  <ExpenseDetail>
                    <ExpenseLabel>Payout Address</ExpenseLabel>
                    {editingExpense === expense.id ? (
                      <EditForm>
                        <input
                          type="text"
                          value={editFormData.payoutAddress}
                          onChange={(e) => setEditFormData({ payoutAddress: e.target.value })}
                          placeholder="0x..."
                          style={{ 
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            color: theme.colors.creamyBeige,
                            fontFamily: 'monospace',
                            fontSize: '0.8rem'
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => handleUpdatePayoutAddress(expense.id)}
                          disabled={submitting}
                          style={{ 
                            background: theme.colors.neonOrange,
                            color: theme.colors.asphaltBlack,
                            border: 'none',
                            padding: '0.5rem 1rem',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            cursor: 'pointer'
                          }}
                        >
                          {submitting ? 'Saving...' : 'Save'}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingExpense(null);
                            setEditFormData({ payoutAddress: '' });
                          }}
                          style={{ 
                            background: 'transparent',
                            color: theme.colors.rustedSteel,
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            padding: '0.5rem 1rem',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            cursor: 'pointer'
                          }}
                        >
                          Cancel
                        </button>
                      </EditForm>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <ExpenseValue style={{ fontFamily: 'monospace', fontSize: '0.8rem', flex: 1 }}>
                          {expense.payoutAddress || 'Not set'}
                        </ExpenseValue>
                        <EditButton
                          onClick={() => {
                            setEditingExpense(expense.id);
                            setEditFormData({ payoutAddress: expense.payoutAddress || '' });
                          }}
                        >
                          Edit
                        </EditButton>
                      </div>
                    )}
                  </ExpenseDetail>
                  {expense.approvedBy && (
                    <ExpenseDetail>
                      <ExpenseLabel>Approved By</ExpenseLabel>
                      <ExpenseValue>{expense.approvedBy}</ExpenseValue>
                    </ExpenseDetail>
                  )}
                  {expense.rejectedBy && (
                    <ExpenseDetail>
                      <ExpenseLabel>Rejected By</ExpenseLabel>
                      <ExpenseValue>{expense.rejectedBy}</ExpenseValue>
                    </ExpenseDetail>
                  )}
                  {expense.rejectionReason && (
                    <ExpenseDetail>
                      <ExpenseLabel>Rejection Reason</ExpenseLabel>
                      <ExpenseValue>{expense.rejectionReason}</ExpenseValue>
                    </ExpenseDetail>
                  )}
                </ExpenseDetails>
                
                {expense.notes && (
                  <ExpenseDetail style={{ marginTop: '1rem' }}>
                    <ExpenseLabel>Notes</ExpenseLabel>
                    <ExpenseValue>{expense.notes}</ExpenseValue>
                  </ExpenseDetail>
                )}
              </ExpenseCard>
            ))
          )}
        </Section>
      </Container>

      {/* Submit Modal */}
      {showSubmitModal && (
        <ModalOverlay onClick={() => setShowSubmitModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={() => setShowSubmitModal(false)}>
              ×
            </CloseButton>
            <ModalHeader>
              <ModalTitle>Review & Submit Expense</ModalTitle>
              <ModalSubtitle>
                Please review the details extracted from your receipt and make any necessary changes.
              </ModalSubtitle>
            </ModalHeader>

            <ModalForm onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <ModalFormGroup>
                  <ModalLabel htmlFor="modal-title">Title *</ModalLabel>
                  <ModalInput
                    id="modal-title"
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Brief description of the expense"
                    required
                  />
                </ModalFormGroup>
                <ModalFormGroup>
                  <ModalLabel htmlFor="modal-merchant">Merchant</ModalLabel>
                  <ModalInput
                    id="modal-merchant"
                    type="text"
                    value={formData.merchant}
                    onChange={(e) => setFormData(prev => ({ ...prev, merchant: e.target.value }))}
                    placeholder="Store or business name"
                  />
                </ModalFormGroup>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <ModalFormGroup>
                  <ModalLabel htmlFor="modal-category">Category</ModalLabel>
                  <ModalSelect
                    id="modal-category"
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  >
                    <option value="">Select category</option>
                    <option value="Food">Food</option>
                    <option value="Office Supplies">Office Supplies</option>
                    <option value="Travel">Travel</option>
                    <option value="Equipment">Equipment</option>
                    <option value="Software">Software</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Other">Other</option>
                  </ModalSelect>
                </ModalFormGroup>
                <ModalFormGroup>
                  <ModalLabel htmlFor="modal-amount">Amount *</ModalLabel>
                  <ModalInput
                    id="modal-amount"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.amount}
                    onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                    placeholder="0.00"
                    required
                  />
                </ModalFormGroup>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <ModalFormGroup>
                  <ModalLabel htmlFor="modal-currency">Currency</ModalLabel>
                  <ModalSelect
                    id="modal-currency"
                    value={formData.currency}
                    onChange={(e) => setFormData(prev => ({ ...prev, currency: e.target.value }))}
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                  </ModalSelect>
                </ModalFormGroup>
                <ModalFormGroup>
                  <ModalLabel htmlFor="modal-date">Expense Date</ModalLabel>
                  <ModalInput
                    id="modal-date"
                    type="date"
                    value={formData.expenseDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, expenseDate: e.target.value }))}
                  />
                </ModalFormGroup>
              </div>

              <ModalFormGroup>
                <ModalLabel htmlFor="modal-payout">Payout Address *</ModalLabel>
                <ModalInput
                  id="modal-payout"
                  type="text"
                  value={formData.payoutAddress}
                  onChange={(e) => setFormData(prev => ({ ...prev, payoutAddress: e.target.value }))}
                  placeholder="0x..."
                  required
                />
                <p style={{ 
                  fontSize: '0.8rem', 
                  color: theme.colors.rustedSteel, 
                  marginTop: '0.5rem',
                  lineHeight: '1.4'
                }}>
                  Your default payout address is pre-filled. You can change it for this specific expense.
                </p>
              </ModalFormGroup>

              <ModalFormGroup>
                <ModalLabel htmlFor="modal-notes">Notes</ModalLabel>
                <ModalTextArea
                  id="modal-notes"
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Additional details about this expense"
                />
              </ModalFormGroup>

              <ModalActions>
                <ModalButton
                  type="button"
                  variant="secondary"
                  onClick={() => setShowSubmitModal(false)}
                >
                  Cancel
                </ModalButton>
                <ModalButton
                  type="submit"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <LoadingSpinner />
                      Submitting...
                    </>
                  ) : (
                    'Submit Expense'
                  )}
                </ModalButton>
              </ModalActions>
            </ModalForm>
          </ModalContent>
        </ModalOverlay>
      )}
    </ThemeProvider>
  );
}
