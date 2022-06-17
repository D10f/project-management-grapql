import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { IconButton, TableCell, TextField, Tooltip } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";

const TableCellContent = styled("pre")(({ theme, hasUpdates }) => ({
  fontFamily: theme.typography.fontFamily,
  color: hasUpdates ? theme.palette.primary.main : theme.palette.common.black,
}));

function ClientCell({ value, name, placeholder, handleCellUpdate }) {
  const [newValue, setNewValue] = useState(value);
  const [editing, setIsEditing] = useState(false);
  const [hasUpdates, setHasUpdates] = useState(false);

  useEffect(() => {
    setHasUpdates(value !== newValue);
  }, [value, newValue]);

  const handleChange = (e) => {
    setNewValue(e.target.value);
    handleCellUpdate(e.target.name, e.target.value);
  };

  const handleResetCell = () => {
    setNewValue(value);
    setIsEditing(false);
    setHasUpdates(false);
    handleCellUpdate(name, value);
  };

  const toggleEditor = () => setIsEditing(!editing);

  return (
    <TableCell padding="none" size="small" onDoubleClick={toggleEditor}>
      {editing ? (
        <TextField
          multiline
          autoFocus
          name={name}
          placeholder={placeholder}
          value={newValue}
          margin="dense"
          size="small"
          variant="outlined"
          onChange={handleChange}
          color={hasUpdates ? "primary" : "dark"}
          sx={{ maxWidth: "80%", padding: "0" }}
          InputProps={
            hasUpdates && {
              endAdornment: (
                <Tooltip title="Reset">
                  <IconButton
                    size="small"
                    disableRipple={true}
                    onClick={handleResetCell}
                    sx={{ padding: "0" }}
                  >
                    <UndoIcon />
                  </IconButton>
                </Tooltip>
              ),
            }
          }
        />
      ) : (
        <TableCellContent hasUpdates={hasUpdates}>{newValue}</TableCellContent>
      )}
    </TableCell>
  );
}

export default ClientCell;
