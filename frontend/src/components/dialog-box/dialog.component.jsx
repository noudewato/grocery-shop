import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const DialogBox = ({ open, onClose, title, deleteFunction }) => {
     const theme = useTheme();
     const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Dialog
      open={Boolean(open)}
      fullScreen={fullScreen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {'Delete'} {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">Are you sure you want to delete ?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={deleteFunction} variant="contained" color="error">
          Delete
        </Button>
        <Button onClick={onClose} variant="outlined" autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogBox;
