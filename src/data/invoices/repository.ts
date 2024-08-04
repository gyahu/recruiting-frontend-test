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

export const loadInvoices = (): Invoice[] => getValuesIn<Invoice[]>('pendingInvoices') ?? [];