import React from 'react';
import './Summary.css';

export type SummaryProps = {
  title: string,
  subtitle: string,
  description: string,
  secondaryDescription: string,
  details: string,
};

function Summary({ invoice, selected }: {
  invoice: SummaryProps, selected: boolean, onClick?: () => void, name: string,
}) {
  const { title, subtitle, description, secondaryDescription, details } = invoice;
  return (
    <div className={`Summary ${selected && 'selected'}`}>
      <div className='Summary-name'>
        <p className='Summary-title'> { title } </p>
        <p className='Summary-subtitle'> ({ subtitle }) </p>
      </div>
        <div className='Summary-description'>
          <p className='Summary-main'> { description } </p>
          <p className='Summary-secondary'> ({ secondaryDescription }) </p>
        </div>
        <div className='Summary-details'>
          <p> { details } </p>
        </div>
    </div>
  );
}

export default Summary;
