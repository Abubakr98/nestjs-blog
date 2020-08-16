import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { CommentForm } from './components/comment-form';
import { DialogTitle, DialogContent, DialogActions } from './components/commentOptions';
type IPropsComment = {
  open: boolean;
  setOpen: (open: boolean) => void;
};
export const CommentModal: React.FC<IPropsComment> = (props) => {
  const open = props.open;
  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Comment
        </DialogTitle>
        <DialogContent dividers>
          <CommentForm />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Leave
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
