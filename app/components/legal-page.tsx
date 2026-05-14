type LegalSection = {
  heading: string;
  paragraphs: string[];
};

type LegalPageProps = {
  title: string;
  intro: string;
  sections: LegalSection[];
};

export function LegalPage({ title, intro, sections }: LegalPageProps) {
  return (
    <main className="min-h-screen bg-background">
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-surface-elevated to-background">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-black/5 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-black/5 blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 md:px-12 py-6 sm:py-8 md:py-10">
          <div className="max-w-3xl">
            <h1 className="mt-0 font-playfair text-3xl sm:text-4xl md:text-5xl leading-tight text-balance">
              {title}
            </h1>

            <p className="mt-1 max-w-2xl text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {intro}
            </p>
          </div>
        </div>
      </section>

      <section className="py-6 sm:py-8 md:py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-12 space-y-4 sm:space-y-5">
          {sections.map((section) => (
            <article key={section.heading} className="rounded-2xl border bg-surface-elevated/70 p-4 sm:p-5 shadow-sm">
              <h2 className="font-playfair text-xl sm:text-2xl mb-2 text-balance">
                {section.heading}
              </h2>

              <div className="space-y-3 text-sm sm:text-base leading-relaxed text-muted-foreground">
                {section.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}