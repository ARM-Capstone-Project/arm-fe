import { render, screen } from '@testing-library/react';

import Hello from '../src/Hello';

describe('Hello', () => {
   it('should render app', () => {
      render(<Hello />);
      expect(screen.getByText(/Vite \+ React/i)).toBeInTheDocument();
   });
});