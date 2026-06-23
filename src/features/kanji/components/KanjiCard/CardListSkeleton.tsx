import type { CardVariants } from "@features/kanji/types";
import { CardSkeleton } from "./CardSkeleton";

export const CardListSkeletom = ({
  length = 4,
  variant = "start",
}: {
  length?: number;
  variant?: CardVariants;
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-[16px]">
      {Array.from({ length }).map((_, i) => (
        <CardSkeleton key={i} variant={variant} />
      ))}
    </div>
  );
};
