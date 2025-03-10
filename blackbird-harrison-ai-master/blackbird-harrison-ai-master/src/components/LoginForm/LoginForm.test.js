import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from './LoginForm'; // Change the import path if needed
import emailValidator from 'email-validator'; // Ensure you have email-validator installed

// Initial Test
test('renders sign in page', () => {
  render(<LoginForm />);
  const signInText = screen.getByText("Sign in");
  expect(signInText).toBeInTheDocument();
});

// Test: Valid email
test('valid email passes validation', () => {
  render(<LoginForm />);
  
  const emailInput = screen.getByLabelText(/email/i); // Assuming you have a label for email
  const submitButton = screen.getByRole('button', { name: /submit/i });

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.click(submitButton);
  
  // Assuming the success message is shown or no error message
  expect(screen.queryByText(/invalid email/i)).toBeNull();
});

// Test: Invalid email
test('invalid email shows error message', () => {
  render(<LoginForm />);

  const emailInput = screen.getByLabelText(/email/i); // Assuming you have a label for email
  const submitButton = screen.getByRole('button', { name: /submit/i });

  fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
  fireEvent.click(submitButton);

  // Assuming the error message appears after clicking the submit button
  const errorMessage = screen.getByText(/invalid email/i);
  expect(errorMessage).toBeInTheDocument();
});

// Test: Password too short
test('password too short shows error message', () => {
  render(<LoginForm />);
  
  const passwordInput = screen.getByLabelText(/password/i); // Assuming you have a label for password
  const submitButton = screen.getByRole('button', { name: /submit/i });

  fireEvent.change(passwordInput, { target: { value: 'short' } });
  fireEvent.click(submitButton);

  const errorMessage = screen.getByText(/password must be at least 8 characters/i);
  expect(errorMessage).toBeInTheDocument();
});

// Test: Password without an uppercase letter
test('password without uppercase letter shows error message', () => {
  render(<LoginForm />);
  
  const passwordInput = screen.getByLabelText(/password/i); // Assuming you have a label for password
  const submitButton = screen.getByRole('button', { name: /submit/i });

  fireEvent.change(passwordInput, { target: { value: 'password123!' } });
  fireEvent.click(submitButton);

  const errorMessage = screen.getByText(/password must contain at least one uppercase letter/i);
  expect(errorMessage).toBeInTheDocument();
});

// Test: Password without a number
test('password without a number shows error message', () => {
  render(<LoginForm />);
  
  const passwordInput = screen.getByLabelText(/password/i); // Assuming you have a label for password
  const submitButton = screen.getByRole('button', { name: /submit/i });

  fireEvent.change(passwordInput, { target: { value: 'Password!' } });
  fireEvent.click(submitButton);

  const errorMessage = screen.getByText(/password must contain at least one number/i);
  expect(errorMessage).toBeInTheDocument();
});

// Test: Password without a special character
test('password without a special character shows error message', () => {
  render(<LoginForm />);
  
  const passwordInput = screen.getByLabelText(/password/i); // Assuming you have a label for password
  const submitButton = screen.getByRole('button', { name: /submit/i });

  fireEvent.change(passwordInput, { target: { value: 'Password123' } });
  fireEvent.click(submitButton);

  const errorMessage = screen.getByText(/password must contain at least one special character/i);
  expect(errorMessage).toBeInTheDocument();
});

// Test: Valid password
test('valid password passes validation', () => {
  render(<LoginForm />);

  const passwordInput = screen.getByLabelText(/password/i); // Assuming you have a label for password
  const submitButton = screen.getByRole('button', { name: /submit/i });

  fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
  fireEvent.click(submitButton);

  // Assuming there is no error message or a success message is shown
  expect(screen.queryByText(/password must be at least 8 characters/i)).toBeNull();
  expect(screen.queryByText(/password must contain at least one uppercase letter/i)).toBeNull();
  expect(screen.queryByText(/password must contain at least one number/i)).toBeNull();
  expect(screen.queryByText(/password must contain at least one special character/i)).toBeNull();
});
