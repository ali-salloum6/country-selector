import React, { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useLazyQuery, gql } from "@apollo/client";

export type CountryOption = {
  code: string;
  name: string;
};

type OnCountrySelectorFunction = (selectedCountry: CountryOption) => void;

const COUNTRIES_QUERY = gql`
  query {
    countries {
      code
      name
    }
  }
`;

const CountrySelector = ({ onCountrySelect }: { onCountrySelect: OnCountrySelectorFunction }) => {
  const [searchCountries, { loading, data }] = useLazyQuery(COUNTRIES_QUERY);

  useEffect(() => {
    searchCountries();
  }, [searchCountries]);

  // case-sensitive if the input contains an upper case letter, and case-insensitive if it doesn't
  const filterCountryOptions = (options: CountryOption[], inputValue: string) => {
    const inputLower = inputValue.toLowerCase();
    const isCaseSensitive = inputValue !== inputLower;

    return options.filter((option) => {
      const name = isCaseSensitive ? option.name : option.name.toLowerCase();
      const code = isCaseSensitive ? option.code : option.code.toLowerCase();

      return name.includes(inputValue) || code.includes(inputValue);
    });
  };

  return (
    <Autocomplete
      options={data ? data.countries : []}
      filterOptions={(options, { inputValue }) => filterCountryOptions(options, inputValue)}
      loading={loading}
      getOptionLabel={(option: CountryOption) => option.name}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Search Country" variant="outlined" />}
      onChange={(_, selectedOption) => onCountrySelect(selectedOption!)}
    />
  );
};

export default CountrySelector;
