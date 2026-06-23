export interface SummaryCardDataProps {
  title: string;
  value: string | number;
  description: string;
  icon: string;
}

export const SummaryCard = ({
  title,
  description,
  value,
  icon,
}: SummaryCardDataProps) => {
  return (
    <div
      className="flex flex-col justify-center items-start bg-[#FFFFFF] w-full min-w-0 max-h-[164px] sm:max-h-[140px] sm:min-w-[200px] sm:w-[302px]
      p-4 sm:p-6 border border-[#03021333] border-t-[#077A7D] border-t-2 rounded-[14px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
    >
      <div className="flex flex-row justify-between items-center w-full">
        <h3 className="text-[12px] sm:text-[14px]">
          {title}
        </h3>
        <span className="material-symbols-outlined text-[20px] sm:text-[24px] text-[#0D9488]">
          {icon}
        </span>
      </div>
      <h4 className="text-[36px] sm:text-[49px] text-[#077A7D] leading-[65.33px]">
        {value}
      </h4>
      <p className="text-[11px] sm:text-[12px] text-[#6B7280]">
        {description}
      </p>
    </div>
  );
};

export const SummaryCardSkeleton = () => {
  return (
    <div
      className="flex flex-col justify-center items-start bg-[#FFFFFF] w-full min-w-0 max-h-[164px] sm:max-h-[140px] sm:min-w-[200px] sm:w-[302px]
      p-4 sm:p-6 border border-[#03021333] border-t-[#077A7D] border-t-2 rounded-[14px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] animate-pulse"
    >
      <div className="flex flex-row justify-between items-center w-full">
        <div className="h-3 sm:h-4 w-24 rounded bg-gray-200" />
        <div className="h-5 w-5 sm:h-6 sm:w-6 rounded bg-gray-200" />
      </div>
      <div className="mt-4 h-8 sm:h-12 w-20 rounded bg-gray-200" />
      <div className="mt-4 h-3 sm:h-4 w-full rounded bg-gray-200" />
      <div className="mt-2 h-3 sm:h-4 w-5/6 rounded bg-gray-200" />
    </div>
  );
};
