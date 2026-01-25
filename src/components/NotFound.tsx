import { useNavigate } from 'react-router-dom';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="content-wrapper">
            <section className="about-text glass">
                <h1>404 - Page not found</h1>
                <p>The page you are looking for does not exist or has been moved.</p>
                <button
                    className="cta-button"
                    onClick={() => navigate('/')}
                    style={{ marginTop: '20px' }}
                >
                    Back to home
                </button>
            </section>
        </div>
    );
}
