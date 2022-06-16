import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_CLIENT, UPDATE_CLIENT } from "../mutations/clients";
import { GET_CLIENTS } from "../queries/clients";

import { TableCell, TableRow } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";

import ClientCell from "./ClientCell";
import ActionBtn from "./ActionBtn";

function ClientRow({ id, name, email, phone }) {
  const [cellValues, setCellValues] = useState({
    name,
    email,
    phone,
  });
  const [hasUpdates, setHasUpdates] = useState(false);

  useEffect(() => {
    setHasUpdates(
      name !== cellValues.name ||
        email !== cellValues.email ||
        phone !== cellValues.phone
    );
  }, [name, email, phone, cellValues]);

  const [updateClient, updateClientOptions] = useMutation(UPDATE_CLIENT, {
    variables: { id, ...cellValues },
    update(cache, { data }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          clients: clients.map((client) => {
            return client.id === data.updateClient.id
              ? data.updateClient
              : client;
          }),
        },
      });
    },
  });

  const [deleteClient, deleteClientOptions] = useMutation(DELETE_CLIENT, {
    variables: { id },
    update(cache, { data }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          clients: clients.filter(
            (client) => client.id !== data.deleteClient.id
          ),
        },
      });
    },
  });

  const handleCellUpdate = (name, value) => {
    setCellValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <TableRow hover>
      <TableCell>{id}</TableCell>
      <ClientCell
        value={name}
        name="name"
        handleCellUpdate={handleCellUpdate}
      />
      <ClientCell
        value={email}
        name="email"
        handleCellUpdate={handleCellUpdate}
      />
      <ClientCell
        value={phone}
        name="phone"
        handleCellUpdate={handleCellUpdate}
      />
      <TableCell align="right">
        {hasUpdates && (
          <ActionBtn
            action={updateClient}
            disabled={
              updateClientOptions.loading || deleteClientOptions.loading
            }
            loading={updateClientOptions.loading}
            error={updateClientOptions.error}
            icon={<SaveIcon />}
            successMsg="Client updated successfully"
          />
        )}
        <ActionBtn
          action={deleteClient}
          disabled={deleteClientOptions.loading || updateClientOptions.loading}
          loading={deleteClientOptions.loading}
          error={deleteClientOptions.error}
          icon={<DeleteIcon />}
          successMsg="Client deleted successfully"
        />
      </TableCell>
    </TableRow>
  );
}

export default ClientRow;
