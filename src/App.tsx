import React, {useState} from 'react';
import './App.css';
import Billings from './presentation/billings/Billings';
import Notes from './presentation/notes/Notes';
import Modal from './presentation/generics/modal/Modal';
import AssignResult from './presentation/assign-result/AssignResult';
import { RadioButtonCardProps } from './presentation/generics/radio/RadioButtonCard';
import { appTexts } from './texts';
import assignNoteUseCase from './domain/invoices/assign-note-usecase';

function App() {
  const [selectedBill, setSelectedBill] = useState(undefined as RadioButtonCardProps | undefined);
  const [selectedNote, setSelectedNote] = useState(undefined as RadioButtonCardProps | undefined);
  const [show, setShow] = useState(false);
  const assignNote = () => {
    assignNoteUseCase(selectedNote!.title);
    setShow(true);
  }
  const reset = () => {
    setSelectedBill(undefined);
    setSelectedNote(undefined);
    setShow(false);
  }
  return (
    <div className="App">
      <Modal show={show}>
        {selectedNote && <AssignResult handleClose={reset} assignedNote={selectedNote}/>}
      </Modal>
      <div className="App-header">
        <Billings
          setSelectedBill={setSelectedBill}
          selectedBill={selectedBill}/>

        {selectedBill && <div><br/>
          <Notes
            setSelectedNote={setSelectedNote}
            selectedNote={selectedNote}
            selectedBill={selectedBill}/>
          <br/></div>}

      </div>
      { selectedNote && <button className="App-button" type="button" onClick={assignNote}> { appTexts.button } </button> }
    </div>
  );
}

export default App;
