import { Card } from ".";
import { type Kanji } from "@features/kanji/types/kanji.types";

import type { CardVariants } from "@features/kanji/types/card.types";
import { useKanji } from "@features/kanji/hooks/useKanji";

export const CardList = ({
  data,
  variant = "start",
}: {
  data: Kanji[];
  variant?: CardVariants;
}) => {
  const { openKanji } = useKanji();

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-[16px]">
        {data.map((kanji, idx) => (
          <div
            key={`${kanji.unicode}-${kanji.kanji}-${idx}`}
            className="w-full cursor-pointer"
            onClick={() => openKanji(kanji.kanji)}
          >
            <Card {...kanji} variant={variant} />
          </div>
        ))}
      </div>
    </>
  );
};
