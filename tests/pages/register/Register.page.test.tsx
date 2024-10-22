import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Register from '../../../src/pages/register/Register.page';

// Mock the auth service
vi.mock('../../../src/services/auth.service', () => ({
  default: {
    register: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
  },
}));

describe('Register Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });


  it('should render the registration form', () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
    expect(screen.getByText(/already registered\?/i)).toBeInTheDocument();
  });
});
