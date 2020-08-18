import { ApolloProvider } from "@apollo/client";
import React from "react";
import client from "./api";
import "./App.css";
import Test from "./components/Test";

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <h2>My first Apollo app 🚀</h2>
        <Test />
      </div>
    </ApolloProvider>
  );
}

export default App;
