import React, { useState } from 'react';
import styled from 'styled-components';
import type { ThemeType } from '@/styles/theme';

const ExpenseCardContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 0.75rem;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    border-color: rgba(255, 255, 255, 0.2);
  }
`;

const ExpenseHeader = styled.div<{ theme: ThemeType }>`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
  gap: 0.75rem;
`;

const ExpenseHeaderLeft = styled.div`
  flex: 1;
  min-width: 0;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ExpenseTitle = styled.h3<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.creamyBeige};
  margin: 0 0 0.35rem 0;
  word-break: break-word;
`;

const ExpenseMetadata = styled.div`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
  flex-wrap: wrap;

  span {
    white-space: nowrap;
  }
`;

const ReceiptLink = styled.a`
  color: #28a745;
  text-decoration: underline;
  font-size: 0.8rem;
  display: inline-block;
  margin-top: 0.2rem;
  
  &:hover {
    color: #3cdb5c;
  }
`;

const EditIconButton = styled.button<{ theme: ThemeType }>`
  background: transparent;
  border: none;
  color: white;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  transition: opacity 0.2s ease;
  flex-shrink: 0;
  opacity: 0.7;

  &:hover {
    opacity: 1;
  }
`;

const ApprovalActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
`;

const ApprovalButton = styled.button<{ theme: ThemeType; variant?: 'approve' | 'reject' }>`
  background: ${({ variant }) => 
    variant === 'reject' ? 'rgba(220, 53, 69, 0.2)' : 'rgba(40, 167, 69, 0.2)'};
  color: ${({ variant }) => 
    variant === 'reject' ? '#dc3545' : '#28a745'};
  border: 1px solid ${({ variant }) => 
    variant === 'reject' ? 'rgba(220, 53, 69, 0.3)' : 'rgba(40, 167, 69, 0.3)'};
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    background: ${({ variant }) => 
      variant === 'reject' ? 'rgba(220, 53, 69, 0.3)' : 'rgba(40, 167, 69, 0.3)'};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;


const ExpenseAmount = styled.div<{ theme: ThemeType }>`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.neonOrange};
  font-weight: bold;
  text-align: right;
  white-space: nowrap;
`;

const StatusBadge = styled.span<{ status: string }>`
  display: inline-block;
  padding: 0.2rem 0.6rem;
  border-radius: 10px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: ${({ status }) => {
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
  color: ${({ status }) => {
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
  border: 1px solid ${({ status }) => {
    switch (status) {
      case 'pending_approval': return 'rgba(255, 193, 7, 0.3)';
      case 'pending': return 'rgba(0, 123, 255, 0.3)';
      case 'processing': return 'rgba(255, 193, 7, 0.3)';
      case 'completed': return 'rgba(40, 167, 69, 0.3)';
      case 'failed': return 'rgba(220, 53, 69, 0.3)';
      case 'rejected': return 'rgba(220, 53, 69, 0.3)';
      default: return 'rgba(108, 117, 125, 0.3)';
    }
  }};
`;


const ExpenseDetails = styled.div<{ theme: ThemeType }>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.75rem;
  margin-bottom: 0.5rem;
`;

const ExpenseDetail = styled.div<{ theme: ThemeType }>`
  color: ${({ theme }) => theme.colors.creamyBeige};
  opacity: 0.9;
  font-size: 0.85rem;
`;

const ExpenseLabel = styled.span<{ theme: ThemeType }>`
  font-weight: 600;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: ${({ theme }) => theme.colors.creamyBeige};
  opacity: 0.7;
  display: block;
  margin-bottom: 0.25rem;
`;

const ExpenseValue = styled.span<{ theme: ThemeType }>`
  color: ${({ theme }) => theme.colors.creamyBeige};
  word-break: break-word;
`;

const EditForm = styled.div<{ theme: ThemeType }>`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  margin-top: 0.5rem;
`;

const FormRow = styled.div<{ theme: ThemeType }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div<{ theme: ThemeType }>`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

const FormLabel = styled.label<{ theme: ThemeType }>`
  font-size: 0.8rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.creamyBeige};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const FormInput = styled.input<{ theme: ThemeType }>`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  padding: 0.6rem;
  color: ${({ theme }) => theme.colors.creamyBeige};
  font-size: 0.95rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.neonOrange};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.neonOrange}20;
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const FormSelect = styled.select<{ theme: ThemeType }>`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  padding: 0.6rem;
  color: ${({ theme }) => theme.colors.creamyBeige};
  font-size: 0.95rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.neonOrange};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.neonOrange}20;
  }

  option {
    background: ${({ theme }) => theme.colors.asphaltBlack};
    color: ${({ theme }) => theme.colors.creamyBeige};
  }
`;

const FormTextArea = styled.textarea<{ theme: ThemeType }>`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  padding: 0.6rem;
  color: ${({ theme }) => theme.colors.creamyBeige};
  font-size: 0.95rem;
  min-height: 70px;
  resize: vertical;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.neonOrange};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.neonOrange}20;
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const FormActions = styled.div<{ theme: ThemeType }>`
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  margin-top: 0.5rem;
`;

const FormButton = styled.button<{ theme: ThemeType; variant?: 'primary' | 'secondary' }>`
  background: ${({ variant, theme }) => 
    variant === 'secondary' ? 'transparent' : theme.colors.neonOrange};
  color: ${({ variant, theme }) => 
    variant === 'secondary' ? theme.colors.creamyBeige : theme.colors.asphaltBlack};
  border: 2px solid ${({ variant, theme }) => 
    variant === 'secondary' ? theme.colors.rustedSteel : theme.colors.neonOrange};
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover:not(:disabled) {
    background: ${({ variant, theme }) => 
      variant === 'secondary' ? theme.colors.rustedSteel : theme.colors.neonYellow};
    color: ${({ variant, theme }) => 
      variant === 'secondary' ? theme.colors.creamyBeige : theme.colors.asphaltBlack};
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

interface ExpenseCardProps {
  expense: Expense;
  builders?: Builder[];
  onUpdateExpense?: (expenseId: number, updates: Partial<Expense>) => Promise<void>;
  showEditForm?: boolean;
  onEditClick?: (expenseId: number) => void;
  onCancelEdit?: () => void;
  editingExpenseId?: number | null;
  onApprove?: (expense: Expense) => void;
  onReject?: (expense: Expense) => void;
}

export default function ExpenseCard({
  expense,
  builders = [],
  onUpdateExpense,
  showEditForm = false,
  onEditClick,
  onCancelEdit,
  editingExpenseId,
  onApprove,
  onReject
}: ExpenseCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [localExpense, setLocalExpense] = useState(expense);

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

  const handleEditClick = () => {
    setIsEditing(true);
    if (onEditClick) {
      onEditClick(expense.id);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setLocalExpense(expense); // Reset to original
    if (onCancelEdit) {
      onCancelEdit();
    }
  };

  const handleSaveChanges = async () => {
    if (onUpdateExpense) {
      await onUpdateExpense(expense.id, {
        title: localExpense.title,
        merchant: localExpense.merchant,
        category: localExpense.category,
        amountCents: localExpense.amountCents,
        currency: localExpense.currency,
        payoutAddress: localExpense.payoutAddress,
        submittedBy: localExpense.submittedBy,
        notes: localExpense.notes
      });
    }
    setIsEditing(false);
  };

  const updateLocalExpense = (field: string, value: string | number | null) => {
    setLocalExpense(prev => ({ ...prev, [field]: value === null ? undefined : value }));
  };

  const isCurrentlyEditing = editingExpenseId === expense.id || isEditing;

  return (
    <ExpenseCardContainer>
      <ExpenseHeader>
        <ExpenseHeaderLeft>
          <TitleRow>
            <ExpenseTitle>{localExpense.title}</ExpenseTitle>
            {showEditForm && (
              <EditIconButton onClick={handleEditClick} title="Edit expense">
                ✏️
              </EditIconButton>
            )}
          </TitleRow>
          <ExpenseMetadata>
            <span>📅 {localExpense.expenseDate ? formatDate(localExpense.expenseDate) : formatDate(localExpense.createdAt)}</span>
            {localExpense.merchant && <span>• {localExpense.merchant}</span>}
            {localExpense.category && <span>• {localExpense.category}</span>}
            {localExpense.submitter && <span>• 👤 {localExpense.submitter.name}</span>}
            {localExpense.payoutStatus && (
              <StatusBadge status={localExpense.payoutStatus}>
                {localExpense.payoutStatus.replace('_', ' ')}
              </StatusBadge>
            )}
          </ExpenseMetadata>
          {localExpense.receiptUrl && (
            <ReceiptLink 
              href={localExpense.receiptUrl} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              📎 View Original Receipt
            </ReceiptLink>
          )}
          {localExpense.payoutStatus === 'pending_approval' && (onApprove || onReject) && (
            <ApprovalActions>
              {onApprove && (
                <ApprovalButton onClick={() => onApprove(expense)}>
                  ✓ Approve
                </ApprovalButton>
              )}
              {onReject && (
                <ApprovalButton variant="reject" onClick={() => onReject(expense)}>
                  ✕ Reject
                </ApprovalButton>
              )}
            </ApprovalActions>
          )}
        </ExpenseHeaderLeft>
        {localExpense.amountCents && (
          <ExpenseAmount>
            {formatAmount(localExpense.amountCents, localExpense.currency)}
          </ExpenseAmount>
        )}
      </ExpenseHeader>

      {/* Builder Info */}
      {/* {showBuilderInfo && localExpense.submitter && (
        <BuilderInfo>
          <BuilderAvatar>
            {localExpense.submitter.name.charAt(0).toUpperCase()}
          </BuilderAvatar>
          <div>
            <div style={{ fontWeight: '600' }}>{localExpense.submitter.name}</div>
            <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>{localExpense.submitter.email}</div>
          </div>
        </BuilderInfo>
      )} */}

      {/* Edit Form */}
      {showEditForm && isCurrentlyEditing && (
        <EditForm>
          <FormRow>
            <FormGroup>
              <FormLabel>Title</FormLabel>
              <FormInput
                type="text"
                value={localExpense.title}
                onChange={(e) => updateLocalExpense('title', e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Merchant</FormLabel>
              <FormInput
                type="text"
                value={localExpense.merchant || ''}
                onChange={(e) => updateLocalExpense('merchant', e.target.value)}
              />
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup>
              <FormLabel>Category</FormLabel>
              <FormSelect
                value={localExpense.category || ''}
                onChange={(e) => updateLocalExpense('category', e.target.value)}
              >
                <option value="">Select category</option>
                <option value="Food">Food</option>
                <option value="Office Supplies">Office Supplies</option>
                <option value="Travel">Travel</option>
                <option value="Equipment">Equipment</option>
                <option value="Software">Software</option>
                <option value="Marketing">Marketing</option>
                <option value="Other">Other</option>
              </FormSelect>
            </FormGroup>
            <FormGroup>
              <FormLabel>Amount</FormLabel>
              <FormInput
                type="number"
                step="0.01"
                value={localExpense.amountCents ? localExpense.amountCents / 100 : 0}
                onChange={(e) => updateLocalExpense('amountCents', Math.round(parseFloat(e.target.value) * 100))}
              />
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup>
              <FormLabel>Currency</FormLabel>
              <FormSelect
                value={localExpense.currency || 'USD'}
                onChange={(e) => updateLocalExpense('currency', e.target.value)}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </FormSelect>
            </FormGroup>
            {builders.length > 0 && (
              <FormGroup>
                <FormLabel>Assigned Builder</FormLabel>
                <FormSelect
                  value={localExpense.submittedBy || ''}
                  onChange={(e) => updateLocalExpense('submittedBy', e.target.value ? parseInt(e.target.value) : null)}
                >
                  <option value="">No builder assigned</option>
                  {builders.map((builder) => (
                    <option key={builder.id} value={builder.id}>
                      {builder.name} ({builder.email})
                    </option>
                  ))}
                </FormSelect>
              </FormGroup>
            )}
          </FormRow>

          <FormGroup>
            <FormLabel>Payout Address</FormLabel>
            <FormInput
              type="text"
              value={localExpense.payoutAddress || ''}
              placeholder="0x..."
              onChange={(e) => updateLocalExpense('payoutAddress', e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Notes</FormLabel>
            <FormTextArea
              value={localExpense.notes || ''}
              placeholder="Additional notes about this expense"
              onChange={(e) => updateLocalExpense('notes', e.target.value)}
            />
          </FormGroup>

          <FormActions>
            <FormButton
              type="button"
              variant="secondary"
              onClick={handleCancelEdit}
            >
              Cancel
            </FormButton>
            <FormButton
              type="button"
              onClick={handleSaveChanges}
            >
              Save Changes
            </FormButton>
          </FormActions>
        </EditForm>
      )}

      <ExpenseDetails>
        {localExpense.notes && (
          <ExpenseDetail>
            <ExpenseLabel>Notes</ExpenseLabel>
            <ExpenseValue>{localExpense.notes}</ExpenseValue>
          </ExpenseDetail>
        )}
        {localExpense.payoutAddress && (
          <ExpenseDetail>
            <ExpenseLabel>Payout Address</ExpenseLabel>
            <ExpenseValue style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
              {localExpense.payoutAddress}
            </ExpenseValue>
          </ExpenseDetail>
        )}
        {localExpense.approvedBy && (
          <ExpenseDetail>
            <ExpenseLabel>Approved By</ExpenseLabel>
            <ExpenseValue>{localExpense.approvedBy}</ExpenseValue>
          </ExpenseDetail>
        )}
        {localExpense.rejectedBy && (
          <ExpenseDetail>
            <ExpenseLabel>Rejected By</ExpenseLabel>
            <ExpenseValue>{localExpense.rejectedBy}</ExpenseValue>
          </ExpenseDetail>
        )}
        {localExpense.rejectionReason && (
          <ExpenseDetail>
            <ExpenseLabel>Rejection Reason</ExpenseLabel>
            <ExpenseValue>{localExpense.rejectionReason}</ExpenseValue>
          </ExpenseDetail>
        )}
      </ExpenseDetails>

    </ExpenseCardContainer>
  );
}
