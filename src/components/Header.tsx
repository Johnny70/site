import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();
    return (
        <header>
            <nav className="glass">
                <div
                    className="logo"
                    tabIndex={1}
                    aria-label="Hem - Logo"
                    onClick={() => navigate('/')}
                >
                    <div className="logo-icon">
                        <img src="/images/logo.png" alt="Logga" width={64} height={64} />
                    </div>
                    <span>Johnny Jakobsson</span>
                </div>
                {/* Endast logotyp och namn, inga nav-links */}
            </nav>
        </header>
    );
}
