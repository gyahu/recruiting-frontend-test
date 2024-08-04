import { Invoice } from "../../data/invoices/invoices";
import { InvoiceDomainModel } from "./invoices";

export const mapToDomainModel = (invoice: Invoice): InvoiceDomainModel => ({
  amount: invoice.amount,
  currency: invoice.currency,
  organization: invoice.organization_id,
  id: invoice.id,
  type: invoice.type,
  reference: invoice.reference,
})