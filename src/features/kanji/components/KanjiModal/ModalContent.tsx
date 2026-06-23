import GenericInput from "@components/ui/Input/Generic";
import { Typography } from "@components/ui/Typography";
import { Tag } from "@components/ui/Global/Tag";
import { TextHeader } from "@components/ui/Typography/TextHeader";
import type { Kanji } from "@features/kanji/types";
import { ModalContentInfo } from "./ModalContentInfo";
import { ModalSectionWrapper } from "./ModalSectionWrapper";
import { ModalComment } from "./ModalComment";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { useKanji } from "@features/kanji/hooks/useKanji";

type FormProps = z.infer<typeof CommentFormSchema>;

const CommentFormSchema = z.object({
  comment: z.string(),
});

export const ModalContent = ({
  kanji,
}: {
  kanji: Kanji;
}) => {
  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting, isDirty },
  } = useForm<FormProps>({
    resolver: zodResolver(CommentFormSchema),
  });

  const { addNote, removeNote } = useKanji();

  const addComment = async (data: FormProps) => {
    await addNote(kanji.kanji, data.comment);
    reset();
  };

  return (
    <div className="px-6">
      <ModalSectionWrapper customStyles="flex flex-row">
        <div className="w-1/2">
          <ModalContentInfo label="TRAÇOS">
            <Typography className="text-[16px] text-[#1F2937] font-normal leading-[24px]">
              {kanji.strokeCount}
            </Typography>
          </ModalContentInfo>
        </div>
        <div className="w-1/2">
          {kanji.addedAt && (
            <ModalContentInfo label="DATA DE ADIÇÃO">
              <TextHeader
                information={
                  kanji.addedAt.toLocaleDateString(
                    "pt-BR",
                  ) ?? ""
                }
                icon="calendar_today"
                variant="v2"
              />
            </ModalContentInfo>
          )}
        </div>
      </ModalSectionWrapper>
      <ModalSectionWrapper customStyles="flex flex-col">
        <ModalContentInfo label="LEITURAS ON (音読み)">
          {kanji.onReadings.map((i) => (
            <Tag text={i} key={i} variant="success" />
          ))}
        </ModalContentInfo>
        <ModalContentInfo label="LEITURAS KUN (音読み)">
          {kanji.kunReadings.map((i) => (
            <Tag text={i} key={i} variant="success" />
          ))}
        </ModalContentInfo>
      </ModalSectionWrapper>
      <ModalSectionWrapper>
        <ModalContentInfo label="SIGNIFICADOS">
          <Typography className="text-[#1F2937] text-[18px]">
            {kanji.meanings.join(", ")}
          </Typography>
        </ModalContentInfo>
      </ModalSectionWrapper>
      <ModalSectionWrapper>
        <ModalContentInfo label="COMENTÁRIOS">
          <div className="flex flex-col gap-2 overflow-y-auto max-h-40 pr-2 w-full">
            {kanji.notes?.map((note) => {
              return (
                <ModalComment
                  text={note.text}
                  date={note.createdAt}
                  icon="chat_bubble"
                  id={note.id}
                  key={note.id}
                  remove={() =>
                    removeNote(kanji.kanji, note.id)
                  }
                />
              );
            })}
          </div>
          <form
            className="flex flex-row w-full gap-2 items-center"
            onSubmit={handleSubmit(addComment)}
          >
            <GenericInput
              type="text"
              name="comment"
              label="Escreva seu comentário"
              variant="card"
              placeholder="Escreva um comentário sobre este kanji..."
              hiddenLabel
              control={control as any}
            />
            <GenericInput
              type="submit"
              name="submit"
              role="button"
              variant="submit1"
              label="Adicionar Comentário"
              value={""}
              icon="send"
              disabled={isSubmitting || !isDirty}
              hiddenLabel
              control={control as any}
            />
          </form>
        </ModalContentInfo>
      </ModalSectionWrapper>
    </div>
  );
};
