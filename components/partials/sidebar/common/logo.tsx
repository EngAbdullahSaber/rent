import { websiteName } from "@/config/constants";
import { useSidebar } from "@/store";
import React from "react";
// import Logo from "@/public/images/auth/LawyerLogo.png";
import Image from "next/image";

const SidebarLogo = ({ hovered }: { hovered?: boolean }) => {
  const { sidebarType, setCollapsed, collapsed } = useSidebar();
  return (
    <div className="px-4 py-4 ">
      <div className=" flex items-center">
        <div className="flex flex-1 items-center gap-x-3  ">
          {/* <Image
            src={Logo}
            height={32}
            width={32}
            alt="logo"
            className="w-16 h-12"
            priority={true}
          />{" "} */}
          {/* {(!collapsed || hovered) && (
            // <div className="flex-1 block  text-xl text-primary  font-semibold">
            //   {websiteName}
            // </div>
          )} */}
        </div>
        {sidebarType === "classic" && (!collapsed || hovered) && (
          <div className="flex-none lg:block hidden">
            <div
              onClick={() => setCollapsed(!collapsed)}
              className={`h-4 w-4 border-[1.5px] border-default-900 dark:border-default-200 rounded-full transition-all duration-150
          ${
            collapsed
              ? ""
              : "ring-2 ring-inset ring-offset-4 ring-default-900  bg-default-900  dark:ring-offset-default-300"
          }
          `}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarLogo;
