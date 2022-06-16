import ReactDOM from "react-dom";
import { useRef } from "react";
import { Snackbar, Alert } from "@mui/material";

function Toast({ id, open, onClose, message, type }) {
  const ref = useRef(document.querySelector("body"));

  return ReactDOM.createPortal(
    <Snackbar
      key={id}
      open={open}
      onClose={onClose}
      anchorOrigin={{ horizontal: "right", vertical: "top" }}
      autoHideDuration={6000}
    >
      <Alert severity={type}>{message}</Alert>
    </Snackbar>,
    ref.current
  );
}

export default Toast;
