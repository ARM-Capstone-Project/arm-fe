import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import UsersList from '../../../src/pages/users/UserList.page';
import api from '../../../src/api/index';

vi.mock('../../../src/api/index');

describe('UsersList Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch and display users', async () => {
    const users = [
      { id: '1', username: 'testuser', roles: [{ id: '1', name: 'USER' }] },
      { id: '2', username: 'adminuser', roles: [{ id: '2', name: 'ADMIN' }] },
    ];

    api.get.mockResolvedValueOnce({ data: users });

    render(
      <MemoryRouter>
        <UsersList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getAllByText(/user management/i)).toHaveLength(1);
      expect(screen.getAllByText('testuser')).toHaveLength(1);
      expect(screen.getAllByText('adminuser')).toHaveLength(1);
    });
  });

  it('should handle error when fetching users fails', async () => {
    api.get.mockRejectedValueOnce(new Error('Network error'));

    render(
      <MemoryRouter>
        <UsersList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getAllByText(/failed to fetch users/i)).toHaveLength(1);
    });
  });

  it('should filter users by role', async () => {
    const users = [
      { id: '1', username: 'testuser', roles: [{ id: '1', name: 'USER' }] },
      { id: '2', username: 'adminuser', roles: [{ id: '2', name: 'ADMIN' }] },
    ];

    api.get.mockResolvedValueOnce({ data: users });

    render(
      <MemoryRouter>
        <UsersList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getAllByText('testuser')).toHaveLength(1);
      expect(screen.getAllByText('adminuser')).toHaveLength(1);
    });

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'ADMIN' } });

    await waitFor(() => {
      expect(screen.queryByText('testuser')).not.toBeInTheDocument();
      expect(screen.getAllByText('adminuser')).toHaveLength(1);
    });
  });

  it('should sort users by name', async () => {
    const users = [
      { id: '2', username: 'adminuser', roles: [{ id: '2', name: 'ADMIN' }] },
      { id: '1', username: 'testuser', roles: [{ id: '1', name: 'USER' }] },
    ];

    api.get.mockResolvedValueOnce({ data: users });

    render(
      <MemoryRouter>
        <UsersList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getAllByText('adminuser')).toHaveLength(1);
      expect(screen.getAllByText('testuser')).toHaveLength(1);
    });

    fireEvent.click(screen.getByText(/name/i));

    await waitFor(() => {
      expect(screen.getAllByText('testuser')).toHaveLength(1);
      expect(screen.getAllByText('adminuser')).toHaveLength(1);
    });
  });
});
