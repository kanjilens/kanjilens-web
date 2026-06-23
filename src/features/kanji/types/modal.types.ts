export type ActionStates =
  | "hover"
  | "default"
  | "active"
  | "disabled";

export type ActionData = {
  text?: string;
  icon?: string;
  styles?: ButtonStyles;
};

export type StateInformation = {
  state: boolean;
  data: ActionData;
};

export type ButtonStyles = {
  bgColor?: string;
  txtColor?: string;
  width?: string;
  customStyles?: string;
};

export type OnStateAction = Partial<
  Record<ActionStates, StateInformation>
>;

export type ModalAction = {
  stateInfo?: OnStateAction;
  fn: () => void;
  text?: string;
  style?: ButtonStyles & { icon?: string };
};
