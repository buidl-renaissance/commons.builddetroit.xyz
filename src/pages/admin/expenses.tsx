import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import type { ThemeType } from '@/styles/theme';
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

const FilterTabs = styled.div<{ theme: ThemeType }>`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const FilterTab = styled.button<{ active: boolean }>`
  background: ${({ active, theme }) => 
    active ? theme.colors.neonOrange : 'rgba(255, 255, 255, 0.1)'};
  color: ${({ active, theme }) => 
    active ? theme.colors.asphaltBlack : theme.colors.creamyBeige};
  border: 2px solid ${({ active }) => 
    active ? '#ff6b35' : 'rgba(255, 255, 255, 0.2)'};
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    background: ${({ active }) => 
      active ? '#ffd700' : '#ff6b35'};
    color: #1a1a1a;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ExpensesList = styled.div<{ theme: ThemeType }>`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Message = styled.div<{ success?: boolean; error?: boolean }>`
  padding: 1rem;
  border-radius: 6px;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  background: ${({ success, error }) => 
    success 
      ? 'rgba(40, 167, 69, 0.1)' 
      : error 
      ? 'rgba(220, 53, 69, 0.1)'
      : 'rgba(220, 53, 69, 0.1)'
  };
  border: 1px solid ${({ success, error }) => 
    success 
      ? 'rgba(40, 167, 69, 0.3)' 
      : error 
      ? 'rgba(220, 53, 69, 0.3)'
      : 'rgba(220, 53, 69, 0.3)'
  };
  color: ${({ success, error }) => 
    success 
      ? '#28a745' 
      : error 
      ? '#dc3545'
      : '#dc3545'
  };
`;


interface Builder {
  id: number;
  name: string;
  email: string;
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
  payoutStatus?: string;
  payoutAddress?: string;
  submittedBy?: number;
  submitter?: {
    name: string;
    email: string;
  };
  createdAt: string;
  approvedBy?: string;
  approvedAt?: string;
  rejectedBy?: string;
  rejectedAt?: string;
  rejectionReason?: string;
}

export default function AdminExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [editingExpense, setEditingExpense] = useState<number | null>(null);
  const [builders, setBuilders] = useState<Builder[]>([]);

  const fetchExpenses = useCallback(async () => {
    try {
      const url = activeFilter === 'all' ? '/api/expenses' : `/api/expenses?status=${activeFilter}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.success) {
        // Sort by most recent first
        const sortedExpenses = data.expenses.sort((a: Expense, b: Expense) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        setExpenses(sortedExpenses);
      } else {
        setError('Failed to fetch expenses');
      }
    } catch {
      setError('Failed to fetch expenses');
    }
  }, [activeFilter]);

  useEffect(() => {
    fetchExpenses();
    fetchBuilders();
  }, [fetchExpenses]);

  const fetchBuilders = async () => {
    try {
      const response = await fetch('/api/builders');
      if (response.ok) {
        const data = await response.json();
        setBuilders(data.builders || []);
      } else {
        console.error('Failed to fetch builders');
      }
    } catch (error) {
      console.error('Error fetching builders:', error);
    }
  };

  const updateExpense = async (expenseId: number, updates: Partial<Expense>) => {
    try {
      const response = await fetch('/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'update',
          expenseId,
          ...updates
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setSuccess('Expense updated successfully');
        fetchExpenses(); // Refresh the list
        setEditingExpense(null);
      } else {
        setError(data.error || 'Failed to update expense');
      }
    } catch (error) {
      console.error('Error updating expense:', error);
      setError('Failed to update expense');
    }
  };

  const handleApprove = async (expenseId: number) => {
    try {
        const response = await fetch('/api/expenses', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
          action: 'approve',
          expenseId,
          approvedBy: 'admin@example.com' // You might want to get this from auth
          }),
        });

        const data = await response.json();
        
        if (data.success) {
        setSuccess('Expense approved successfully');
          fetchExpenses(); // Refresh the list
      } else {
        setError(data.error || 'Failed to approve expense');
      }
    } catch (error) {
      console.error('Error approving expense:', error);
      setError('Failed to approve expense');
    }
  };

  const handleReject = async (expenseId: number) => {
    const reason = prompt('Please provide a reason for rejection:');
    if (!reason) return;

    try {
      const response = await fetch('/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'reject',
          expenseId,
          rejectedBy: 'admin@example.com', // You might want to get this from auth
          rejectionReason: reason
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setSuccess('Expense rejected successfully');
        fetchExpenses(); // Refresh the list
      } else {
        setError(data.error || 'Failed to reject expense');
      }
    } catch (error) {
      console.error('Error rejecting expense:', error);
      setError('Failed to reject expense');
    }
  };


  // Clear messages after 5 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(null), 5000);
      return () => clearTimeout(timer);
    }
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);


  return (
    <Container>
      <Header>
        <Title>Expense Management</Title>
        <Subtitle>Review, approve, and manage expense submissions</Subtitle>
      </Header>

      {error && <Message error>{error}</Message>}
      {success && <Message success>{success}</Message>}

      <FilterTabs>
        <FilterTab
          active={activeFilter === 'all'}
          onClick={() => setActiveFilter('all')}
        >
          All Expenses
        </FilterTab>
        <FilterTab
          active={activeFilter === 'pending_approval'}
          onClick={() => setActiveFilter('pending_approval')}
        >
          Pending Approval
        </FilterTab>
        <FilterTab
          active={activeFilter === 'pending'}
          onClick={() => setActiveFilter('pending')}
        >
          Approved (Pending Payout)
        </FilterTab>
        <FilterTab
          active={activeFilter === 'completed'}
          onClick={() => setActiveFilter('completed')}
        >
          Completed
        </FilterTab>
        <FilterTab
          active={activeFilter === 'rejected'}
          onClick={() => setActiveFilter('rejected')}
        >
          Rejected
        </FilterTab>
      </FilterTabs>

      <ExpensesList>
        {expenses.length === 0 ? (
          <div style={{ color: 'rgba(255, 255, 255, 0.6)', textAlign: 'center', padding: '2rem' }}>
            No expenses found for the selected filter.
          </div>
        ) : (
          expenses.map((expense) => (
            <ExpenseCard
              key={expense.id}
              expense={expense}
              builders={builders}
              onUpdateExpense={updateExpense}
              showBuilderInfo={true}
              showActions={true}
              showEditForm={true}
              onEditClick={setEditingExpense}
              onCancelEdit={() => setEditingExpense(null)}
              editingExpenseId={editingExpense}
              customActions={[
                {
                  label: 'Approve',
                  icon: '✅',
                  onClick: (expense) => handleApprove(expense.id)
                },
                {
                  label: 'Reject',
                  icon: '❌',
                  onClick: (expense) => handleReject(expense.id)
                }
              ]}
            />
          ))
        )}
      </ExpensesList>
    </Container>
  );
}