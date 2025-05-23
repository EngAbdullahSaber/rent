"use client";
import React from "react";
import { useSidebar, useThemeStore } from "@/store";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useTranslate } from "@/config/useTranslation";
// import Logo from "@/public/images/auth/LawyerLogo.png";

const MenuBar = ({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}) => {
  const { t, loading, error } = useTranslate();

  return (
    <button
      className="relative group  disabled:cursor-not-allowed opacity-50"
      onClick={() => setCollapsed(!collapsed)}
    >
      <div>
        <div
          className={cn(
            "flex flex-col justify-between w-[20px] h-[16px] transform transition-all duration-300 origin-center overflow-hidden",
            {
              "-translate-x-1.5 rotate-180": collapsed,
            }
          )}
        >
          <div
            className={cn(
              "bg-card-foreground h-[2px] transform transition-all duration-300 origin-left delay-150",
              {
                "rotate-[42deg] w-[11px]": collapsed,
                "w-7": !collapsed,
              }
            )}
          ></div>
          <div
            className={cn(
              "bg-card-foreground h-[2px] w-7 rounded transform transition-all duration-300",
              {
                "translate-x-10": collapsed,
              }
            )}
          ></div>
          <div
            className={cn(
              "bg-card-foreground h-[2px] transform transition-all duration-300 origin-left delay-150",
              {
                "-rotate-[43deg] w-[11px]": collapsed,
                "w-7": !collapsed,
              }
            )}
          ></div>
        </div>
      </div>
    </button>
  );
};

type VerticalHeaderProps = {
  handleOpenSearch: () => void;
};
const VerticalHeader: React.FC<VerticalHeaderProps> = ({
  handleOpenSearch,
}) => {
  const { collapsed, setCollapsed, subMenu, sidebarType } = useSidebar();
  const { layout } = useThemeStore();
  const isDesktop = useMediaQuery("(min-width: 1280px)");
  const isMobile = useMediaQuery("(min-width: 768px)");
  let LogoContent = null;
  let menuBarContent = null;
  let searchButtonContent = null;
  const { t, loading, error } = useTranslate();

  const MainLogo = (
    <Link href="/dashboard" className=" text-primary ">
      {/* <Image
        src={Logo}
        height={32}
        width={32}
        alt="logo"
        className="w-8 h-8"
        priority={true}
      />{" "} */}
    </Link>
  );
  const SearchButton = (
    <div>
      {/* <button
        type="button"
        className=" inline-flex  gap-2 items-center text-default-600 text-sm"
        onClick={handleOpenSearch}
      >
        <span>
          <Search className=" h-4 w-4" />
        </span>
        <span className=" md:block hidden"> {t("Search")}</span>
      </button> */}
    </div>
  );
  if (layout === "semibox" && !isDesktop) {
    LogoContent = MainLogo;
  }
  if (
    layout === "vertical" &&
    !isDesktop &&
    isMobile &&
    sidebarType === "module"
  ) {
    LogoContent = MainLogo;
  }
  if (layout === "vertical" && !isDesktop && sidebarType !== "module") {
    LogoContent = MainLogo;
  }

  // menu bar content condition
  if (isDesktop && sidebarType !== "module") {
    menuBarContent = (
      <MenuBar collapsed={collapsed} setCollapsed={setCollapsed} />
    );
  }
  if (sidebarType === "module") {
    menuBarContent = (
      <MenuBar collapsed={collapsed} setCollapsed={setCollapsed} />
    );
  }
  if (sidebarType === "classic") {
    menuBarContent = null;
  }
  if (subMenu && isDesktop) {
    menuBarContent = null;
  }
  if (sidebarType === "module" && isMobile) {
    searchButtonContent = SearchButton;
  }
  if (sidebarType === "classic" || sidebarType === "popover") {
    searchButtonContent = SearchButton;
  }
  return (
    <>
      <div className="flex items-center md:gap-6 gap-3">
        {LogoContent}
        {menuBarContent}
        {searchButtonContent}
      </div>
    </>
  );
};

export default VerticalHeader;
