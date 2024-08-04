import { AxiosResponse } from "axios";
import { getPendingInvoices } from "../../data/invoices/repository"
import { mapToDomainModel } from "./mapper";
import { InvoiceDomainModel } from "./invoices";
import { getLastUpdateOn, getValuesIn } from "../../data/resource-manager.ts/storage";
import { Invoice } from "../../data/invoices/invoices";

const isSuccess = (response: AxiosResponse<unknown>) => Math.trunc(response.status / 100) === 2;

const parseInvoices = (invoices: Invoice[], invoiceId: string) => invoices.filter(invoice =>
  invoice.type === 'credit_note'
  && invoice.reference
  && invoice.reference === invoiceId
).map(mapToDomainModel)

const getNotesUseCase = async (invoiceId: string): Promise<InvoiceDomainModel[]> => {
  const localInvoices = getValuesIn<Invoice[]>('pendingInvoices') ?? [];
  const lastUpdate = getLastUpdateOn('pendingInvoices');
  const secondsSinceLastUpdate = lastUpdate ? (new Date().getTime() - lastUpdate.getTime()) / 1000 : Infinity;
  if (localInvoices.length > 0 && secondsSinceLastUpdate < 60) {
    return parseInvoices(localInvoices, invoiceId);
  }
  const response = await getPendingInvoices();
  if (isSuccess(response)) {
    return parseInvoices(response.data, invoiceId);
  }
  return [];
}

export default getNotesUseCase;