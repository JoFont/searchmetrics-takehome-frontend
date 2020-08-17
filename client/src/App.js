import { ApolloProvider } from "@apollo/client";
import React from "react";
import client from "./api";
import "./App.css";

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <h2>My first Apollo app 🚀</h2>
      </div>
    </ApolloProvider>
  );
}

export default App;
