import React from "react";
import Modal from "@material-ui/core/Modal";
function ModalMessage({ modalOpen, closeModalFn, bodyContent }) {
  return (
    <Modal
      open={modalOpen}
      onClose={closeModalFn}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {bodyContent}
    </Modal>
  );
}

export default ModalMessage;
