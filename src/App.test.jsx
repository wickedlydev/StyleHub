import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const renderApp = () =>
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

test('shows the Shop navigation link', () => {
  renderApp();
  expect(screen.getByRole('link', { name: /^shop$/i })).toBeInTheDocument();
});
