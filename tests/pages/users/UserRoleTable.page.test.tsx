import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import UserRoleTable from '../../../src/pages/users/UserRoleTable.page.tsx';
describe('UserRoleTable Component', () => {
  const renderComponent = (user) => {
    render(<UserRoleTable user={user} />);
  };

  it('should render the roles correctly when user has roles', () => {
    const userWithRoles = {
      id: '1',
      username: 'testuser',
      roles: [
        { id: '1', name: 'ADMIN' },
        { id: '2', name: 'USER' },
      ],
    };

    renderComponent(userWithRoles);

    expect(screen.getAllByText('✔️')).toHaveLength(2);
    expect(screen.getAllByText('✖️')).toHaveLength(2);
  });

  it('should render the roles correctly when user has no roles', () => {
    const userWithoutRoles = {
      id: '2',
      username: 'testuser',
      roles: [],
    };

    renderComponent(userWithoutRoles);

    expect(screen.getAllByText('✖️')).toHaveLength(4); // Four crosses for ADMIN, MANAGER, OPERATOR, USER
  });

  it('should render the roles correctly when user has only some roles', () => {
    const userWithSomeRoles = {
      id: '3',
      username: 'testuser',
      roles: [
        { id: '1', name: 'MANAGER' },
      ],
    };

    renderComponent(userWithSomeRoles);

    expect(screen.getAllByText('✔️')).toHaveLength(1);
    expect(screen.getAllByText('✖️')).toHaveLength(3);
  });
});
