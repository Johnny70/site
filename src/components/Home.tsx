import { useNavigate } from 'react-router-dom';
import TechStack from './TechStack';

export default function Home() {
    const navigate = useNavigate();
    return (
        <div className="content-wrapper">
            <section className="hero glass">
                <div className="hero-image">
                    <img
                        src="/images/moi.png"
                        className="flipImg"
                        alt="Modern Technology Interaction"
                    />
                </div>
                <div className="hero-content">
                    <h1>Frontendare med AI-edge</h1>
                    <p>
                        <i>
                            Jag söker uppdrag som frilansande frontend med bred kompetens inom AI,
                            WCAG och teknik. Med över två decennier i branschen kombinerar jag
                            erfarenhet med moderna verktyg för att leverera smarta, hållbara
                            lösningar. Social, lösningsfokuserad och redo att ta nästa projekt från
                            idé till leverans.
                        </i>
                    </p>
                    <button
                        className="cta-button"
                        aria-label="Mer om mig"
                        onClick={() => navigate('/about')}
                    >
                        Mer
                    </button>
                </div>
            </section>

            <section className="features">
                <div className="feature-card glass">
                    <h3>Frontend utv.</h3>
                    <p>
                        Frilansande utvecklare och i Stockholm. Jag bygger bl a AI-assisterade
                        lösningar med fokus på tydlighet, struktur och full kontroll.
                        <br />
                        Jag arbetar gärna med projekt som kräver spårbar logik, tydliga gränssnitt
                        och långsiktig hållbarhet.
                        <br />
                        Om du söker precision och eftertänkt utveckling - då är jag rätt man.
                    </p>
                </div>

                <div className="feature-card glass">
                    <h3>WCAG</h3>
                    <p>
                        Jag har lång erfarenhet av att implementera tillgänglighet enligt WCAG, både
                        i publika gränssnitt och interna verktyg.
                        <br />
                        Jag säkerställer att varje komponent fungerar med skärmläsare, tangentbord
                        och visuella hjälpmedel – utan att kompromissa med funktion eller design.
                        <br />
                        Tillgänglighet är inte ett tillval, det är en grundläggande del av varje
                        teknisk lösning jag bygger.
                    </p>
                </div>

                <div className="feature-card glass">
                    <h3>AI assisterad utv.</h3>
                    <p>
                        Jag har mångårig erfarenhet av att bygga och integrera AI-assisterade
                        lösningar – från kodgenerering till semantisk analys.
                        <br />
                        Jag arbetar med verktyg som förstärker mänsklig precision snarare än
                        ersätter den, alltid med fokus på kontroll och transparens.
                        <br />
                        AI är för mig ett verktyg, inte en genväg – och varje implementation ska
                        vara begriplig, testbar och tekniskt motiverad.
                    </p>
                </div>
            </section>

            <TechStack />
        </div>
    );
}
