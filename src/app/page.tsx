"use client";
import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Container, Typography } from "@mui/material";
import CountrySelector from "../components/CountrySelector";
import type { FC } from "react";
import type { CountryOption } from "../components/CountrySelector";

const client = new ApolloClient({
  uri: "https://countries.trevorblades.com/",
  cache: new InMemoryCache(),
});

const HomePage: FC = () => {
  const handleCountrySelect = (selectedCountry: CountryOption) => {
    if (selectedCountry) {
      console.log(`Selected Country: ${selectedCountry.name} (${selectedCountry.code})`);
    }
  };

  return (
    <ApolloProvider client={client}>
      <Container>
        <Typography variant="h3">Country Search</Typography>
        <CountrySelector onCountrySelect={handleCountrySelect} />
      </Container>
    </ApolloProvider>
  );
};

export default HomePage;
