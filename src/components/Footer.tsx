// Runtime phone number construction for basic scraper mitigation
const getPhone = () => {
    const p = ['079', '356', '89', '35'];
    return `${p[0]}-${p[1]} ${p[2]} ${p[3]}`;
};

export default function Footer() {
    return (
        <footer id="footer">
            <div className="footer-content glass">
                <span>
                    Mail:{' '}
                    <a href="mailto:johnny.jakobsson@gmail.com" aria-label="Maila mig">
                        johnny.jakobsson@gmail.com
                    </a>
                </span>
                <br />
                <span>Tel: {getPhone()}</span>
                <br />
                <span>{new Date().getFullYear()} Johnny Jakobsson, no rights reserved.</span>
                <a href="https://www.brainville.com/SE/Brainville1" target="_blank" rel="noopener noreferrer">
                    <p>
                        <img src="https://www.brainville.com/Content/Images/SocialMedia/OnDark_Color.svg" width="64" height="64" alt="Check out our company profile in Brainville" />
                    </p>
                </a>
            </div>
        </footer>
    );
}
