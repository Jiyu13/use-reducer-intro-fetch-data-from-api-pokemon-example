import { render, screen } from '@testing-library/react';
import Pokemon from './Pokemon';

test('renders learn react link', () => {
  render(<Pokemon />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
