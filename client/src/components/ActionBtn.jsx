import { CircularProgress, IconButton, Tooltip } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";

function ActionBtn({
  action,
  title,
  disabled,
  loading,
  error,
  icon,
  successMsg,
  confirmMsg,
  setShowToast,
  setToastMessage,
}) {
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
    <Tooltip title={title}>
      <IconButton disabled={disabled} onClick={handleClick}>
        {loading && <CircularProgress size={20} />}
        {error && <ReplayIcon />}
        {!loading && !error && icon}
      </IconButton>
    </Tooltip>
  );
}

export default ActionBtn;
