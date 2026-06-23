import React from "react";

export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "subtitle"
  | "body"
  | "caption"
  | "label";

export type TypographyProps =
  React.HTMLAttributes<HTMLElement> & {
    as?: React.ElementType;
    variant?: TypographyVariant;
  };

const variantStyles: Record<TypographyVariant, string> = {
  h1: "text-[24px] font-[500] tracking-tight",
  h2: "text-[30px] font-normal",
  h3: "text-[48px] font-normal tracking-tight text-white",
  h4: "text-[16px] font-normal text-[#030213]",
  h5: "text-lg font-semibold text-slate-900",
  h6: "text-base font-semibold text-slate-900",
  subtitle: "text-[16px] font-normal text-[#717182]",
  body: "text-base leading-7",
  caption: "text-[14px] font-normal",
  label: "text-[14px] text-[#6B7280]",
};

const defaultElement: Record<
  TypographyVariant,
  React.ElementType
> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  subtitle: "p",
  body: "p",
  caption: "span",
  label: "span",
};

export const Typography = React.forwardRef<
  HTMLElement,
  TypographyProps
>(
  (
    {
      as,
      variant = "body",
      className = "",
      children,
      ...props
    },
    ref,
  ) => {
    const Component = as ?? defaultElement[variant];

    return (
      <Component
        ref={ref}
        className={`${variantStyles[variant]} ${className}`}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

Typography.displayName = "Typography";
