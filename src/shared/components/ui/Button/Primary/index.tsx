export type GenericPrimaryButtonProps = {
  onClick?: () => void;
  to?: string;
  hasLineGradient?: boolean;
  text: string;
  className?: string;
  as?: React.ElementType;
};

const GenericPrimaryButton: React.FC<
  GenericPrimaryButtonProps
> = ({
  onClick,
  to,
  hasLineGradient = false,
  text,
  className = "",
  as: Component = "button",
}) => {
  const stateStyle =
    "disabled:bg-[#0D9488]/70 disabled:!text-white/75 disabled:shadow-none disabled:cursor-not-allowed hover:bg-[#0b7d74] active:bg-[#0a6a62]";
  const breakPointStyle =
    "lg:min-h-[48px] lg:text-[14px] lg:rounded-[14px]";
  const animationStyle =
    "transition-colors duration-150 ease-in-out cursor-pointer";

  const buttonStyle = `z-10 bg-[#0D9488] border border-[#F0F4FF] text-white py-2 m-3 px-6 rounded-4xl font-medium block ${animationStyle} ${breakPointStyle} ${stateStyle} ${className}`;

  const content = (
    <Component
      onClick={onClick}
      className={buttonStyle}
      {...(to ? { to } : {})}
    >
      {text}
    </Component>
  );

  return (
    <div
      className={`flex items-center justify-center w-full ${hasLineGradient ? "relative  my-8" : ""}`}
    >
      {hasLineGradient && (
        <div className="absolute inset-y-5 w-full h-px bg-[radial-gradient(#ffffff_30%,_#2a254b_70%)] opacity-50"></div>
      )}
      {content}
    </div>
  );
};

export default GenericPrimaryButton;
