import React from "react";
import './AssignResult.css';
import { assignResultTexts } from "./texts";
import Summary from "./Summary";

function AssignResult ({ handleClose, assignedNote }) {
  return (
    <div className='AssignResult'>
      <img className='AssignResult-img' src={require('../../assets/success_image.jpg')} alt="success" />
      <p> { assignResultTexts.title } </p>
      <Summary
            invoice={ assignedNote }
            selected={ false }
            key={assignedNote.title}
            name='result'/>
      <div className="AssignResult-button"><button type="button" onClick={handleClose}>
        { assignResultTexts.button }
      </button></div>
    </div>
  );
};

export default AssignResult;