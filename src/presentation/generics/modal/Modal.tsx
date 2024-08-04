import React from "react";
import './Modal.css';

function Modal ({ handleClose, show, children }: {
  handleClose?: () => void, show: boolean, children: React.ReactNode,
}) {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        {handleClose && <button type="button" onClick={handleClose}>Close</button>}
      </section>
    </div>
  );
};

export default Modal;