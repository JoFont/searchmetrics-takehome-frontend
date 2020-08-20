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

export const ADD_KEYWORD = gql`
  mutation($id: ID!, $keyword: String!) {
    addKeyword(id: $id, keyword: $keyword)
  }
`;

export const REMOVE_KEYWORD = gql`
  mutation($id: ID!, $keyword: String!) {
    removeKeyword(id: $id, keyword: $keyword)
  }
`;
