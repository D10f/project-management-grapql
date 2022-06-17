import { useState } from "react";
import { CircularProgress, IconButton, Tooltip } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import Toast from "./Toast";

function ActionBtn({
  action,
  title,
  disabled,
  loading,
  error,
  icon,
  successMsg,
}) {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleClick = async () => {
    try {
      await action();
      setToastMessage(successMsg);
    } catch (error) {
      setToastMessage(error.message);
    } finally {
      setShowToast(true);
    }
  };

  return (
    <>
      <Toast
        key={crypto.randomUUID()}
        open={showToast}
        onClose={() => {
          setShowToast(false);
          setToastMessage("");
        }}
        type={error ? "error" : "success"}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        autoHideDuration={6000}
        message={toastMessage}
      />

      <Tooltip title={title}>
        <IconButton disabled={disabled} onClick={handleClick}>
          {loading && <CircularProgress size={20} />}
          {error && <ReplayIcon />}
          {!loading && !error && icon}
        </IconButton>
      </Tooltip>
    </>
  );
}

export default ActionBtn;
