import { AxiosResponse } from "axios";
import { getPendingInvoices, loadAssignedInvoices, loadPendingInvoices } from "../../data/invoices/repository"
import { mapToDomainModel } from "./mapper";
import { InvoiceDomainModel } from "./invoices";
import { getLastUpdateOn } from "../../data/resource-manager.ts/storage";
import { Invoice } from "../../data/invoices/invoices";

const isSuccess = (response: AxiosResponse<unknown>) => Math.trunc(response.status / 100) === 2;

const parseInvoicesWithout = (locallyAssignedInvoicesIds: string[]) => (invoices: Invoice[], invoiceId: string) => invoices.filter(invoice =>
  invoice.type === 'credit_note'
  && invoice.reference
  && invoice.reference === invoiceId
  && !locallyAssignedInvoicesIds.includes(invoice.id)
).map(mapToDomainModel)

const getNotesUseCase = async (invoiceId: string): Promise<InvoiceDomainModel[]> => {
  const locallyAssignedInvoices = loadAssignedInvoices();
  const localInvoices = loadPendingInvoices();
  const lastUpdate = getLastUpdateOn('pendingInvoices');
  const secondsSinceLastUpdate = lastUpdate ? (new Date().getTime() - lastUpdate.getTime()) / 1000 : Infinity;
  if (localInvoices.length > 0 && secondsSinceLastUpdate < 60) {
    return parseInvoicesWithout(locallyAssignedInvoices)(localInvoices, invoiceId);
  }
  const response = await getPendingInvoices();
  if (isSuccess(response)) {
    return parseInvoicesWithout(locallyAssignedInvoices)(response.data, invoiceId);
  }
  return [];
}

export default getNotesUseCase;