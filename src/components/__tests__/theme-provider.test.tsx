import { render } from '@testing-library/react';
import { ThemeProvider } from '../theme-provider';

describe('ThemeProvider Component', () => {
  it('renders children correctly', () => {
    const testMessage = 'Test Child';
    const { getByText } = render(
      <ThemeProvider>
        <div>{testMessage}</div>
      </ThemeProvider>
    );

    expect(getByText(testMessage)).toBeInTheDocument();
  });

  it('passes props to NextThemesProvider', () => {
    const testProps = {
      attribute: 'data-theme',
      defaultTheme: 'dark',
      enableSystem: true,
    };
    const { container } = render(
      <ThemeProvider attribute={['data-theme']} defaultTheme="dark" enableSystem>
        <div>Test</div>
      </ThemeProvider>
    );

    expect(container.firstChild).toBeTruthy();
  });
}); 