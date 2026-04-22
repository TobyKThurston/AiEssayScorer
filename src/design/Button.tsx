import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "brand" | "ink" | "ghost" | "link";
type Size = "sm" | "md" | "lg";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

const variantClass: Record<Variant, string> = {
  brand: "btn btn-brand",
  ink: "btn btn-ink",
  ghost: "btn btn-ghost",
  link: "inline-flex items-center gap-1.5 text-oxblood hover:text-oxblood-2 text-sm font-medium transition-colors",
};

const sizeClass: Record<Size, string> = {
  sm: "btn-sm",
  md: "",
  lg: "btn-lg",
};

type ButtonAsLink = CommonProps & { href: string } & Omit<ComponentPropsWithoutRef<"a">, "className" | "children">;
type ButtonAsButton = CommonProps & { href?: undefined } & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;
export type ButtonProps = ButtonAsLink | ButtonAsButton;

export function Button(props: ButtonProps) {
  const { variant = "brand", size = "md", children, className = "" } = props;
  const classes = `${variantClass[variant]} ${variant !== "link" ? sizeClass[size] : ""} ${className}`.trim();

  if ("href" in props && props.href !== undefined) {
    const { variant: _v, size: _s, children: _c, className: _cn, href, ...rest } = props;
    void _v; void _s; void _c; void _cn;
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }
  const { variant: _v, size: _s, children: _c, className: _cn, ...rest } = props as ButtonAsButton;
  void _v; void _s; void _c; void _cn;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
