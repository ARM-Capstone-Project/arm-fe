import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import AssignRoleModal from '../../../src/pages/role/AssignRoleModal.page'; 
import api from '../../../src/api/index';

vi.mock('../../../src/api/index', () => ({
    default: {
        post: vi.fn(),

      },

}));

describe('AssignRoleModal Component', () => {
  const mockUserId = '123';
  const mockRoles = [{ id: '1', name: 'MANAGER' }, { id: '2', name: 'OPERATOR' }, { id: '3', name: 'USER' }];
  const mockOnClose = vi.fn();
  const mockOnSuccess = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the modal when open', () => {
    render(
      <AssignRoleModal userId={mockUserId} roles={mockRoles} isOpen={true} onClose={mockOnClose} onSuccess={mockOnSuccess} />
    );

    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /assign role/i })).toBeInTheDocument();
  });

  it('should not render the modal when closed', () => {
    render(
      <AssignRoleModal userId={mockUserId} roles={mockRoles} isOpen={false} onClose={mockOnClose} onSuccess={mockOnSuccess} />
    );

    expect(screen.queryByText(/assign role/i)).not.toBeInTheDocument();
  });

  it('should display an error when no role is selected and assign role is clicked', async () => {
    render(
      <AssignRoleModal userId={mockUserId} roles={mockRoles} isOpen={true} onClose={mockOnClose} onSuccess={mockOnSuccess} />
    );

    fireEvent.click(screen.getByRole('button', { name: /assign role/i }));

    expect(await screen.findByText('Please select a role.')).toBeInTheDocument();
  });

  it('should call onSuccess and onClose when role is assigned successfully', async () => {
    api.post.mockResolvedValueOnce({});

    render(
      <AssignRoleModal userId={mockUserId} roles={mockRoles} isOpen={true} onClose={mockOnClose} onSuccess={mockOnSuccess} />
    );

    fireEvent.change(screen.getByLabelText(/select role/i), { target: { value: 'MANAGER' } });
    fireEvent.click(screen.getByRole('button', { name: /assign role/i }));

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/admin/assign_role', null, {
        params: { userId: mockUserId, roleName: 'MANAGER' },
      });
      expect(mockOnSuccess).toHaveBeenCalled();
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it('should display an error message if the API call fails', async () => {
    const errorMessage = 'Network Error';
    api.post.mockRejectedValueOnce(new Error(errorMessage));

    render(
      <AssignRoleModal userId={mockUserId} roles={mockRoles} isOpen={true} onClose={mockOnClose} onSuccess={mockOnSuccess} />
    );

    fireEvent.change(screen.getByLabelText(/select role/i), { target: { value: 'USER' } });
    fireEvent.click(screen.getByRole('button', { name: /assign role/i }));

    expect(await screen.findByText(`Failed to assign role, Error: ${errorMessage}`)).toBeInTheDocument();
  });
});
