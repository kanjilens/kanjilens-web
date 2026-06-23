type TextHeaderVariations =
  | "upper"
  | "default"
  | "v1"
  | "v2"
  | "start";

// Separate styles for icon and info so we can color the tag (span) differently in v2
const typeStyles: Record<
  TextHeaderVariations,
  { icon: string; info: string; div?: string }
> = {
  v1: {
    icon: "text-[#0D9488] font-bold sm2",
    info: "text-[#0D9488] font-bold sm2",
  },
  default: {
    div: "p-2",
    icon: "text-[#717182] font-normal text-[16px]",
    info: "text-[#717182] font-normal text-[16px]",
  },
  upper: {
    icon: "text-[#9CA3AF] font-normal text-[12px]",
    info: "text-[#9CA3AF] font-normal text-[12px]",
  },
  start: {
    icon: "text-[#9CA3AF] font-normal text-[16px]",
    info: "text-[#9CA3AF] font-normal text-[16px]",
  },
  v2: {
    div: "h-[24px]",
    icon: "text-[#9CA3AF] font-normal !text-[16px]",
    info: "text-black font-normal text-[16px]",
  },
};

export const TextHeader = ({
  information,
  icon,
  variant = "default",
}: {
  information: string | number;
  icon?: string;
  variant?: TextHeaderVariations;
}) => {
  const styles = typeStyles[variant] ?? typeStyles.default;

  return (
    <div
      className={`relative flex flex-row gap-1 h-[12px] items-center ${styles.div}`}
    >
      {icon && (
        <span
          className={`material-symbols-outlined sm4 ${styles.icon}`}
        >
          {icon}
        </span>
      )}
      <span className={`leading-5 ${styles.info}`}>
        {information}
      </span>
    </div>
  );
};
