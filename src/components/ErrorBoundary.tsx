import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
        };
    }

    static getDerivedStateFromError(error: Error): State {
        return {
            hasError: true,
            error,
        };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="content-wrapper">
                    <section className="about-text glass">
                        <h1>Something went wrong</h1>
                        <p>
                            An unexpected error occurred. Please try reloading the page or contact me
                            if the problem persists.
                        </p>
                        {this.state.error && (
                            <details style={{ marginTop: '20px' }}>
                                <summary style={{ cursor: 'pointer' }}>Technical details</summary>
                                <pre
                                    style={{
                                        marginTop: '10px',
                                        padding: '10px',
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        borderRadius: '8px',
                                        overflow: 'auto',
                                    }}
                                >
                                    {this.state.error.toString()}
                                </pre>
                            </details>
                        )}
                        <button
                            className="cta-button"
                            onClick={() => window.location.reload()}
                            style={{ marginTop: '20px' }}
                        >
                            Reload page
                        </button>
                    </section>
                </div>
            );
        }

        return this.props.children;
    }
}
