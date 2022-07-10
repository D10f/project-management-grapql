import {
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
} from "@mui/material";

function ConfirmationDialog({ open, onCancel, onConfirm, children }) {
  return (
    <Dialog open={open}>
      <DialogTitle>{children}</DialogTitle>
      <DialogActions>
        <Button autoFocus onClick={onConfirm}>
          Confirm
        </Button>
        <Button onClick={onCancel}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmationDialog;
