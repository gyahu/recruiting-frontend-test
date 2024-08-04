import React from 'react';
import './RadioButtonCard.css';

export type RadioButtonCardProps = {
  title: string,
  subtitle: string,
  description: string,
  details: string,
};

function RadioButtonCard({ invoice, selected, onClick, name }: {
  invoice: RadioButtonCardProps, selected: boolean, onClick: () => void, name: string,
}) {
  const { title, subtitle, description, details } = invoice;
  return (
    <div className={`RadioButtonCard ${selected && 'selected'}`} onClick={onClick}>
      <div className='RadioButtonCard-name'>
        <input type="radio" name={name} className="RadioButtonCard-button" defaultChecked={selected}></input>
        <p className='RadioButtonCard-title'> { title } </p>
        <p className='RadioButtonCard-subtitle'> ({ subtitle }) </p>
      </div>
        <div className='RadioButtonCard-description'>
          <p> { description } </p>
        </div>
        <div className='RadioButtonCard-details'>
          <p> { details } </p>
        </div>
    </div>
  );
}

export default RadioButtonCard;
