import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { TableCell, TextField } from "@mui/material";

const TableCellContent = styled("p")(({ theme, hasUpdates }) => ({
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

  const toggleEditor = () => setIsEditing(!editing);

  return (
    <TableCell onDoubleClick={toggleEditor}>
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
        />
      ) : (
        <TableCellContent hasUpdates={hasUpdates}>{newValue}</TableCellContent>
      )}
    </TableCell>
  );
}

export default ClientCell;
