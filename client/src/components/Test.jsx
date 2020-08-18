import React from "react";
import { useQuery, gql } from "@apollo/client";

const CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      keywords
    }
  }
`;

function Test() {
  const { loading, error, data } = useQuery(CATEGORIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.categories.map(({ id, keywords }) => (
    <div key={id}>
      <p>
        {id}: {keywords}
      </p>
    </div>
  ));
}

export default Test;
