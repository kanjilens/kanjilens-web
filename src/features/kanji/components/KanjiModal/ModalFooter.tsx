import type { ModalAction } from "@features/kanji/types";
import { resolveActionState } from "@features/kanji/utils/modal";

export const ModalFooter = ({
  actions,
}: {
  actions: ModalAction[];
}) => {
  const defaultStyles =
    "px-3 py-2 min-h-[36px] flex flex-row gap-2 items-center rounded-[8px] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

  return (
    <div className="p-6 flex flex-row gap-2">
      {actions.map((action) => {
        const resolvedAction = resolveActionState(action);
        const style = resolvedAction.styles || {};
        const text = resolvedAction.text || "";
        return (
          <button
            tabIndex={0}
            key={text
              .toLocaleLowerCase()
              .replaceAll(" ", "_")}
            type="button"
            disabled={action.stateInfo?.disabled?.state}
            className={`${defaultStyles} ${style.customStyles || ""}`}
            onClick={(e) => {
              e.preventDefault();
              action.fn();
            }}
            style={{
              backgroundColor: style.bgColor,
              color: style.txtColor,
              width: style.width,
            }}
          >
            {resolvedAction.icon && (
              <span className="material-symbols-outlined sm3">
                {resolvedAction.icon}
              </span>
            )}
            {text}
          </button>
        );
      })}
    </div>
  );
};
