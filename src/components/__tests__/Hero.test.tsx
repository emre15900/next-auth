import { render, screen } from '@testing-library/react';
import { Hero } from '../Hero';

describe('Hero Component', () => {
  it('renders the main heading', () => {
    render(<Hero />);
    const heading = screen.getByText(/Free Next.js \+ Tailwind CSS/i);
    expect(heading).toBeInTheDocument();
  });

  it('renders the subheading text', () => {
    render(<Hero />);
    const subheading = screen.getByText(/Startup is free Next.js template for startups/i);
    expect(subheading).toBeInTheDocument();
  });

  it('renders both buttons', () => {
    render(<Hero />);
    const downloadButton = screen.getByText(/Download Now/i);
    const githubButton = screen.getByText(/Star on GitHub/i);
    
    expect(downloadButton).toBeInTheDocument();
    expect(githubButton).toBeInTheDocument();
  });

  it('renders the gradient text', () => {
    render(<Hero />);
    const gradientText = screen.getByText(/Template for Startup & SaaS/i);
    expect(gradientText).toBeInTheDocument();
  });

  it('renders the SVG wave animation', () => {
    render(<Hero />);
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
}); 