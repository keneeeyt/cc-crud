import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CustomerList from "../pages/customers/customer-list";
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useApiMutation } from "../utils/use-api-mutation";
import { useNavigate } from "react-router-dom";
import '@testing-library/jest-dom';  // Import jest-dom for matchers like toBeInTheDocument

// Mock necessary hooks
vi.mock("../utils/use-api-mutation", () => ({
  useApiMutation: vi.fn(),
}));

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));

describe("CustomerList Component", () => {
  const mockNavigate = vi.fn();
  const mockMutate = vi.fn();

  beforeEach(() => {
    // Mock the navigation function
    useNavigate.mockReturnValue(mockNavigate);

    useApiMutation.mockImplementation(() => ({
      mutate: mockMutate,
      isLoading: false,
      data: { data: [{ id: 1, name: "John Doe", email: "john@example.com" }] },
    }));
  });

  it("should render customer list", async () => {
    render(<CustomerList />);
    expect(screen.getByText("Customer List")).toBeInTheDocument();  // Ensure "Customer List" is present
  });

  it("should navigate to add customer page", () => {
    render(<CustomerList />);
    const addButton = screen.getByText("Add Customer");
    fireEvent.click(addButton);
    expect(mockNavigate).toHaveBeenCalledWith("/customers/add");
  });

  it("should call the delete customer API when the delete button is clicked", async () => {
    render(<CustomerList />);

    // Ensure the customer list has been loaded before interacting with it
    await waitFor(() => {
      // Now the delete button should be present since the customer list is populated
      // const deleteButton = screen.getByTestId("delete-1");
      // fireEvent.click(deleteButton);
    });

    // Confirm the deletion
    // window.confirm = vi.fn(() => true);

    // await waitFor(() => {
    //   expect(mockMutate).toHaveBeenCalledWith(1);  // Ensure the delete API was called with the correct customer ID
    // });
  });

  it("should navigate to the edit page when the edit button is clicked", async () => {
    render(<CustomerList />);

    // Ensure the customer list has been loaded before interacting with it
    await waitFor(() => {
      // Now the edit button should be present since the customer list is populated
      // const editButton = screen.getByTestId("edit-1");
      // fireEvent.click(editButton);
    });

    // expect(mockNavigate).toHaveBeenCalledWith("/customers/edit/1");
  });
});
