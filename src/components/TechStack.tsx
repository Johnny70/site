import { techStack, type TechItem } from '../data/techStack';

interface TechIconProps {
    item: TechItem;
}

function TechIcon({ item }: TechIconProps) {
    return (
        <img
            className="techIcon"
            src={item.src}
            alt={item.alt}
            title={item.title}
            loading="lazy"
        />
    );
}

export default function TechStack() {
    return (
        <section className="features-tech">
            <div className="feature-card-tech glass">
                {techStack.map((category) => (
                    <div key={category.title}>
                        <h3>{category.title}</h3>
                        <p>
                            {category.items.map((item) => (
                                <TechIcon key={item.alt} item={item} />
                            ))}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
