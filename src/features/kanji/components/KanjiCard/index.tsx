import { TextHeader } from "@components/ui/Typography/TextHeader";
import { CardState } from "./CardState";
import { Typography } from "@components/ui/Typography";

import type { Kanji } from "@features/kanji/types/kanji.types";
import { KanjiStatus } from "@features/kanji/types/kanji.types";
import {
  cardVariantStyles,
  type CardVariants,
} from "@features/kanji/types/card.types";
import { CardInfo } from "./CardInfo";

interface CardProps extends Kanji {
  variant?: CardVariants;
}

export const Card = ({
  kanji,
  meanings,
  kunReadings,
  onReadings,
  addedAt,
  strokeCount,
  status,
  variant = "default",
}: CardProps) => {
  const reading =
    kunReadings.length > 0
      ? kunReadings.slice(0, 3).join(", ")
      : onReadings.slice(0, 3).join(", ");

  const meaning = meanings.join(", ");
  console.log(status);
  return (
    <button
      type="button"
      className={`flex flex-col w-full bg-[#FFFFFF] relative overflow-hidden cursor-pointer rounded-[14px] ${cardVariantStyles.button[variant]}`}
    >
      <span className={cardVariantStyles.span1[variant]} />
      <span className={cardVariantStyles.span2[variant]} />

      {status !== KanjiStatus.IDLE && (
        <CardState
          variant="floating"
          textState={
            status === KanjiStatus.SEEN
              ? "Visto"
              : status === KanjiStatus.LEARNING
                ? "Aprendendo"
                : "Novo"
          }
          icon={
            status === KanjiStatus.NEW
              ? "check_circle_unread"
              : "visibility"
          }
        />
      )}

      <h3
        className={`relative text-[48px] sm:text-[60px] text-normal ${cardVariantStyles.kanji[variant]}`}
      >
        {kanji}
      </h3>

      <CardInfo
        label="Significado"
        value={meaning}
        variant={variant}
      />

      {variant === "start" ? (
        <Typography
          variant="body"
          as="p"
          className="text-[#0F766E]"
        >
          {reading}
        </Typography>
      ) : (
        <CardInfo
          label="Leitura"
          value={reading}
          variant={variant}
        />
      )}

      <TextHeader
        information={
          variant === "start"
            ? `${strokeCount} traços`
            : (addedAt?.toLocaleDateString("pt-BR") ?? "")
        }
        icon={cardVariantStyles.textHeader[variant]}
        variant={variant}
      />
    </button>
  );
};
