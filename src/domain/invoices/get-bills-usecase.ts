import { AxiosResponse } from "axios";
import { getPendingInvoices, loadPendingInvoices } from "../../data/invoices/repository"
import { mapToDomainModel } from "./mapper";
import { InvoiceDomainModel } from "./invoices";
import { Invoice } from "../../data/invoices/invoices";
import { getLastUpdateOn } from "../../data/resource-manager.ts/storage";

const isSuccess = (response: AxiosResponse<unknown>) => Math.trunc(response.status / 100) === 2;

const parseInvoices = (invoices: Invoice[]) => invoices
  .filter(invoice => invoice.type === 'received')
  .map(mapToDomainModel)

const getBillsUseCase = async (): Promise<InvoiceDomainModel[]> => {
  const localInvoices = loadPendingInvoices();
  const lastUpdate = getLastUpdateOn('pendingInvoices');
  const secondsSinceLastUpdate = lastUpdate ? (new Date().getTime() - lastUpdate.getTime()) / 1000 : Infinity;
  if (localInvoices.length > 0 && secondsSinceLastUpdate < 60) {
    return parseInvoices(localInvoices);
  }
  const response = await getPendingInvoices();
  if (isSuccess(response)) {
    return parseInvoices(response.data);
  }
  return [];
}

export default getBillsUseCase;