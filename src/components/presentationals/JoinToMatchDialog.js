import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DialogContent, DialogContentText, TextField, DialogActions, Button } from '@material-ui/core';

const JoinToMatchDialog = (props) => (
  <Dialog open={props.open} onClose={props.onClose}>
    <form
      onSubmit={event => {
        event.preventDefault();
        props.onConfirmation(event.target.elements.playerNumber.value)
      }}
    >
      <DialogTitle>Unirse a Convocatoria</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Para unirte a la convocatoria ingresa el numero de tu camiseta
      </DialogContentText>
        <TextField name="playerNumber" autoFocus margin="dense" label="Numero camiseta" type="number" fullWidth />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary">Cancelar</Button>
        <Button type="submit" color="primary">Unirse</Button>
      </DialogActions>
    </form>
  </Dialog>
)

export default JoinToMatchDialog;