import type { VariantStyleAgregator } from "@shared/types";

export type CardVariants = "default" | "upper" | "start";
export type CardElements =
  | "button"
  | "kanji"
  | "textHeader"
  | "span1"
  | "span2";

export const cardVariantStyles: VariantStyleAgregator<
  CardElements,
  CardVariants
> = {
  button: {
    default:
      "justify-center items-center min-h-[310px] min-w-[302px] sm:min-w-[302px] max-w-[100%] p-4 sm:p-[21px] pb-[42px] border border-[#03021333] shadow-[0_2px_4px_rgba(0,0,0,0.25)] hover:shadow-[0_6px_12px_rgba(0,0,0,0.28)] hover:border-[#03021366] transition-shadow transition-colors duration-200",
    upper:
      "justify-center items-center min-h-[241px] min-w-[300px] sm:min-w-[300px] max-w-[100%] p-4 sm:p-[21px] pb-[42px] border border-[#03021333] hover:shadow-[0_6px_12px_rgba(0,0,0,0.16)] hover:border-[#03021366] transition-shadow transition-colors duration-200",
    start:
      "justify-start items-start min-h-[200px] min-w-[100px] sm:min-w-[200px] max-w-[100%] p-3 pt-0 pb-[24px] border border-[#03021333] hover:shadow-[0_6px_12px_rgba(0,0,0,0.16)] hover:border-[#03021366] transition-shadow transition-colors duration-200",
  },
  kanji: {
    default: "pb-[24px] sm:pb-[32px] pt-0",
    upper: "pb-4",
    start: "pb-[24px] sm:pb-[32px] pt-0",
  },
  span1: {
    default:
      "absolute hidden sm:block w-[193px] h-[193px] rounded-[50%] bg-[#C5F5DA] top-[-96px] right-[-96px]",
    upper:
      "absolute sm:block w-[128px] h-[128px] rounded-[50%] bg-[#D1FAE5]/70 top-[-39px] right-[-40px]",
    start:
      "absolute sm:block w-[128px] h-[128px] rounded-[50%] bg-[#CCFBF1]/60 top-[-39px] right-[-40px]",
  },
  span2: {
    default:
      "absolute block sm:hidden w-[120px] h-[120px] rounded-[50%] bg-[#C5F5DA] top-[-60px] right-[-60px]",
    upper:
      "absolute block w-[80px] h-[80px] rounded-[50%] bg-[#99F6E4]/50 top-[-23px] right-[-8px]",
    start:
      "absolute block w-[80px] h-[80px] rounded-[50%] bg-[#99F6E4]/40 top-[-23px] right-[-8px]",
  },
  textHeader: {
    default: "calendar_today",
    upper: "calendar_today",
    start: "import_contacts",
  },
};
