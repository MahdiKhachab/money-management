import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the public homepage content', () => {
  render(<App />);

  expect(screen.getByText(/رعاية المجتمع، بناء المستقبل، ورفع الوعي الثقافي/i)).toBeInTheDocument();
  expect(screen.getAllByText(/جمعية الزهراء الثقافية/i).length).toBeGreaterThan(0);
});
