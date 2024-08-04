import axios, { AxiosResponse } from "axios"
import { Invoice } from "./invoices"
import { getValuesIn, saveTo } from "../resource-manager.ts/storage";

const baseUrl = 'https://recruiting.api.bemmbo.com/invoices'

export const getPendingInvoices = async (
): Promise<AxiosResponse<Invoice[]>> => {
  const pendingInvoices = await axios.get(`${baseUrl}/pending`);
  saveTo('pendingInvoices', pendingInvoices);
  return pendingInvoices;
}

export const loadPendingInvoices = (): Invoice[] => getValuesIn<Invoice[]>('pendingInvoices') ?? [];

export const loadAssignedInvoices = (): string[] => getValuesIn<string[]>('assignedInvoices') ?? [];

export const assignInvoice = (invoiceId: string) => {
  const invoices = loadAssignedInvoices();
  saveTo('assignedInvoices', invoices.concat(invoiceId));
}