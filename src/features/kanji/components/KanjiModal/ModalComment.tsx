import { Typography } from "@components/ui/Typography";

export const ModalComment = ({
  text,
  date,
  icon,
  remove,
}: {
  id: string;
  text: string;
  icon?: string;
  date?: Date;
  remove?: () => void;
}) => (
  <div
    tabIndex={0}
    className="
      group
      flex
      w-full
      border-2
      border-[#E5E7EB]
      rounded-[10px]
      transition-colors
      hover:bg-[#e6eceb]
      focus-within:bg-[#e6eceb]
    "
  >
    <div className="flex-1 min-w-0 p-3">
      <div className="flex gap-3 items-start">
        {icon && (
          <span className="material-symbols-outlined !text-[18px] text-[#6B7280] shrink-0 mt-1">
            {icon}
          </span>
        )}

        <div className="flex flex-col min-w-0">
          <Typography className="break-words whitespace-pre-wrap">
            {text}
          </Typography>

          {date && (
            <Typography variant="label">
              {date.toLocaleDateString("pt-BR")}
            </Typography>
          )}
        </div>
      </div>
    </div>

    {remove && (
      <div
        className="
          shrink-0
          w-12

          md:w-0
          md:opacity-0

          md:group-hover:w-12
          md:group-hover:opacity-100

          md:group-focus-within:w-12
          md:group-focus-within:opacity-100

          transition-all
          duration-200
          overflow-hidden

          flex
        "
      >
        <button
          type="button"
          onClick={remove}
          className="
            w-full
            bg-[#0F766E]
            rounded-r-[10px]
            flex
            items-center
            justify-center

            hover:bg-[#0F766E]/60
            focus:bg-[#0F766E]/60
            transition-colors
            cursor-pointer
          "
        >
          <span className="material-symbols-outlined text-white !text-[18px]">
            delete
          </span>
        </button>
      </div>
    )}
  </div>
);
