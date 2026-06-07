import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-12 max-w-2xl">
      <Reveal>
        <p className="eyebrow mb-3">{eyebrow}</p>
      </Reveal>
      <Reveal index={1}>
        <h2 className="font-display text-3xl font-semibold tracking-tight text-ink-100 sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal index={2}>
          <p className="mt-4 text-base leading-relaxed text-ink-300 sm:text-lg">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
