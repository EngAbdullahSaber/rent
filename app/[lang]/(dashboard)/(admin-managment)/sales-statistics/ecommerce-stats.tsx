"use client";

import { CupBar, NoteIcon, CheckShape, Spam } from "@/components/svg";
import { useTranslate } from "@/config/useTranslation";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import image1 from "@/public/images/home/12 (2).png";
import image2 from "@/public/images/home/12 (1).png";
import image3 from "@/public/images/home/12 (4).png";
import image4 from "@/public/images/home/12 (3).png";
import Image from "next/image";
const EcommerceStats = () => {
  const { t } = useTranslate();

  const data = [
    {
      text: "Total Sales",
      image: image1,
      text1: "Sales progress",
      total: "42,750.98",
      color: "bg-[#0F60FF]",
      icon: <CupBar className="w-3.5 h-3.5" />,
    },
    {
      text: "Number of requests",
      total: "536,23,3",
      text1: "Submit requests",
      image: image2,

      color: "bg-[#0F60FF]",
      icon: <NoteIcon className="w-3.5 h-3.5" />,
    },
    {
      text: "Number of clients",
      image: image3,
      total: "234,1",
      text1: "Customer progress",
      color: "bg-[#0F60FF]",
      icon: <CheckShape className="w-3.5 h-3.5" />,
    },
    {
      text: "Number of service provider",
      image: image4,
      total: "332,34",
      text1: "Providers offer",
      color: "bg-[#0F60FF]",
      icon: <Spam className="w-3.5 h-3.5" />,
    },
  ];
  return (
    <>
      {data.map((item, index) => (
        <div
          key={`reports-state-${index}`}
          className={`flex flex-col gap-1.5 ${item.color}  p-4 rounded-sm overflow-hidden bg-primary/10  items-start relative before:absolute before:left-1/2 before:-translate-x-1/2 before:bottom-1 before:h-[2px] before:w-9 before:bg-primary/50 dark:before:bg-primary-foreground before:hidden `}
        >
          <Image src={item.image} alt="icon" width={64} height={64} />
          <span className="mt-3 text-lg text-[#040C18A3] dark:text-primary-foreground font-medium capitalize relative z-10">
            {t(item.text)}
          </span>{" "}
          <span
            className={`mt-3   ${
              index == 0
                ? "text-[#0F60FF]"
                : index == 1
                ? "text-[#0F60FF]"
                : index == 2
                ? "text-[#0F60FF]"
                : "text-[#0F60FF]"
            }  dark:text-primary-foreground text-3xl font-semibold capitalize relative z-10`}
          >
            {item.total}
          </span>
          <div className="flex items-center gap-1">
            <span className="text-sm font-semibold text-[#040C18A3]  dark:text-primary-foreground">
              {t(item.text1)}
            </span>{" "}
            <span
              className={`text-sm font-semibold ${
                index == 0
                  ? "text-[#0F60FF]"
                  : index == 1
                  ? "text-[#0F60FF]"
                  : index == 2
                  ? "text-[#0F60FF]"
                  : "text-[#0F60FF]"
              }  dark:text-primary-foreground`}
            >
              {item.total}
            </span>
            <Icon
              icon="heroicons:arrow-trending-up"
              className={`w-5 h-5 ${
                index == 0
                  ? "text-[#0F60FF]"
                  : index == 1
                  ? "text-[#0F60FF]"
                  : index == 2
                  ? "text-[#0F60FF]"
                  : "text-[#0F60FF]"
              } dark:text-primary-foreground`}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default EcommerceStats;
