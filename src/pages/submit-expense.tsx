import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styled, { ThemeProvider } from 'styled-components';
import { theme, ThemeType } from '../styles/theme';

const Container = styled.div<{ theme: ThemeType }>`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.creamyBeige};

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Header = styled.div<{ theme: ThemeType }>`
  text-align: center;
  margin-bottom: 3rem;
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
  margin-bottom: 2rem;

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

const Form = styled.form<{ theme: ThemeType }>`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 2rem;
  display: grid;
  gap: 1.5rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
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

const InfoBox = styled.div<{ theme: ThemeType }>`
  background: rgba(0, 123, 255, 0.1);
  border: 1px solid rgba(0, 123, 255, 0.3);
  border-radius: 6px;
  padding: 1rem;
  margin-bottom: 2rem;
  font-size: 0.9rem;
  color: #007bff;
`;

const ButtonGroup = styled.div<{ theme: ThemeType }>`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const Divider = styled.div<{ theme: ThemeType }>`
  text-align: center;
  margin: 2rem 0;
  position: relative;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9rem;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: rgba(255, 255, 255, 0.2);
  }

  &::after {
    content: 'OR';
    background: ${({ theme }) => theme.colors.asphaltBlack};
    padding: 0 1rem;
    position: relative;
  }
`;

export default function SubmitExpense() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [trackingId, setTrackingId] = useState('');
  
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    title: '',
    merchant: '',
    category: '',
    amount: '',
    currency: 'USD',
    expenseDate: '',
    notes: '',
    payoutAddress: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/submit-expense', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          title: formData.title,
          merchant: formData.merchant,
          category: formData.category,
          amountCents: Math.round(parseFloat(formData.amount) * 100),
          currency: formData.currency,
          expenseDate: formData.expenseDate,
          notes: formData.notes,
          payoutAddress: formData.payoutAddress
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setSuccess(data.message);
        setTrackingId(data.trackingId);
        setFormData({
          email: '',
          name: '',
          title: '',
          merchant: '',
          category: '',
          amount: '',
          currency: 'USD',
          expenseDate: '',
          notes: '',
          payoutAddress: ''
        });
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

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Submit Expense - Detroit Commons</title>
        <meta name="description" content="Submit an expense for reimbursement from Detroit Commons" />
      </Head>
      <Container>
        <Header>
          <BackLink href="/">
            ← Back to Home
          </BackLink>
          <Title>Submit Expense</Title>
          <Subtitle>
            Submit an expense for reimbursement. All submissions require admin approval.
          </Subtitle>
        </Header>

        <InfoBox>
          💡 <strong>Important:</strong> Please ensure your payout address is correct. 
          Payments will be sent in USDC on the Base network. Double-check your wallet address before submitting.
        </InfoBox>

        <Form onSubmit={handleSubmit}>
          <FormRow>
            <FormGroup>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="your@email.com"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Your full name"
                required
              />
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup>
              <Label htmlFor="title">Expense Title *</Label>
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

          {trackingId && (
            <div style={{ 
              background: 'rgba(40, 167, 69, 0.1)', 
              border: '1px solid rgba(40, 167, 69, 0.3)', 
              borderRadius: '6px', 
              padding: '1rem',
              marginTop: '1rem',
              fontSize: '0.9rem',
              color: '#28a745'
            }}>
              <strong>Tracking ID:</strong> {trackingId}<br />
              <strong>Status:</strong> Pending Approval<br />
              You will receive email updates about your expense submission.
            </div>
          )}
        </Form>

        <Divider />

        <div style={{ textAlign: 'center' }}>
          <p style={{ marginBottom: '1rem', color: 'rgba(255, 255, 255, 0.8)' }}>
            Are you a Detroit Commons builder? Login to access your expense dashboard.
          </p>
          <ButtonGroup>
            <Button as={Link} href="/builders" variant="secondary">
              View Builders
            </Button>
            <Button as={Link} href="/" variant="secondary">
              Learn More
            </Button>
          </ButtonGroup>
        </div>
      </Container>
    </ThemeProvider>
  );
}
