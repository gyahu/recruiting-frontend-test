import React, { useEffect, useState } from "react";
import './Billings.css';
import RadioButtonCard, { RadioButtonCardProps } from '../generics/radio/RadioButtonCard';
import getBillsUseCase from '../../domain/invoices/get-bills-usecase';
import { InvoiceDomainModel } from '../../domain/invoices/invoices';
import { billingTexts } from "./texts";

const mapInvoice = (invoices: InvoiceDomainModel[]): RadioButtonCardProps[] => invoices.map(invoice => ({
  title: invoice.id,
  subtitle: invoice.organization,
  description: invoice.amount.toString(),
  details: billingTexts.invoiceDetail,
}));

function Billings({selectedBill, setSelectedBill}) {
  const [bills, setBills] = useState([] as RadioButtonCardProps[]); 
  useEffect(() => {
    getBillsUseCase().then(mapInvoice).then(setBills);
  }, [selectedBill]);
  const onClick = (bill) => () => setSelectedBill(bill);
  return (
    <div className="Billings">
      <p> { billingTexts.title } </p>
      <br/>
      <div className="Billings-options">
        {bills.map(bill => (
          <RadioButtonCard
            invoice={ bill }
            selected={selectedBill && selectedBill.title === bill.title}
            onClick={onClick(bill)}
            key={bill.title}
            name='billings'/>
        ))}
      </div>
    </div>
  );
}

export default Billings;
