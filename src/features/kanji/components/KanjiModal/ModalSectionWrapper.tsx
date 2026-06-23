import type { PropsWithChildren } from "react";

export const ModalSectionWrapper = ({
  children,
  customStyles,
}: {
  customStyles?: string;
} & PropsWithChildren) => (
  <section
    className={`w-full border-b-2 border-[#E5E7EB] pt-4 ${customStyles}`}
  >
    {children}
  </section>
);
