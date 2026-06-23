import type {
  ActionData,
  ActionStates,
  ModalAction,
} from "@features/kanji/types";

export const resolveActionState = (action: ModalAction) => {
  const stateInfo = action.stateInfo;

  const fallback: ActionData = {
    text: action.text,
    icon: action.style?.icon,
    styles: action.style,
  };

  if (!stateInfo) return fallback;

  const stateOrder: ActionStates[] = [
    "disabled",
    "active",
    "hover",
    "default",
  ];

  const resolvedState = stateOrder.find(
    (state) => stateInfo[state]?.state,
  );

  const resolvedData = resolvedState
    ? stateInfo[resolvedState]?.data
    : undefined;

  return {
    ...fallback,
    ...resolvedData,
    styles: {
      ...fallback.styles,
      ...resolvedData?.styles,
    },
  };
};
