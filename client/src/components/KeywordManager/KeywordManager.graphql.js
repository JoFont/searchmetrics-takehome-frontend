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
    addCategory(name: $name)
  }
`;

export const RENAME_CATEGORY = gql`
  mutation($id: ID!, $name: String!) {
    renameCategory(id: $id, name: $name)
  }
`;

export const DELETE_CATEGORY = gql`
  mutation($id: ID!) {
    deleteCategory(id: $id)
  }
`;

export const ADD_KEYWORD = gql`
  mutation($id: ID!, $keyword: String!) {
    addKeyword(id: $id, keyword: $keyword)
  }
`;

export const DELETE_KEYWORD = gql`
  mutation($id: ID!, $keyword: String!) {
    deleteKeyword(id: $id, keyword: $keyword)
  }
`;
