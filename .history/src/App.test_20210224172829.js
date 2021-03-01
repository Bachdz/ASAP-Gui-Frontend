import { render, screen } from '@testing-library/react';
import App from './App';
import { ReactComponent as Arrow } from './arrow.svg';


test('renders learn react link', () => {
  const { arrow } = render(<Arrow />);

  expect(arrow).toBeTruthy();
});
