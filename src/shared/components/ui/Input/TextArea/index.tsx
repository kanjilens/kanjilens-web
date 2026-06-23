import {
  forwardRef,
  type InputHTMLAttributes,
  useId,
} from "react";

type InputProps =
  InputHTMLAttributes<HTMLTextAreaElement> & {
    label?: string;
    error?: string;
    helperText?: string;
    editInput?: boolean;
  };

export const TextArea = forwardRef<
  HTMLTextAreaElement,
  InputProps
>(
  (
    { name = "", label = "", helperText = "", ...props },
    ref,
  ) => {
    const inputId = useId();
    const hasError = helperText.length > 0;
    return (
      <div className="flex flex-col mb-[0px] md:mb-[10px]">
        <label
          className={`text-[14px] mb-1 ${props.required && "text-[14px] h-fit mb-1 after:content-['*'] after:text-red-500 after:ml-1"}`}
          htmlFor={inputId}
        >
          {label}
        </label>
        <textarea
          id={inputId}
          className={`w-full h-[200px] bg-[#e9e9e9] rounded-[15px] p-[10px] mb-[5px] font-bold ${hasError ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
          name={name}
          ref={ref}
          {...props}
        />
        {hasError && (
          <span className="text-red-500">{helperText}</span>
        )}
      </div>
    );
  },
);
