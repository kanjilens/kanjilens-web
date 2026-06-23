import { useState, type ChangeEvent } from "react";

type ControlledCheckboxLabelProps<
  T extends string | number,
> = {
  item: T;
  label?: React.ReactNode;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

function ControlledCheckboxLabel<
  T extends string | number,
>({
  item,
  label,
  onChange,
}: ControlledCheckboxLabelProps<T>) {
  const [checked, setChecked] = useState(false);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setChecked(event.target.checked);
    onChange?.(event);
  };
  return (
    <label className="flex items-center text-white mb-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        className="form-checkbox h-5 w-5 text-[#6B40E3] bg-[#42397B] border-gray-400 rounded focus:ring-[#6B40E3]"
      />
      <span className="ml-2">{label ?? item}</span>
    </label>
  );
}

export default ControlledCheckboxLabel;
