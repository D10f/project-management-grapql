import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_CLIENT, UPDATE_CLIENT } from "../mutations/clients";
import { GET_CLIENTS } from "../queries/clients";

import { TableCell, TableRow } from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";

import ClientCell from "./ClientCell";
import ActionBtn from "./ActionBtn";
import Toast from "./Toast";
import ConfirmationDialog from "./ConfirmationDialog";

function ClientRow({ id, name, email, phone }) {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

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
    refetchQueries: [{ query: GET_CLIENTS }],
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
    <>
      <Toast
        key={crypto.randomUUID()}
        open={showToast}
        onClose={() => {
          setShowToast(false);
          setToastMessage("");
        }}
        type={
          updateClientOptions.error || deleteClientOptions.error
            ? "error"
            : "success"
        }
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        autoHideDuration={6000}
        message={toastMessage}
      />

      <ConfirmationDialog
        open={showConfirmDialog}
        onCancel={() => setShowConfirmDialog(false)}
        onConfirm={() => {}}
      />

      <TableRow hover>
        <TableCell sx={{ width: 250 }}>{id}</TableCell>
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
              title="Save changes"
              setShowToast={setShowToast}
              setToastMessage={setToastMessage}
            />
          )}
          <ActionBtn
            action={deleteClient}
            disabled={
              deleteClientOptions.loading || updateClientOptions.loading
            }
            loading={deleteClientOptions.loading}
            error={deleteClientOptions.error}
            icon={<DeleteIcon />}
            successMsg="Client deleted successfully"
            confirmMsg="Are you sure you want to delete this client?"
            title="Delete client"
            setShowToast={setShowToast}
            setToastMessage={setToastMessage}
          />
        </TableCell>
      </TableRow>
    </>
  );
}

export default ClientRow;
