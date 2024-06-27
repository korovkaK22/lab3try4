import React from 'react';
import Dialog from 'components/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const ConfirmDeleteDialog = ({
  open,
  dialogTitle,
  dialogContentText,
  cancelButtonText,
  confirmButtonText,
  handleDeleteCancel,
  handleDeleteConfirm,
}) => {
  return (
    <Dialog open={open} onClose={handleDeleteCancel}>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>{dialogContentText}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDeleteCancel} color="primary">
          {cancelButtonText}
        </Button>
        <Button onClick={handleDeleteConfirm} color="primary" autoFocus>
          {confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;