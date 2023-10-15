import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CountrySelector from "./CountrySelector";

// Mock the Apollo Client's gql function
jest.mock("@apollo/client", () => ({
  ...jest.requireActual("@apollo/client"), // Include actual implementations
  gql: jest.fn(), // Mock the gql function
}));

const mockOnCountrySelect = jest.fn();

test("CountrySelector renders correctly", () => {
  const countryData = [
    { code: "US", name: "United States" },
    { code: "CA", name: "Canada" },
  ];

  // Mock the data returned by the useLazyQuery function
  jest
    .spyOn(require("@apollo/client"), "useLazyQuery")
    .mockReturnValue([jest.fn(), { loading: false, data: { countries: countryData } }]);

  render(<CountrySelector onCountrySelect={mockOnCountrySelect} />);

  // Check if the input and label are rendered
  const input = screen.getByLabelText("Search Country");
  expect(input).toBeInTheDocument();
});

test("CountrySelector allows selecting a country", async () => {
  const countryData = [
    { code: "US", name: "United States" },
    { code: "CA", name: "Canada" },
  ];

  // Mock the data returned by the useLazyQuery function
  jest
    .spyOn(require("@apollo/client"), "useLazyQuery")
    .mockReturnValue([jest.fn(), { loading: false, data: { countries: countryData } }]);

  render(<CountrySelector onCountrySelect={mockOnCountrySelect} />);

  // Type a country name in the input
  const input = screen.getByLabelText("Search Country");
  fireEvent.change(input, { target: { value: "United" } });

  // Wait for the autocomplete options to appear
  await waitFor(() => {
    expect(screen.getByText("United States")).toBeInTheDocument();
  });

  // Click on a country option
  fireEvent.click(screen.getByText("United States"));

  // Verify that the callback function is called with the selected country
  expect(mockOnCountrySelect).toHaveBeenCalledWith(countryData[0]);
});

test("CountrySelector handles empty data", async () => {
  // Mock no country data
  jest
    .spyOn(require("@apollo/client"), "useLazyQuery")
    .mockReturnValue([jest.fn(), { loading: false, data: { countries: [] } }]);

  render(<CountrySelector onCountrySelect={mockOnCountrySelect} />);

  // Type a country name in the input
  const input = screen.getByLabelText("Search Country");
  fireEvent.change(input, { target: { value: "A" } });

  // Check if a message indicating no countries is displayed
  const noCountriesMessage = screen.getByText("No options");
  expect(noCountriesMessage).toBeInTheDocument();
});
