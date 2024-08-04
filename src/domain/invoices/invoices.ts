import { InvoiceType } from "../../data/invoices/invoices";

export type InvoiceDomainModel = {
  amount: number;
  currency: string;
  organization: string;
  id: string;
  type: InvoiceType;
  reference?: string;
}