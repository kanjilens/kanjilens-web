import type { AuthPageRoutes } from "../types";

type AuthToggleProps = {
  selected: AuthPageRoutes;
  setSelected: (v: AuthPageRoutes) => void;
};

export const AuthToggle = ({
  selected,
  setSelected,
}: AuthToggleProps) => {
  return (
    <div className="relative bg-[#EEF2F1] rounded-[16px] flex items-center px-1 self-center w-full max-w-[382px] min-h-[44px]">
      <div
        aria-hidden
        className={
          "absolute top-1/2 -translate-y-1/2 left-1 p-[2px] h-[36px] bg-[#FFFFFF] rounded-[14px] shadow-[0px_1px_3px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-in-out"
        }
        style={{
          width: "calc(50% - 0.25rem)",
          transform:
            selected === "login"
              ? "translateX(0%)"
              : "translateX(calc(100%))",
        }}
      />

      <div className="relative z-10 flex w-full">
        <button
          type="button"
          onClick={() => setSelected("login")}
          className={`flex-1 text-[14px] min-h-[36px] h-full cursor-pointer rounded-[14px] flex items-center justify-center text-center transition-colors duration-300 ${
            selected === "login"
              ? "text-[#0F766E]"
              : "text-[#6B7280]"
          }`}
        >
          Entrar
        </button>
        <button
          type="button"
          onClick={() => setSelected("register")}
          className={`flex-1 text-[14px] min-h-[36px] cursor-pointer h-full rounded-[14px] flex items-center justify-center text-center transition-colors duration-300 ${
            selected === "register"
              ? "text-[#0F766E]"
              : "text-[#6B7280]"
          }`}
        >
          Criar conta
        </button>
      </div>
    </div>
  );
};
