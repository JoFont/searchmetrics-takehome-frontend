import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
  subscription {
    categories {
      id
      name
      keywords
    }
  }
`;

export const ADD_CATEGORY = gql`
  mutation($name: String!) {
    addCategory(user: $user)
  }
`;
