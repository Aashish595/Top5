// components/Breadcrumbs.tsx
import Link from "next/link";

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}
export default function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav className={`flex mb-6 ${className}`} aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {item.href ? (
              <Link
                href={item.href}
                className="text-sm text-muted-foreground hover:text-primary"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-sm font-medium text-foreground">
                {item.label}
              </span>
            )}
            {index < items.length - 1 && (
              <span className="mx-2 text-muted-foreground">/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}