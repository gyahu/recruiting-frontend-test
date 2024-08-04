export type InvoiceType = 'credit_note' | 'received';

export type Invoice = {
  amount: number;
  currency: string;
  organization_id: string;
  id: string;
  type: InvoiceType;
  reference?: string;
}