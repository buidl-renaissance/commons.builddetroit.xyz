import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled, { ThemeProvider } from 'styled-components';
import { theme, ThemeType } from '../../../styles/theme';

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

const Message = styled.div<{ theme: ThemeType; success?: boolean }>`
  padding: 1rem;
  border-radius: 6px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.9rem;
  margin-bottom: 1rem;
  background: ${({ success, theme }) => 
    success 
      ? 'rgba(40, 167, 69, 0.1)' 
      : 'rgba(220, 53, 69, 0.1)'
  };
  border: 1px solid ${({ success, theme }) => 
    success 
      ? 'rgba(40, 167, 69, 0.3)' 
      : 'rgba(220, 53, 69, 0.3)'
  };
  color: ${({ success, theme }) => 
    success 
      ? '#28a745' 
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
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  
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
          <Form onSubmit={handleSubmit}>
            <FormRow>
              <FormGroup>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Brief description of the expense"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="merchant">Merchant</Label>
                <Input
                  id="merchant"
                  type="text"
                  value={formData.merchant}
                  onChange={(e) => setFormData(prev => ({ ...prev, merchant: e.target.value }))}
                  placeholder="Store or business name"
                />
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Label htmlFor="category">Category</Label>
                <Select
                  id="category"
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
                </Select>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="amount">Amount *</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.amount}
                  onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                  placeholder="0.00"
                  required
                />
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Label htmlFor="currency">Currency</Label>
                <Select
                  id="currency"
                  value={formData.currency}
                  onChange={(e) => setFormData(prev => ({ ...prev, currency: e.target.value }))}
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="expenseDate">Expense Date</Label>
                <Input
                  id="expenseDate"
                  type="date"
                  value={formData.expenseDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, expenseDate: e.target.value }))}
                />
              </FormGroup>
            </FormRow>

            <FormGroup>
              <Label htmlFor="payoutAddress">Payout Address *</Label>
              <Input
                id="payoutAddress"
                type="text"
                value={formData.payoutAddress}
                onChange={(e) => setFormData(prev => ({ ...prev, payoutAddress: e.target.value }))}
                placeholder="0x..."
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="notes">Notes</Label>
              <TextArea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Additional details about this expense"
              />
            </FormGroup>

            {error && <Message>{error}</Message>}
            {success && <Message success>{success}</Message>}

            <Button type="submit" disabled={submitting}>
              {submitting ? (
                <>
                  <LoadingSpinner />
                  Submitting...
                </>
              ) : (
                'Submit Expense'
              )}
            </Button>
          </Form>
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
              <ExpenseCard key={expense.id}>
                <ExpenseHeader>
                  <div>
                    <ExpenseTitle>{expense.title}</ExpenseTitle>
                    <StatusBadge status={expense.payoutStatus || 'pending_approval'}>
                      {expense.payoutStatus?.replace('_', ' ') || 'pending approval'}
                    </StatusBadge>
                  </div>
                  {expense.amountCents && (
                    <ExpenseAmount>
                      {formatAmount(expense.amountCents, expense.currency)}
                    </ExpenseAmount>
                  )}
                </ExpenseHeader>
                
                <ExpenseDetails>
                  {expense.merchant && (
                    <ExpenseDetail>
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
                  {expense.payoutAddress && (
                    <ExpenseDetail>
                      <ExpenseLabel>Payout Address</ExpenseLabel>
                      <ExpenseValue style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
                        {expense.payoutAddress}
                      </ExpenseValue>
                    </ExpenseDetail>
                  )}
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
    </ThemeProvider>
  );
}
