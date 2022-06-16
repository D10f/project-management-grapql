import { createTheme, ThemeProvider, Container } from "@mui/material";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Header from "./components/Header";
import ClientsTable from "./components/ClientsTable";

const theme = createTheme({
  palette: {
    primary: {
      main: "#e1009a",
    },
    secondary: {
      main: "#b800e1",
    },
    dark: {
      main: "#333",
    },
  },
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Header />
        <Container>
          <ClientsTable />
        </Container>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
