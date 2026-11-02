export enum Segment {
  Retail = 'retail',
  Premium = 'premium',
}

export enum AccountType {
  Checking = 'checking',
  Savings = 'savings',
  Credit = 'credit',
}

export enum TransactionDirection {
  In = 'in',
  Out = 'out',
}

export enum TransactionStatus {
  Posted = 'posted',
  Pending = 'pending',
}

export enum TransferStatus {
  Completed = 'completed',
}

export enum TransferStep {
  Recipient = 'recipient',
  Amount = 'amount',
  Review = 'review',
}
