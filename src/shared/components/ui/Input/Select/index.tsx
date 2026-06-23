import {
  forwardRef,
  type PropsWithChildren,
  type SelectHTMLAttributes,
  useId,
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";

type InputProps =
  SelectHTMLAttributes<HTMLSelectElement> & {
    label: string;
    showLabel?: boolean;
    error?: string;
    helperText?: string;
    fileType?: string;
    hiddenDefault?: boolean;
    editInput?: boolean;
    defaultOption?: string;
    defaultValue?: string;
    width?: string;
  };

export const Select = forwardRef<
  HTMLSelectElement,
  InputProps & PropsWithChildren
>(
  (
    {
      children,
      name = "",
      defaultOption = "Selecione uma opção",
      defaultValue = "",
      hiddenDefault = false,
      showLabel = true,
      label = "",
      helperText = "",
      ...props
    },
    ref,
  ) => {
    const inputId = useId();
    const listboxId = `${inputId}-listbox`;

    const hasError = helperText.length > 0;

    const options = (
      Array.isArray(children) ? children : [children]
    )
      .flat()
      .filter(Boolean) as any[];

    const parsedOptions = options.map((c) => ({
      value: c.props?.value ?? "",
      label:
        c.props?.children ?? String(c.props?.value ?? ""),
      disabled: c.props?.disabled ?? false,
    }));

    const navigableOptions = useMemo(
      () =>
        hiddenDefault
          ? parsedOptions
          : [
              {
                value: defaultValue ?? "",
                label: defaultOption ?? "",
                disabled: false,
              },
              ...parsedOptions,
            ],
      [
        hiddenDefault,
        parsedOptions,
        defaultValue,
        defaultOption,
      ],
    );

    const controlledValue = props.value as
      | string
      | undefined;

    const [open, setOpen] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const [value, setValue] = useState<string>(
      controlledValue ?? defaultValue ?? "",
    );

    const containerRef = useRef<HTMLDivElement | null>(
      null,
    );
    const buttonRef = useRef<HTMLButtonElement | null>(
      null,
    );
    const listboxRef = useRef<HTMLUListElement | null>(
      null,
    );

    useEffect(() => {
      if (controlledValue !== undefined) {
        setValue(controlledValue);
      }
    }, [controlledValue]);

    useEffect(() => {
      function onDoc(e: MouseEvent) {
        if (!containerRef.current) return;

        if (
          !containerRef.current.contains(e.target as Node)
        ) {
          setOpen(false);
          setFocusedIndex(-1);
        }
      }

      document.addEventListener("mousedown", onDoc);

      return () => {
        document.removeEventListener("mousedown", onDoc);
      };
    }, []);

    useEffect(() => {
      if (open) {
        requestAnimationFrame(() => {
          listboxRef.current?.focus();
        });
      } else {
        buttonRef.current?.focus();
      }
    }, [open]);

    function handleSelect(v: string) {
      setValue(v);
      setOpen(false);
      setFocusedIndex(-1);

      if (props.onChange) {
        const ev = {
          target: {
            name,
            value: v,
          },
        } as unknown as React.ChangeEvent<HTMLSelectElement>;

        props.onChange(ev);
      }
    }

    function openMenu() {
      setOpen(true);

      const currentIndex = navigableOptions.findIndex(
        (o) => o.value === value,
      );

      setFocusedIndex(currentIndex >= 0 ? currentIndex : 0);
    }

    function closeMenu() {
      setOpen(false);
      setFocusedIndex(-1);
    }

    const moveFocus = useCallback(
      (nextIndex: number) => {
        let index = nextIndex;

        while (
          index >= 0 &&
          index < navigableOptions.length &&
          navigableOptions[index].disabled
        ) {
          index += nextIndex > focusedIndex ? 1 : -1;
        }

        if (index >= 0 && index < navigableOptions.length) {
          setFocusedIndex(index);
        }
      },
      [focusedIndex, navigableOptions],
    );

    function handleButtonKeyDown(
      e: React.KeyboardEvent<HTMLButtonElement>,
    ) {
      switch (e.key) {
        case "ArrowDown":
        case "Enter":
        case " ": {
          e.preventDefault();

          if (!open) {
            openMenu();
            return;
          }

          moveFocus(focusedIndex + 1);
          break;
        }

        case "ArrowUp": {
          e.preventDefault();

          if (!open) {
            openMenu();
            return;
          }

          moveFocus(focusedIndex - 1);
          break;
        }

        case "Escape":
          closeMenu();
          break;
      }
    }

    function handleMenuKeyDown(
      e: React.KeyboardEvent<HTMLUListElement>,
    ) {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          moveFocus(focusedIndex + 1);
          break;

        case "ArrowUp":
          e.preventDefault();
          moveFocus(focusedIndex - 1);
          break;

        case "Home":
          e.preventDefault();
          moveFocus(0);
          break;

        case "End":
          e.preventDefault();
          moveFocus(navigableOptions.length - 1);
          break;

        case "Enter":
        case " ": {
          e.preventDefault();

          const opt = navigableOptions[focusedIndex];

          if (opt && !opt.disabled) {
            handleSelect(opt.value);
          }

          break;
        }

        case "Escape":
          e.preventDefault();
          closeMenu();
          break;

        case "Tab":
          closeMenu();
          break;
      }
    }

    const selectedLabel =
      navigableOptions.find((o) => o.value === value)
        ?.label ?? (hiddenDefault ? "" : defaultOption);

    return (
      <div
        className="flex flex-col mb-[0px] md:mb-[10px] h-fit lg:min-h-[62px] relative"
        ref={containerRef}
      >
        <label
          className="text-medium"
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

        <select
          id={inputId}
          name={name}
          value={value}
          onChange={(e) => handleSelect(e.target.value)}
          ref={ref}
          className="hidden"
          aria-hidden="true"
          tabIndex={-1}
        />

        <button
          ref={buttonRef}
          type="button"
          onClick={() => (open ? closeMenu() : openMenu())}
          onKeyDown={handleButtonKeyDown}
          className={`w-[180px] mb-[5px] h-[36px] bg-[#FFFFFF] cursor-pointer rounded-[8px] px-[12px] text-medium flex items-center justify-between border border-[#E5E7EB] hover:bg-[#f5f5f5] hover:border-[#d0d0d0] transition-colors duration-150 ${
            hasError ? "border-[#e35f5f]" : ""
          }`}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listboxId}
        >
          <span className="truncate">{selectedLabel}</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className={`ml-2 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          >
            <g opacity="0.5">
              <path
                d="M4 6l4 4 4-4"
                stroke="#717182"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </button>

        {open && (
          <ul
            ref={listboxRef}
            id={listboxId}
            className="absolute top-14 z-50 mt-2 w-[180px] max-h-[200px] overflow-auto bg-white rounded-[8px] shadow-md border border-[#e0e0e0] py-1"
            role="listbox"
            tabIndex={0}
            aria-labelledby={inputId}
            aria-activedescendant={
              focusedIndex >= 0
                ? `${inputId}-option-${focusedIndex}`
                : undefined
            }
            onKeyDown={handleMenuKeyDown}
          >
            {navigableOptions.map((opt, index) => (
              <li
                key={opt.value + "-" + index}
                id={`${inputId}-option-${index}`}
                role="option"
                aria-selected={value === opt.value}
                aria-disabled={opt.disabled}
                className={`px-3 py-2 text-medium flex flex-row  items-center justify-between ${
                  opt.disabled
                    ? "text-gray-400 cursor-not-allowed"
                    : "cursor-pointer hover:bg-[#e9ebef]"
                } ${focusedIndex === index ? "bg-[#e9ebef]" : ""}`}
                onMouseEnter={() => setFocusedIndex(index)}
                onClick={() =>
                  !opt.disabled && handleSelect(opt.value)
                }
              >
                {opt.label}
                {opt.value === value && (
                  <span className="material-symbols-outlined sm2 text-[#80808f]">
                    check
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}

        {hasError && (
          <span className="text-[14px] text-bold text-[#e35f5f]">
            {helperText}
          </span>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";
