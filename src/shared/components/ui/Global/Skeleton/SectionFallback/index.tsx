import { Typography } from "@components/ui/Typography";

export const SectionFallback = ({
  icon = "calendar_today",
  text = "Nenhum kanji adicionado hoje",
}: {
  icon?: string;
  text?: string;
}) => {
  return (
    <div className="flex flex-col justify-center items-center flex-1 gap-3">
      {icon && (
        <span
          className={`material-symbols-outlined md2 text-[#6B7280]`}
        >
          {icon}
        </span>
      )}
      <Typography variant="subtitle">{text}</Typography>
    </div>
  );
};
