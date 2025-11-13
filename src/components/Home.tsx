import { useNavigate } from 'react-router-dom';

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
                    <a
                        href="#"
                        className="cta-button"
                        tabIndex={2}
                        aria-label="Mer om mig"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate('/about');
                        }}
                    >
                        Mer
                    </a>
                </div>
            </section>

            <section className="features">
                <div className="feature-card glass">
                    <h3>Frontend utv.</h3>
                    <p>
                        Frilansande utvecklare och i Stockholm. Jag bygger bl a AI-assisterade
                        lösningar med fokus på tydlighet, struktur och full kontroll.
                        <br />
                        Jag arbetar gärnamed projekt som kräver spårbar logik, tydliga gränssnitt
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

            <section className="features-tech">
                <div className="feature-card-tech glass">
                    {/* Språk och teknologier */}
                    <h3>Språk och teknologier</h3>
                    <img
                        className="techIcon"
                        src="/images/tech/ts.png"
                        alt="TypeScript"
                        title="TypeScript"
                    />
                    <img
                        className="techIcon"
                        src="/images/tech/js.png"
                        alt="JavaScript"
                        title="JavaScript"
                    />
                    <img className="techIcon" src="/images/tech/html.png" alt="HTML" title="HTML" />
                    <img className="techIcon" src="/images/tech/css.png" alt="CSS" title="CSS" />
                    <img className="techIcon" src="/images/tech/json.png" alt="JSON" title="JSON" />

                    <img className="techIcon" src="/images/tech/sass.png" alt="SASS" title="SASS" />
                    <img className="techIcon" src="/images/tech/less.png" alt="LESS" title="LESS" />
                    <img className="techIcon" src="/images/tech/bash.png" alt="Bash" title="Bash" />
                    <img className="techIcon" src="/images/tech/sql.png" alt="SQL" title="SQL" />
                    <img
                        className="techIcon"
                        src="/images/tech/python.png"
                        alt="Python"
                        title="Python"
                    />
                    <img className="techIcon" src="/images/tech/php.png" alt="PHP" title="PHP" />
                    {/* Verktyg och ramverk */}
                    <h3>Verktyg och ramverk</h3>
                    <p>
                        <img
                            className="techIcon"
                            src="/images/tech/react.png"
                            alt="React"
                            title="React"
                        />
                        <img
                            className="techIcon"
                            src="/images/tech/vite.png"
                            alt="Vite"
                            title="Vite"
                        />
                        <img
                            className="techIcon"
                            src="/images/tech/apache.jpeg"
                            alt="Apache"
                            title="Apache"
                        />
                        <img
                            className="techIcon"
                            src="/images/tech/git.png"
                            alt="Git"
                            title="Git"
                        />
                        <img
                            className="techIcon"
                            src="/images/tech/cicd.png"
                            alt="CI/CD"
                            title="CI/CD"
                        />
                        <img
                            className="techIcon"
                            src="/images/tech/open_ai.png"
                            alt="OpenAI"
                            title="OpenAI"
                        />
                        <img
                            className="techIcon"
                            src="/images/tech/githubcopilot.png"
                            alt="GitHub Copilot"
                            title="GitHub Copilot"
                        />
                        <img
                            className="techIcon"
                            src="/images/tech/bootstrap.png"
                            alt="Bootstrap"
                            title="Bootstrap"
                        />
                        <img
                            className="techIcon"
                            src="/images/tech/vsc.jpeg"
                            alt="VS Code"
                            title="VS Code"
                        />
                        <img
                            className="techIcon"
                            src="/images/tech/material.png"
                            alt="Material UI"
                            title="Material UI"
                        />
                        <img
                            className="techIcon"
                            src="/images/tech/gulp.png"
                            alt="Gulp"
                            title="Gulp"
                        />
                        <img
                            className="techIcon"
                            src="/images/tech/grunt.png"
                            alt="Grunt"
                            title="Grunt"
                        />
                        <img
                            className="techIcon"
                            src="/images/tech/jenkins.png"
                            alt="Jenkins"
                            title="Jenkins"
                        />
                        <img
                            className="techIcon"
                            src="/images/tech/sitevision.png"
                            alt="Sitevision"
                            title="Sitevision"
                        />
                        <img
                            className="techIcon"
                            src="/images/tech/wordpress.png"
                            alt="WordPress"
                            title="WordPress"
                        />
                    </p>
                    {/* Metodik och processer */}
                    <h3>Metodik och processer</h3>
                    <p>
                        <img
                            className="techIcon"
                            src="/images/tech/scrum.png"
                            alt="Scrum"
                            title="Scrum"
                        />
                        <img
                            className="techIcon"
                            src="/images/tech/wcag.png"
                            alt="WCAG"
                            title="WCAG"
                        />
                        <img
                            className="techIcon"
                            src="/images/tech/jira.png"
                            alt="Jira"
                            title="Jira"
                        />
                        <img
                            className="techIcon"
                            src="/images/tech/trello.png"
                            alt="Trello"
                            title="Trello"
                        />
                    </p>
                    {/* Operativsystem */}
                    <h3>Operativsystem</h3>
                    <p>
                        <img
                            className="techIcon"
                            src="/images/tech/windows.png"
                            alt="Windows"
                            title="Windows"
                        />
                        <img
                            className="techIcon"
                            src="/images/tech/osx.png"
                            alt="OSX"
                            title="OSX"
                        />
                        <img
                            className="techIcon"
                            src="/images/tech/ubuntu.png"
                            alt="Ubuntu"
                            title="Ubuntu"
                        />
                    </p>
                    {/* Design och prototyper */}
                    <h3>Design och prototyper</h3>
                    <p>
                        <img
                            className="techIcon"
                            src="/images/tech/figma.png"
                            alt="Figma"
                            title="Figma"
                        />
                        <img
                            className="techIcon"
                            src="/images/tech/zeplin.png"
                            alt="Zeplin"
                            title="Zeplin"
                        />
                    </p>
                </div>
            </section>
        </div>
    );
}
