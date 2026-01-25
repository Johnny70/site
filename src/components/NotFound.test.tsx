import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import NotFound from './NotFound';

const renderWithRouter = (component: React.ReactElement) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('NotFound', () => {
    it('renders 404 message', () => {
        renderWithRouter(<NotFound />);
        expect(screen.getByText(/404/)).toBeInTheDocument();
        expect(screen.getByText(/Sidan hittades inte/)).toBeInTheDocument();
    });

    it('renders back to home button', () => {
        renderWithRouter(<NotFound />);
        const button = screen.getByRole('button', { name: /tillbaka till startsidan/i });
        expect(button).toBeInTheDocument();
    });
});
