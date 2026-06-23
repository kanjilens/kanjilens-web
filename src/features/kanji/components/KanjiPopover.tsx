import { useForm } from "react-hook-form";
import { kanjiService } from "../services/kanji.service";
import z from "zod";
import { useKanji } from "../hooks/useKanji";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useEffect,
  useRef,
  type Dispatch,
  type SetStateAction,
} from "react";
import GenericInput from "@components/ui/Input/Generic";

const AddKanjiSchema = z.object({
  kanji: z
    .string()
    .trim()
    .min(1, "Digite um kanji")
    .max(1, "Digite apenas um kanji")
    .refine(
      (value) => /\p{Script=Han}/u.test(value),
      "O caractere informado não é um kanji",
    ),
});

type FormData = z.infer<typeof AddKanjiSchema>;

export const AddKanjiPopover = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { handleAddKanji, get } = useKanji();
  const popoverRef = useRef<HTMLDivElement>(null);

  const {
    handleSubmit,
    setError,
    reset,
    control,
    formState: { isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(AddKanjiSchema),
  });

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener(
        "mousedown",
        handleClickOutside,
      );
    }

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
    };
  }, [isOpen, setIsOpen]);

  const onSubmit = async (data: FormData) => {
    const kanji = data.kanji.trim();

    if (get(kanji)) {
      setError("kanji", {
        message: "Este kanji já foi adicionado",
      });

      return;
    }

    const response = await kanjiService.getById(kanji);

    if (!response.ok) {
      setError("kanji", {
        message: "Kanji não encontrado",
      });

      return;
    }

    await handleAddKanji(kanji);

    setIsOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="
        fixed
        sm:absolute
        left-1/2
        -translate-x-1/2
        sm:top-full
        w-[90vw]
        max-w-[400px]

        sm:w-[320px]
        sm:max-w-none

        sm:left-auto
        sm:right-0
        sm:translate-x-0

        mt-2
        z-50
        "
    >
      <div
        className="
          w-[320px]
          rounded-xl
          relative
          bg-white
          border
          border-[#E5E7EB]
          shadow-xl
          p-4
        "
      >
        <button
          type="button"
          aria-label="Fechar"
          onClick={() => setIsOpen(false)}
          className="absolute top-2 cursor-pointer right-2 text-gray-500 hover:text-gray-700"
        >
          <span className="material-symbols-outlined">
            close
          </span>
        </button>

        <form
          className="flex flex-col gap-3 mt-3 w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <GenericInput
            control={control as any}
            name="kanji"
            label="Adicionar Kanji"
            labelVariant="kanji"
            maxLength={1}
            placeholder="..."
            className="
              border
              border-[#D1D5DB]
              rounded-lg
              px-3
              py-2
              text-center
              text-[40px]
            "
          />
          <GenericInput
            type="submit"
            variant="submit"
            name="submit"
            value="Adicionar"
            label="Adicionar"
            hiddenLabel
            className="w-1/2"
            disabled={isSubmitting}
            control={control as any}
          />
        </form>
      </div>
    </div>
  );
};
