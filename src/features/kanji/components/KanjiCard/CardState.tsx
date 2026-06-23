type CardStateVariants =
  | "default"
  | "reversed"
  | "floating"
  | "transparent";

const cardStateVariantStyles: Record<
  CardStateVariants,
  string
> = {
  default: "bg-[#077A7D] text-white",
  floating:
    "bg-[#077A7D] text-white absolute top-[10px] right-[8px] ",
  reversed: "bg-[#FFF] text-[#077A7D]",
  transparent: "bg-[#FFF]/25 text-white",
};

interface CardStateProps {
  variant?: CardStateVariants;
  textState: string;
  icon?: string;
}

export const CardState = ({
  textState = "Visto",
  icon,
  variant = "default",
}: CardStateProps) => {
  return (
    <div
      className={`flex flex-row gap-2 items-center self-end 
      justify-center w-fit p-2 rounded-[8px] h-[22px] ${cardStateVariantStyles[variant]}`}
    >
      {icon && (
        <span className="material-symbols-outlined sm">
          {icon}
        </span>
      )}
      <span className="text-[12px] font-medium">
        {textState}
      </span>
    </div>
  );
};
