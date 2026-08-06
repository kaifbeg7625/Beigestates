import Link from "next/link";

// One button system for the whole site.
//
// Before this, a "button" might be gold-filled, outlined, or just brass text
// with an arrow after it, at four different sizes — so nothing read as
// reliably clickable. Three variants, two sizes, and every one of them has a
// solid shape, a real label, and a visible hover and pressed state.
//
//   primary   — the one action we want on this screen (gold, filled)
//   secondary — equally valid alternative (solid dark)
//   ghost     — low emphasis, still clearly a control (bordered)

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg" | "xl";

const base =
  "inline-flex items-center justify-center gap-2.5 rounded-md font-semibold " +
  "whitespace-nowrap transition-all duration-300 select-none " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass " +
  "focus-visible:ring-offset-2 focus-visible:ring-offset-paper " +
  "active:translate-y-0 active:scale-[0.985] disabled:opacity-55 " +
  "disabled:pointer-events-none";

// Flat, solid fills. The gradient-plus-glow version read as a template
// download — the shimmer and the drop-shadow were doing the work that the
// label and the shape should do. Colour shift on hover, nothing else.
const variants: Record<Variant, string> = {
  primary: "bg-brass text-paper hover:bg-[#6F521F]",
  secondary: "bg-ink text-paper hover:bg-blueprint-deep",
  // 1.5px so the edge is unmistakable — a 1px hairline at low opacity was
  // reading as decoration rather than a control.
  ghost:
    "border-[1.5px] border-ink/40 text-ink hover:border-ink hover:bg-ink hover:text-paper",
};

// The reference's primary CTA is roughly 176×58 — noticeably bigger than the
// 8×4 padding this had. xl matches that.
const sizes: Record<Size, string> = {
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4",
  xl: "px-10 py-5 text-lg",
};

function classes(variant: Variant, size: Size, className: string) {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`;
}

type Common = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  /** Adds a nudging arrow. Use for navigation, not for submit actions. */
  arrow?: boolean;
};

function Inner({ children, arrow }: { children: React.ReactNode; arrow?: boolean }) {
  return (
    <>
      {children}
      {arrow && (
        <span
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:translate-x-1"
        >
          →
        </span>
      )}
    </>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "lg",
  className = "",
  children,
  arrow,
  ...rest
}: Common & { href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const external = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
  const cls = `group ${classes(variant, size, className)}`;

  if (external) {
    return (
      <a href={href} className={cls} {...rest}>
        <Inner arrow={arrow}>{children}</Inner>
      </a>
    );
  }

  return (
    <Link href={href} className={cls} {...rest}>
      <Inner arrow={arrow}>{children}</Inner>
    </Link>
  );
}

export function Button({
  variant = "primary",
  size = "lg",
  className = "",
  children,
  arrow,
  ...rest
}: Common & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`group ${classes(variant, size, className)}`} {...rest}>
      <Inner arrow={arrow}>{children}</Inner>
    </button>
  );
}
