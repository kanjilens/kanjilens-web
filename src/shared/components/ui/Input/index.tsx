import {
  forwardRef,
  type InputHTMLAttributes,
  useId,
} from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  showLabel?: boolean;
  error?: string;
  helperText?: string;
  fileType?: string;
  editInput?: boolean;
  labelClassName?: string;
  containerClassname?: string;
  iconClassName?: string;
  wrapperClassName?: string;
  inputClassName?: string;
  icon?: string;
}

export const Input = forwardRef<
  HTMLInputElement,
  InputProps
>(
  (
    {
      type = "",
      name = "",
      label = "",
      showLabel = true,
      helperText = "",
      editInput,
      labelClassName,
      containerClassname = "",
      wrapperClassName = "",
      inputClassName = "",
      iconClassName = "",
      icon,
      ...props
    },
    ref,
  ) => {
    const inputId = useId();
    const hasError = helperText.length > 0;
    return (
      <div
        className={`flex flex-col mb-[0px] md:mb-[10px] relative ${editInput ? "w-full text-medium" : ""} ${containerClassname}`}
      >
        <label
          className={`${labelClassName} ${editInput && "text-bold"}`}
          htmlFor={inputId}
          style={{
            visibility: showLabel ? "visible" : "hidden",
          }}
        >
          {label}
          {props.required && (
            <span className="text-[#e35f5f]"> *</span>
          )}
        </label>
        <div
          className={`flex flex-row w-full items-center justify-start px-[12px] bg-[#F3F3F5] border border-[#0302134D] min-w-[340px] min-h-[36px] rounded-[8px] mb-[5px] focus-within:border-[#030213] focus-within:ring-1 focus-within:ring-[#030213] ${wrapperClassName} ${hasError ? "border-[#e35f5f] focus-within:border-[#e35f5f] focus-within:ring-[#e35f5f]" : ""} ${
            editInput
              ? "font-medium border-[none] bg-[#e9e9e9]"
              : ""
          }`}
        >
          {icon && (
            <span
              className={`material-symbols-outlined sm pr-[8px] ${iconClassName} `}
            >
              {icon}
            </span>
          )}
          <input
            id={inputId}
            ref={ref}
            className={`w-full bg-[none] border-0 outline-none ring-0 p-0 m-0 appearance-none -webkit-appearance-none shadow-none focus:outline-none focus-visible:outline-none focus:ring-0 ${inputClassName}`}
            type={type}
            name={name}
            {...props}
          />
        </div>
        {hasError && (
          <span className="text-[14px] text-bold text-[#e35f5f]">
            {helperText}
          </span>
        )}
      </div>
    );
  },
);
