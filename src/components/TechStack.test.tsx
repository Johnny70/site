import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TechStack from './TechStack';

describe('TechStack', () => {
    it('renders all tech category headings', () => {
        render(<TechStack />);
        expect(screen.getByText('Språk och teknologier')).toBeInTheDocument();
        expect(screen.getByText('Verktyg och ramverk')).toBeInTheDocument();
        expect(screen.getByText('Metodik och processer')).toBeInTheDocument();
        expect(screen.getByText('Operativsystem')).toBeInTheDocument();
        expect(screen.getByText('Design och prototyper')).toBeInTheDocument();
    });

    it('renders tech icons with lazy loading', () => {
        render(<TechStack />);
        const tsIcon = screen.getByAltText('TypeScript');
        expect(tsIcon).toBeInTheDocument();
        expect(tsIcon).toHaveAttribute('loading', 'lazy');
    });

    it('renders all tech icons with correct attributes', () => {
        render(<TechStack />);
        const reactIcon = screen.getByAltText('React');
        expect(reactIcon).toHaveAttribute('src', '/images/tech/react.png');
        expect(reactIcon).toHaveAttribute('title', 'React');
    });
});
