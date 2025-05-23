"use client";
import React from "react";
import Logo from "@/public/images/auth/Logo.png";
import back from "@/public/images/auth/Group 1.png";
import Image from "next/image";

import { Loader2 } from "lucide-react";
import { useTranslate } from "@/config/useTranslation";
const LayoutLoader = () => {
  const { t } = useTranslate();

  return (
    <div
      className=" h-screen flex items-center justify-center  flex-col space-y-2"
      style={{
        backgroundImage: "linear-gradient(180deg, #0F60FF 0%, #000080 100%)",
      }}
    >
      <Image
        src={Logo}
        height={80}
        width={260}
        alt="logo"
        className="w-[260px] h-20"
        priority={true}
      />{" "}
    </div>
  );
};

export default LayoutLoader;
