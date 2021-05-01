import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
// for modal
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
//for modal

function ModalMessage({ modalOpen, closeModalFn, bodyContent }) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Attention</h2>
      <p id="simple-modal-description">{bodyContent}</p>
    </div>
  );
  return (
    <Modal
      open={modalOpen}
      onClose={closeModalFn}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {body}
    </Modal>
  );
}

export default ModalMessage;
