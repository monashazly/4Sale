import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Dropdown from "../app/components/Dropdown";
const mockCurrencies = [
  { currency: "USD", disabled: false },
  { currency: "EUR", disabled: false },
];

describe("Dropdown component", () => {
  test("currency placeholder when there is no selected value", () => {
    render(
      <Dropdown
        currencies={mockCurrencies}
        selectedCurrency={null}
        onValueChange={() => {}}
      />
    );
    expect(screen.getByText("Currency")).toBeInTheDocument();
  });
  test("toggling menu on click", () => {
    render(
      <Dropdown
        currencies={mockCurrencies}
        selectedCurrency={null}
        onValueChange={() => {}}
      />
    );
    expect(screen.queryByText("USD")).not.toBeInTheDocument();
    expect(screen.queryByText("EUR")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("Currency"));

    expect(screen.getByText("USD")).toBeInTheDocument();
    expect(screen.getByText("EUR")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Currency"));

    expect(screen.queryByText("USD")).not.toBeInTheDocument();
    expect(screen.queryByText("EUR")).not.toBeInTheDocument();
  });
});
