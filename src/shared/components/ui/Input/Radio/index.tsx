import {
  forwardRef,
  type InputHTMLAttributes,
  useId,
} from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  first: boolean;
  firstLabel?: string;
  label?: string;
  error?: string;
  helperText?: string;
};

export const Radio = forwardRef<
  HTMLInputElement,
  InputProps
>(
  (
    {
      first,
      firstLabel,
      label = "",
      helperText = "",
      ...props
    },
    ref,
  ) => {
    const inputId = useId();
    const hasError = helperText.length > 0;
    return (
      <div className="flex flex-col mb-[0px] md:mb-[10px]">
        {first && (
          <label
            className={`text-[14px] mb-1 ${props.required && "text-[14px] h-fit mb-1 after:content-['*'] after:text-red-500 after:ml-1"}`}
          >
            {firstLabel}
          </label>
        )}
        <label htmlFor={inputId}>
          <input
            id={inputId}
            type="radio"
            ref={ref}
            {...props}
          />
          {label}
        </label>
        {hasError && <span>{helperText}</span>}
      </div>
    );
  },
);
