import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import AddCustomer from '../pages/customers/add-customer';
import apiClient from '../utils/http-common';
import { useNavigate } from 'react-router-dom';
import CustomToast from '../components/custom-toast';

// Mock the dependencies
vi.mock('../utils/http-common', () => ({
  __esModule: true,
  default: {
    post: vi.fn(),  // Mock the post method
  },
}));

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

vi.mock('../components/custom-toast', () => ({
  __esModule: true,
  default: () => <div>Toast</div>,
}));

describe('AddCustomer', () => {
  let navigate;

  beforeEach(() => {
    navigate = vi.fn();
    useNavigate.mockReturnValue(navigate);
  });

  it('should render the form with input fields', () => {
    render(<AddCustomer />);
    
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contact Number/i)).toBeInTheDocument();
  });

  it('should show validation errors if form is submitted with invalid data', async () => {
    render(<AddCustomer />);

    fireEvent.submit(screen.getByRole('button', { name: /Add Customer/i }));

    await waitFor(() => {
      expect(screen.getByText(/First name must be at least 2 characters long/i)).toBeInTheDocument();
      expect(screen.getByText(/Last name must be at least 2 characters long/i)).toBeInTheDocument();
      expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/Contact number is required/i)).toBeInTheDocument();
    });
  });

  it('should call the mutate function and navigate on successful form submission', async () => {
    const mockResponse = {
      message: 'Customer added successfully!',
      type: 'success',
    };

    apiClient.post.mockResolvedValueOnce({ data: mockResponse });

    render(<AddCustomer />);

    // Fill in valid data
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/Contact Number/i), { target: { value: '+1234567890' } });

    fireEvent.submit(screen.getByRole('button', { name: /Add Customer/i }));

    await waitFor(() => {
      expect(apiClient.post).toHaveBeenCalledWith('/customers', {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        contact_number: '+1234567890',
      });

      expect(screen.getByText('Toast')).toBeInTheDocument(); // Check if toast is shown
      expect(navigate).toHaveBeenCalledWith('/customers'); // Check if navigate was called
    });
  });

  it('should handle loading state during API call', async () => {
    apiClient.post.mockResolvedValueOnce({ data: { message: 'Success', type: 'success' } });

    render(<AddCustomer />);

    // Trigger form submission
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/Contact Number/i), { target: { value: '+1234567890' } });

    fireEvent.submit(screen.getByRole('button', { name: /Add Customer/i }));

    // Check if the loading spinner is shown
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('should show error toast if the API fails', async () => {
    const mockResponse = {
      message: 'Failed to add customer!',
      type: 'error',
    };

    apiClient.post.mockRejectedValueOnce({ response: { data: mockResponse } });

    render(<AddCustomer />);

    // Fill in valid data
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/Contact Number/i), { target: { value: '+1234567890' } });

    fireEvent.submit(screen.getByRole('button', { name: /Add Customer/i }));

    await waitFor(() => {
      expect(screen.getByText('Toast')).toBeInTheDocument(); // Error toast should appear
    });
  });
});