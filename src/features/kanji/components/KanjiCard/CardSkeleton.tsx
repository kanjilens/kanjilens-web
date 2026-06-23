import {
  cardVariantStyles,
  type CardVariants,
} from "@features/kanji/types/card.types";

export const CardSkeleton = ({
  variant = "start",
}: {
  variant?: CardVariants;
}) => {
  return (
    <div
      className={`flex flex-col w-full bg-[#FFFFFF] relative overflow-hidden rounded-[14px] animate-pulse ${cardVariantStyles.button[variant]}`}
      aria-hidden="true"
    >
      <span className={cardVariantStyles.span1[variant]} />
      <span className={cardVariantStyles.span2[variant]} />

      <div
        className={`relative ${cardVariantStyles.kanji[variant]}`}
      >
        <div className="h-[56px] sm:h-[68px] w-[48px] bg-[#E5E7EB] rounded-md" />
      </div>

      <div className="w-full space-y-3">
        <div className="h-4 w-5/6 bg-[#E5E7EB] rounded" />
        {variant !== "start" && (
          <div className="h-4 w-2/3 bg-[#E5E7EB] rounded" />
        )}
        <div className="h-4 w-1/2 bg-[#E5E7EB] rounded" />
      </div>
    </div>
  );
};
