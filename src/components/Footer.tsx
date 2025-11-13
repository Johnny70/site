import { useEffect, useRef } from 'react';

export default function Footer() {
    const phoneRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (phoneRef.current) {
            const p = ['079', '356', '89', '35'];
            phoneRef.current.textContent = `${p[0]}-${p[1]} ${p[2]} ${p[3]}`;
        }
    }, []);

    return (
        <footer id="footer">
            <div className="footer-content glass">
                <span>
                    Mail:{' '}
                    <a href="mailto:johnny.jakobsson@gmail.com" tabIndex={3} aria-label="Maila mig">
                        johnny.jakobsson@gmail.com
                    </a>
                </span>
                <br />
                <span>
                    Tel: <span ref={phoneRef}></span>
                </span>
                <br />
                <span>{new Date().getFullYear()} Johnny Jakobsson, no rights reserved.</span>
                <a href="https://www.brainville.com/SE/Brainville1" target="_blank">
                    <p>
                        <img src="https://www.brainville.com/Content/Images/SocialMedia/OnDark_Color.svg" width="64" height="64" alt="Check out our company profile in Brainville" />
                    </p>
                </a>
            </div>
        </footer>
    );
}
