import { assignInvoice } from "../../data/invoices/repository"

const assignNoteUseCase = async (invoiceId: string) => assignInvoice(invoiceId);

export default assignNoteUseCase;