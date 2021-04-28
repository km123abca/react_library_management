import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Button } from "@material-ui/core";
function ConfDialogue({
  open,
  handleClose,
  handleAcceptance,
  handleDenial,
  msg,
}) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Attention!!!"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {msg}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAcceptance} color="primary">
          Yes
        </Button>
        <Button onClick={handleDenial} color="primary" autoFocus>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfDialogue;
