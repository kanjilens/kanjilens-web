import { Typography } from "@components/ui/Typography";

type TagVariant =
  | "default"
  | "success"
  | "warning"
  | "danger"
  | "info";
type TagSize = "sm" | "md" | "lg";

const tagVariantStyles: Partial<
  Record<TagVariant, string>
> = {
  default: "border",
  success: "border border-[#99F6E4] bg-[#CCFBF1]",
};

const tagSizeStyles: Record<TagSize, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
  lg: "px-4 py-2 text-base",
};

interface TagProps {
  text: string;
  variant?: TagVariant;
  size?: TagSize;
}

export const Tag = ({
  text,
  variant = "default",
  size = "md",
}: TagProps) => {
  const variantClass =
    tagVariantStyles[variant] || tagVariantStyles.default;
  const sizeClass = tagSizeStyles[size] || tagSizeStyles.md;

  return (
    <div
      className={`flex flex-row items-center rounded-full ${variantClass} ${sizeClass}`}
    >
      <Typography className="leading-none">
        {text}
      </Typography>
    </div>
  );
};
