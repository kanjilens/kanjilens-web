import type { CardVariants } from "@features/kanji/types/card.types";
import type { VariantStyleAgregator } from "@shared/types";

type CardInfoElements = "div" | "label" | "value";

const cardInfovariantStyles: VariantStyleAgregator<
  CardInfoElements,
  CardVariants
> = {
  div: {
    default:
      "flex flex-col relative  mb-[8px] items-center",
    upper: "flex flex-col relative  mb-[8px] items-center",
    start: "flex flex-col relative items-start",
  },
  value: {
    default: "text-regular text-[16px] text-[#030213]",
    upper: "text-regular text-[14px] text-[#1F2937]",
    start:
      "text-regular text-[14px] text-[#1F2937] text-start",
  },
  label: {
    default: "text-[12px] text-[#717182]",
    upper: "text-[12px] text-[#9CA3AF] uppercase",
    start: "text-[14px] text-[#9CA3AF] uppercase",
  },
};

export const CardInfo = ({
  label = "Leitura",
  value,
  valueColor,
  variant = "default",
}: {
  label?: string;
  value: string;
  valueColor?: string;
  variant?: CardVariants;
}) => {
  return (
    <div className={cardInfovariantStyles.div[variant]}>
      <h4 className={cardInfovariantStyles.label[variant]}>
        {label}
      </h4>
      <span
        className={cardInfovariantStyles.value[variant]}
        style={
          valueColor ? { color: valueColor } : undefined
        }
      >
        {value}
      </span>
    </div>
  );
};
