import { render, screen, fireEvent } from "@testing-library/react";
import HomePage from "../pages/HomePage.jsx";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import store from "../store";
describe("HomePage", () => {
  test("renders the contact app title", async () => {
    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );
    const titleElement = screen.getByText("Contact App");
    const loadingElement = screen.getByText("Loading...");
    expect(loadingElement).toBeInTheDocument();

    expect(titleElement).toBeInTheDocument();
  });

  test("handles form submission with valid data", async () => {
    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );

    const firstNameInput = screen.getByPlaceholderText("firstName");
    const lastNameInput = screen.getByPlaceholderText("lastName");
    const ageInput = screen.getByPlaceholderText("age");
    const photoInput = screen.getByPlaceholderText("photo");
    const addButton = screen.getByText("Add new Contact");

    fireEvent.change(firstNameInput, { target: { value: "Templar" } });
    fireEvent.change(lastNameInput, { target: { value: "Assasin" } });
    fireEvent.change(ageInput, { target: { value: 25 } });
    fireEvent.change(photoInput, { target: { value: "example.jpg" } });
    fireEvent.click(addButton);
  });
});
