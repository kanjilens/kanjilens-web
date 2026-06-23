import { useEffect, useRef } from "react";
import { KanjiStatus } from "@features/kanji/types/kanji.types";
import { ModalHeader } from "./ModalHeader";
import { ModalContent } from "./ModalContent";
import { ModalFooter } from "./ModalFooter";
import { useKanji } from "@features/kanji/hooks/useKanji";

interface KanjiModalProps {
  open: boolean;
  kanjiId: string | null;
  onClose(): void;
}

export const KanjiModal = ({
  open,
  kanjiId,
  onClose,
}: KanjiModalProps) => {
  const { get, updateStatus, remove } = useKanji();

  const containerRef = useRef<HTMLDivElement | null>(null);

  const kanji = kanjiId ? get(kanjiId) : null;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    if (open && containerRef.current) {
      containerRef.current.focus();
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, open]);

  useEffect(() => {
    if (open && kanji?.status === KanjiStatus.NEW) {
      updateStatus(kanji.kanji, KanjiStatus.IDLE);
    }
  }, [open, kanji, updateStatus]);

  if (!open || !kanji) {
    return null;
  }

  const getKanjiStateInfo = (
    status: KanjiStatus | undefined,
  ) => {
    switch (status) {
      case KanjiStatus.SEEN:
        return {
          text: "não visto",
          icon: "visibility_off",
        };
      default:
        return {
          text: "visto",
          icon: "visibility",
        };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      <div
        className="
    relative
    z-10

    bg-white
    rounded-[16px]
    shadow-lg

    w-full
    max-w-[800px]

    md:w-[60%]
    lg:w-[50%]
    xl:w-[40%]
    
    my-8
  "
      >
        <ModalHeader kanji={kanji} onClose={onClose} />
        <ModalContent kanji={kanji} />
        <ModalFooter
          actions={[
            {
              fn: () =>
                updateStatus(
                  kanji.kanji,
                  kanji.status === KanjiStatus.SEEN
                    ? KanjiStatus.IDLE
                    : KanjiStatus.SEEN,
                ),
              text: `Marcar como ${getKanjiStateInfo(kanji.status).text}`,
              style: {
                icon: getKanjiStateInfo(kanji.status).icon,
                txtColor: "#0F766E",
                bgColor: "#FFFFFF",
                width: "-webkit-fill-available",
                customStyles:
                  "font-[500] leading-[20px] border-2 border-[#99F6E4] justify-center hover:!bg-[#0F766E] hover:!text-[#FFFFFF] hover:!border-[#0F766E]",
              },
            },
            {
              fn: () => remove(kanji.kanji),
              text: "Excluir",
              style: {
                icon: "delete",
                txtColor: "#FFFFFF",
                bgColor: "#EF4444",
                customStyles:
                  "font-[500] leading-[20px] hover:!bg-[#8d2a2a]",
              },
            },
          ]}
        />
      </div>
    </div>
  );
};
