import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { describe, it, expect } from 'vitest';
import ListItem from '../../../src/components/sidebar/ListItem';

describe('ListItem component', () => {
  const defaultProps = {
    to: '/example',
    icon: faCoffee,
    text: 'Example Text',
    isOpen: true,
  };

  it('should render the ListItem with icon and text when isOpen is true', () => {
    render(
        <MemoryRouter>
          <ListItem {...defaultProps} />
        </MemoryRouter>
      );
    
      const linkElement = screen.getByRole('link');
      expect(linkElement).toHaveAttribute('href', '/example');

      expect(screen.getByText('Example Text')).toBeInTheDocument();
  });

  it('should hide the text when isOpen is false', () => {
    render(
      <MemoryRouter>
        <ListItem {...defaultProps} isOpen={false} />
      </MemoryRouter>
    );

    const textElement = screen.queryByText('Example Text');
    expect(textElement).toHaveClass('hidden');
  });

  it('should apply the correct class to the span element', () => {
    render(
      <MemoryRouter>
        <ListItem {...defaultProps} />
      </MemoryRouter>
    );

    const textElement = screen.getByText('Example Text');
    expect(textElement).toHaveClass('inline');
  });

  it('should render the link with correct href', () => {
    render(
      <MemoryRouter>
        <ListItem {...defaultProps} />
      </MemoryRouter>
    );

    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', defaultProps.to);
  });
});
