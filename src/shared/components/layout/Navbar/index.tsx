import { Logo } from "@assets/index";
import { NavButton } from "@components/ui/Button/NavButton";
import { SimpleCard } from "@components/ui/Global/SimpleCard";
import { Typography } from "@components/ui/Typography";
import { useAuth } from "@features/iam/hooks/useAuth";
import { useState } from "react";

export const GuestNavbar = () => {
  return (
    <nav className="flex flex-row md:flex-col bg-[#077A7D] w-full lg:w-[45%] md:w-[40%] min-h-0 md:min-h-full items-center justify-between lg:justify-center p-4 sm:p-6 lg:p-[40px] gap-4 lg:gap-0">
      <div className="w-auto md:w-full text-white flex-shrink-0 lg:flex-1">
        <div className="flex flex-row w-full items-center">
          <div className="bg-[#FFFFFF26] rounded-[16px] w-[40px] h-[40px] sm:w-[48px] sm:h-[48px] flex justify-center items-center mr-3 flex-shrink-0">
            <span className="material-symbols-outlined text-[20px] sm:text-[24px]">
              import_contacts
            </span>
          </div>
          <div className="flex flex-col">
            <h3 className="text-sm sm:text-lg lg:text-[20px] font-normal leading-tight">
              漢字レンズ
            </h3>
            <p className="text-[10px] sm:text-sm text-white/80 font-normal leading-tight">
              Kanji Lens
            </p>
          </div>
        </div>
      </div>
      <div className="hidden md:flex justify-start max-w-[576px] content-center bg-[#077A7D] flex-[1] flex-col gap-4 sm:gap-[8px] h-full items-start w-full lg:w-full">
        <div className="flex flex-col gap-[12px] lg:gap-[20px] mb-0 lg:mb-[32px] w-full">
          <Typography
            as="h2"
            className="text-[#FFFFFF] text-[16px] sm:text-[30px] md:text-[30px] lg:text-[46px] xl:text-[72px] leading-tight xl:leading-[72px]"
          >
            覚える
          </Typography>
          <Typography
            as="h2"
            className="text-[#FFFFFF] max-w-[512px] text-[14px] sm:text-[20px] md:text-[24px] xl:text-[36px] xl:leading-[48px]"
          >
            Entre para continuar descobrindo leituras,
            traços e histórias por trás de cada kanji.
          </Typography>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3 w-full">
          <SimpleCard kanji="学" meaning="estudo" />
          <SimpleCard kanji="光" meaning="luz" />
          <SimpleCard kanji="縁" meaning="conexão" />
        </div>
      </div>
    </nav>
  );
};

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { isAuthenticated, logout } = useAuth();

  const navItems = [
    {
      link: "/home",
      icon: "home",
      label: "Home",
      disabled: false,
    },
    {
      link: "/discovered",
      icon: "import_contacts",
      label: "Kanjis Descobertos",
      disabled: false,
    },
    {
      link: "/library",
      icon: "search",
      label: "Enciclopédia",
      disabled: true,
    },
    {
      link: "/settings",
      icon: "settings",
      label: "Configurações",
      disabled: true,
    },
  ];

  return (
    <div className="relative md:h-full">
      <header className="md:hidden fixed top-0 left-0 flex h-[57px] flex-row justify-between items-center px-4 right-0 z-35 bg-[#FFFFFF] text-white">
        <div className="flex items-center justify-between z-50">
          <button
            type="button"
            className="text-black te p-2 rounded-lg"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Abrir menu"
          >
            <Logo />
          </button>
          <div className="flex-1 ml-1">
            <div className="flex self-start">
              <h3 className="text-sm font-normal text-[16px] text-[#0F766E]">
                漢字レンズ
              </h3>
            </div>
          </div>
        </div>
        {isAuthenticated && (
          <button
            type="button"
            className="h-fit flex items-center w-6"
            onClick={() => logout()}
          >
            <span className="material-symbols-outlined text-[#6B7280] sm2">
              logout
            </span>
          </button>
        )}
      </header>

      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <nav
        className={`fixed md:relative flex flex-col min-w-[255px] h-full items-start justify-center bg-white md:bg-transparent z-40 transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="w-full">
          <div className="flex items-center justify-between z-50 md:hidden bg-white px-4 py-3 w-full border-b border-b-[#0000001A]">
            <button
              type="button"
              className="text-black te p-2 rounded-lg"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Abrir menu"
            >
              <Logo />
            </button>
            <div className="flex-1 ml-1">
              <div className="flex self-start">
                <h3 className="text-sm font-normal text-[16px] text-[#0F766E]">
                  漢字レンズ
                </h3>
              </div>
            </div>
          </div>
          <div className="hidden md:block bg-[#077A7D] w-full p-[24px] text-white">
            <div className="flex flex-row w-full ">
              <div className="flex flex-col">
                <h3 className="text-[20px] font-normal">
                  漢字レンズ
                </h3>
                <p className="text-sm text-white/80 font-normal">
                  Kanji Lens
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-[16px] sm:pt-[16px] flex flex-col gap-[8px] h-full items-start w-full border-r border-r-[#0000001A]">
          {navItems.map((item) => (
            <NavButton
              key={item.link}
              link={item.link}
              icon={item.icon}
              disabled={item.disabled}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </NavButton>
          ))}
        </div>
        {isAuthenticated && (
          <div className="w-full hidden md:flex text-[#6B7280] p-6 border border-[#0000001A]">
            <button
              type="button"
              onClick={() => logout()}
              className="flex w-full flex-row items-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-[#077A7D14] hover:text-[#077A7D] active:bg-[#077A7D26] active:text-[#077A7D]"
            >
              <span className="material-symbols-outlined sm2">
                logout
              </span>
              <Typography>Sair</Typography>
            </button>
          </div>
        )}
      </nav>
    </div>
  );
};
