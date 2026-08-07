import Link from "next/link";

type Crumb = { label: string; href?: string };

// Inner pages each rolled their own heading block with slightly different
// spacing and no breadcrumbs. One component so every page below the homepage
// opens the same way and you always know where you are.
//
// Light, like the rest of the site — this used to be a dark band with a
// blueprint texture, left over from the old palette.
// eyebrow and intro are both optional. On most pages the breadcrumb already
// names the section and the h1 says the rest — an eyebrow reading "LISTINGS"
// above a heading reading "Property listings" is the same word three times,
// and it pushes the actual content most of a screen down.
export default function PageHeader({
  eyebrow,
  title,
  intro,
  crumbs = [],
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  crumbs?: Crumb[];
}) {
  return (
    <div className="bg-paper border-b border-ink/8">
      <div className="container-page pt-10 pb-12 sm:pt-12 sm:pb-14">
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2.5 text-sm text-ink-soft/70 flex-wrap">
              <li>
                <Link href="/" className="hover:text-brass transition-colors">
                  Home
                </Link>
              </li>
              {crumbs.map((c) => (
                <li key={c.label} className="flex items-center gap-2.5">
                  <span aria-hidden="true" className="text-ink-soft/35">
                    /
                  </span>
                  {c.href ? (
                    <Link
                      href={c.href}
                      className="hover:text-brass transition-colors"
                    >
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-ink font-medium" aria-current="page">
                      {c.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {eyebrow && (
          <div className="label text-brass flex items-center gap-3 mb-5">
            <span className="w-8 h-px bg-brass" />
            {eyebrow}
          </div>
        )}

        <h1 className="font-extrabold text-4xl sm:text-5xl leading-[1.05] tracking-tight max-w-3xl text-ink">
          {title}
        </h1>

        {intro && (
          <p className="text-ink-soft leading-relaxed max-w-2xl mt-6">
            {intro}
          </p>
        )}
      </div>
    </div>
  );
}
