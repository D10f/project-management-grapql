import { gql } from "@apollo/client";

export const DELETE_CLIENT = gql`
  mutation deleteClient($id: String!) {
    deleteClient(id: $id) {
      id
    }
  }
`;

export const UPDATE_CLIENT = gql`
  mutation updateClient(
    $id: String!
    $name: String
    $email: String
    $phone: String
  ) {
    updateClient(id: $id, name: $name, email: $email, phone: $phone) {
      id
    }
  }
`;
