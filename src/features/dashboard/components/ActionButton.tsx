import { AddKanjiPopover } from "@features/kanji/components/KanjiPopover";
import { useState } from "react";

export const ActionButton = () => {
  const [openPopover, setOpenPopover] = useState(false);

  return (
    <div className="relative flex justify-end">
      <button
        className="flex flex-row bg-[#077A7D] pl-[12px] pr-[10px] 
        text-white items-center justify-center min-h-[36px] gap-[5px] rounded-[8px] cursor-pointer hover:bg-[#056366] hover:shadow-lg transition-all "
        onClick={() => setOpenPopover(!openPopover)}
      >
        <span className="material-symbols-outlined sd text-white">
          add
        </span>
        Adicionar Kanji
      </button>
      <AddKanjiPopover
        isOpen={openPopover}
        setIsOpen={setOpenPopover}
      />
    </div>
  );
};
