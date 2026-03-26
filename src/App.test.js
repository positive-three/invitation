import { render, screen } from '@testing-library/react';
import App from './App';

test('renders invitation heading', () => {
  render(<App />);
  expect(screen.getByText('초대합니다')).toBeInTheDocument();
});
