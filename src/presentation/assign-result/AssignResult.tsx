import React from "react";
import './AssignResult.css';
import { assignResultTexts } from "./texts";

function AssignResult ({ handleClose }) {
  return (
    <div className='AssignResult'>
      <img className='AssignResult-img' src={require('../../assets/success_image.jpg')} alt="success" />
      <p> { assignResultTexts.title } </p>
      <div className="AssignResult-button"><button type="button" onClick={handleClose}>
        { assignResultTexts.button }
      </button></div>
    </div>
  );
};

export default AssignResult;