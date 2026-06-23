import {
  KanjiStatus,
  type Kanji,
} from "@features/kanji/types";
import React, { useEffect, useState } from "react";
import { Typography } from "@components/ui/Typography";
import { CardState } from "@features/kanji/components/KanjiCard/CardState";
import { useGlobalToast } from "@features/iam/hooks/useGlobalToast";

export const ModalHeader = ({
  kanji,
  onClose,
}: {
  kanji: Kanji;
  onClose: () => void;
}) => {
  const { addToast } = useGlobalToast();
  const copyKanji = async () => {
    try {
      await navigator.clipboard.writeText(kanji.kanji);
      setCopied(true);
    } catch {
      // ignore copy errors
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") copyKanji();
  };
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    addToast("Kanji copied to clipboard", "success");
    return () => clearTimeout(t);
  }, [copied, addToast]);

  return (
    <div className="relative bg-gradient-to-r from-[#0F766E] flex flex-row  items-center to-[#14B8A6] p-6 gap-6 rounded-[16px_16px_0px_0px]">
      <button
        type="button"
        className="absolute top-4 right-4 text-white cursor-pointer"
        onClick={onClose}
        aria-label="Close dialog"
      >
        <span className="material-symbols-outlined md">
          close
        </span>
      </button>
      <div className="bg-[#FFF] w-24 h-24 flex flex-row items-center justify-center rounded-full">
        <h2
          className="text-[48px] font-normal leading-none cursor-pointer"
          tabIndex={0}
          role="button"
          title="Clique para copiar"
          onClick={copyKanji}
          onKeyDown={handleKeyDown}
        >
          {kanji.kanji}
        </h2>
      </div>
      <div className="flex flex-col" tabIndex={0}>
        <div className="flex flex-row gap-3 mb-2">
          <CardState
            textState={`JLPT N${kanji.jlpt}`}
            variant="reversed"
          />
          <CardState
            textState={`Grade ${kanji.grade}`}
            variant="transparent"
          />
          {kanji.status === KanjiStatus.SEEN && (
            <CardState
              icon="visibility"
              textState={"Visto"}
              variant="transparent"
            />
          )}
        </div>
        <Typography className="text-[#FFFFFF] text-[18px]">
          {kanji.meanings.slice(0, 3).join(", ")}
        </Typography>
        <Typography className="text-[#CFFAFE] italic text-[14px]">
          Heisig: {kanji.heisig}
        </Typography>
      </div>
    </div>
  );
};
