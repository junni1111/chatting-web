import React, { useState, useRef, useEffect } from 'react';
import firebase from 'services/firebase/firebaseconfig';
import 'components/reset-button/style/resetButton.css';
import $ from 'jquery';
import ResetModal from './resetModal';

type reset = {
  reset: () => void;
};

const ResetButton = (props : reset) => {
  const {reset} = props;
  const [modalOpen, setModalOpen] = useState(false);

  const opneModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <button onClick={opneModal}>reset</button>
      <ResetModal open={modalOpen} close={closeModal} reset={reset}/>
    </div>
  );
};

export default ResetButton;
