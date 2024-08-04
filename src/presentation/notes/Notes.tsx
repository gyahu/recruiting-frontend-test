import React, { useEffect, useState } from "react";
import './Notes.css';
import RadioButtonCard, { RadioButtonCardProps } from '../generics/radio/RadioButtonCard';
import getNotesUseCase from '../../domain/invoices/get-notes-usecase';
import { InvoiceDomainModel } from '../../domain/invoices/invoices';
import { notesTexts } from "./texts";
import { convertTo, toCurrency } from "../../utils/numbers";

const mapInvoiceFor = (invoiceId: string) => (invoices: InvoiceDomainModel[]): RadioButtonCardProps[] => invoices.map(invoice => ({
  title: invoice.id,
  subtitle: invoice.organization,
  description: toCurrency('CLP')(convertTo(invoice.currency, 'CLP')(invoice.amount)),
  secondaryDescription: toCurrency('USD')(convertTo(invoice.currency, 'USD')(invoice.amount)),
  details: invoiceId,
}));

function Notes({selectedBill, selectedNote, setSelectedNote}) {
  const [notes, setNotes] = useState([] as RadioButtonCardProps[]); 
  const [radioName, setRadioName] = useState('');
  useEffect(() => {
    getNotesUseCase(selectedBill.title).then(mapInvoiceFor(selectedBill.title)).then(setNotes);
  }, [selectedBill, selectedNote]);
  useEffect(() => {
    setRadioName(selectedBill.title);
  }, [selectedBill]);
  const onClick = (note) => () => setSelectedNote(note);
  return notes.length > 0 ? (
    <div className="Notes">
      <p> { notesTexts.title } </p>
      <br/>
      <div className="Notes-options">
        {notes.map(note => (
          <RadioButtonCard
            invoice={ note }
            selected={ selectedNote && selectedNote.title === note.title }
            onClick={onClick(note)}
            key={note.title}
            name={radioName}/>
        ))}
      </div>
    </div>
  ) : <p> { notesTexts.empty } </p>;
}

export default Notes;
