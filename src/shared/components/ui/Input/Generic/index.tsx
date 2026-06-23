import type { VariantStyleAgregator } from "@shared/types";
import {
  useId,
  type ComponentProps,
  type ReactNode,
} from "react";
import {
  useController,
  type Control,
} from "react-hook-form";

type GenericInputVariants =
  | "default"
  | "search"
  | "card"
  | "submit"
  | "kanji"
  | "submit1";

type GenericInputElements =
  | "wrapper"
  | "input"
  | "label"
  | "icon";

const stateStyle =
  "disabled:bg-[#0D9488]/70 disabled:!text-white/75 disabled:shadow-none disabled:cursor-not-allowed hover:bg-[#0b7d74] active:bg-[#0a6a62]";
const breakPointStyle =
  "lg:min-h-[48px] lg:text-[14px] lg:rounded-[14px]";
const animationStyle =
  "transition-colors duration-150 ease-in-out cursor-pointer";

const textInputVariants: VariantStyleAgregator<
  GenericInputElements,
  GenericInputVariants
> = {
  wrapper: {
    default: "bg-[#FFFFFF] min-h-[48px]",
    card: "bg-[#FFFFFF] min-h-[38px] w-full",
    submit: "w-full",
  },
  input: {
    default:
      "text-[14px] border-[#0302134D] w-full pb-[2px] pr-3 border min-h-[48px] rounded-[14px]",
    card: "text-[14px] border border-[#E5E7EB] w-full min-h-[38px] rounded-[8px]",
    submit: `bg-[#0D9488] w-full !pl-0 min-h-[40px] mb-4 text-sm text-[#FFFFFF] rounded-[10px] shadow-[0_4px_6px_#00786666] ${animationStyle} ${breakPointStyle} ${stateStyle}`,
    submit1: `bg-[#0D9488]/50 py-3 px-2 h-[38px] text-sm text-[#FFFFFF] rounded-[10px] ${animationStyle} ${stateStyle}`,
  },
  label: {
    default: "text-[14px] mb-1",
    card: "text-[14px]",
    kanji: "text-[20px] mb-2",
  },
  icon: {
    default: "text-[#0D9488] sm1 left-3",
    card: "text-[#0D9488] left-3",
    submit1:
      "text-white rotate-[315deg] sm2 translate-x-[60%] -translate-y-[60%]",
  },
};

type TextInputProps = ComponentProps<"input"> & {
  control: Control<any>;
  icon?: ReactNode;
  label?: string;
  labelComplement?: string | ReactNode;
  hiddenLabel?: boolean;
  name: string;
  variant?: GenericInputVariants;
  labelVariant?: GenericInputVariants;
};

const GenericInput = ({
  control,
  name,
  icon,
  label,
  hiddenLabel = false,
  variant = "default",
  labelVariant,
  labelComplement,
  ...inputProps
}: TextInputProps) => {
  const { className, ...restInputProps } = inputProps;
  const {
    formState: { errors },
  } = useController({ control, name });

  const labelId = useId();
  const inputId = useId();

  return (
    <div
      className={`flex flex-col gap-1 ${textInputVariants.wrapper[variant]}`}
    >
      {label && (
        <div className="flex flex-row justify-between items-center">
          <label
            id={labelId}
            className={`${textInputVariants.label[labelVariant ?? variant]} ${inputProps.required && "text-[14px] h-fit mb-1 after:content-['*'] after:text-red-500 after:ml-1"} ${hiddenLabel && "w-1 h-1"}`}
            style={{
              visibility: hiddenLabel
                ? "hidden"
                : "visible",
            }}
            htmlFor={inputId}
          >
            {label}
          </label>
          {labelComplement}
        </div>
      )}
      <div className="relative">
        {icon && (
          <span
            className={`pointer-events-none absolute top-1/2 -translate-y-1/2 material-symbols-outlined ${textInputVariants.icon[variant]}`}
          >
            {icon}
          </span>
        )}
        <input
          id={inputId}
          aria-labelledby={labelId}
          className={`${icon ? "pl-8" : "pl-3"} ${
            textInputVariants.input[variant]
          } ${className ?? ""} ${errors[name] ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`.trim()}
          {...restInputProps}
          {...control.register(name)}
        />
      </div>
      {errors[name] && (
        <span className="text-red-500">
          {errors[name]?.message?.toString()}
        </span>
      )}
    </div>
  );
};

export default GenericInput;
