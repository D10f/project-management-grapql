import { useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../queries/clients";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  CircularProgress,
} from "@mui/material";
import { Container } from "@mui/system";
import ClientRow from "./ClientRow";

function ClientsTable() {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) {
    return (
      <Container>
        <CircularProgress
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
          color="primary"
        />
      </Container>
    );
  }

  if (error) {
    return <p>Something went wrong!</p>;
  }

  return (
    <Table sx={{ margin: "10px 0" }}>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Phone</TableCell>
          <TableCell align="right">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.clients.map((client) => (
          <ClientRow key={client.id} {...client} />
        ))}
      </TableBody>
    </Table>
  );
}

export default ClientsTable;
