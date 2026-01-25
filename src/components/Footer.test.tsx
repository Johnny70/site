import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
    it('renders email link correctly', () => {
        render(<Footer />);
        const emailLink = screen.getByLabelText('Maila mig');
        expect(emailLink).toBeInTheDocument();
        expect(emailLink).toHaveAttribute('href', 'mailto:johnny.jakobsson@gmail.com');
    });

    it('renders phone number', () => {
        render(<Footer />);
        expect(screen.getByText(/079-356 89 35/)).toBeInTheDocument();
    });

    it('renders current year in copyright', () => {
        render(<Footer />);
        const currentYear = new Date().getFullYear();
        expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument();
    });

    it('renders Brainville link with correct attributes', () => {
        render(<Footer />);
        const brainvilleLink = screen.getByRole('link', { name: /brainville/i });
        expect(brainvilleLink).toHaveAttribute('href', 'https://www.brainville.com/SE/Brainville1');
        expect(brainvilleLink).toHaveAttribute('target', '_blank');
        expect(brainvilleLink).toHaveAttribute('rel', 'noopener noreferrer');
    });
});
