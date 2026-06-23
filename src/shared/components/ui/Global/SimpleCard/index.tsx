import { Typography } from "@components/ui/Typography";

export const SimpleCard = ({
  kanji,
  meaning,
}: {
  kanji?: string;
  meaning?: string;
}) => {
  return (
    <div
      className="bg-[#FFFFFF26] gap-2 sm:gap-3 border border-[#FFFFFF2E] rounded-[16px] 
      w-full max-w-[140px] sm:max-w-[162px] max-w-[180px] max-h-[114px] flex flex-col
      justify-center items-start p-3 sm:p-4 flex-1"
    >
      <Typography
        as="h3"
        className="leading-none text-[20px] sm:text-[32px] lg:text-[40px] text-white"
      >
        {kanji}
      </Typography>
      <Typography
        variant="caption"
        as="p"
        className="text-[#F0FDFACC] text-xs sm:text-sm"
      >
        {meaning}
      </Typography>
    </div>
  );
};
