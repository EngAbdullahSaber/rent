"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Icon } from "@iconify/react";
import { useTranslate } from "@/config/useTranslation";
import { useParams } from "next/navigation";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// A reusable component to display a list of details
const DetailItem: React.FC<{ label: string; value: string | number }> = ({
  label,
  value,
}) => (
  <li className="flex flex-row gap-6 items-center">
    <span className="text-sm text-default-900 font-medium w-[40%]">
      {label}:
    </span>
    <span className="text-default-500 dark:text-white font-semibold w-[55%]">
      {value}
    </span>
  </li>
);

interface ViewUserData {
  row: any;
}

const ViewMore: React.FC<ViewUserData> = ({ row }) => {
  const { t, loading, error } = useTranslate();
  const { lang } = useParams();

  // const renderData = () => {
  //   const lawyerData = row?.original;

  //   return (
  //     <>
  //       <h3 className="font-semibold text-lg">{t("Offer Info")}</h3>
  //       <ul className="md:grid grid-cols-2 !mt-5 gap-2 space-y-2 md:space-y-0">
  //         <DetailItem label={t("Id")} value={lawyerData?.id || "-"} />
  //         <DetailItem
  //           label={t("title")}
  //           value={
  //             lang == "en"
  //               ? lawyerData?.title?.en
  //               : lawyerData?.title?.ar || "-"
  //           }
  //         />
  //         <DetailItem
  //           label={t("content")}
  //           value={
  //             lang == "en"
  //               ? lawyerData?.content?.en
  //               : lawyerData?.content?.ar || "-"
  //           }
  //         />
  //         <DetailItem label={t("slug")} value={lawyerData?.slug || "-"} />

  //         <DetailItem
  //           label={t("meta title")}
  //           value={
  //             lang == "en"
  //               ? lawyerData?.meta_title?.en
  //               : lawyerData?.meta_title?.ar || "-"
  //           }
  //         />
  //         <DetailItem
  //           label={t("meta description")}
  //           value={
  //             lang == "en"
  //               ? lawyerData?.meta_description?.en
  //               : lawyerData?.meta_description?.ar || "-"
  //           }
  //         />
  //         <DetailItem
  //           label={t("meta keywords")}
  //           value={
  //             lang == "en"
  //               ? lawyerData?.meta_keywords?.en
  //               : lawyerData?.meta_keywords?.ar || "-"
  //           }
  //         />
  //         <li className="flex flex-row gap-6 items-center">
  //           <span className="text-sm text-default-900 font-medium w-[40%]">
  //             {t("Image")}:
  //           </span>
  //           <span className="text-default-500 dark:text-white font-semibold w-[55%]">
  //             <Avatar className="w-14 h-14">
  //               <AvatarImage
  //                 className="w-14 h-14"
  //                 src={`${lawyerData.image_url}`}
  //               />
  //               <AvatarFallback>image</AvatarFallback>
  //             </Avatar>{" "}
  //           </span>
  //         </li>
  //         <DetailItem
  //           label={t("Image Alternative")}
  //           value={lawyerData?.image_alt || "-"}
  //         />

  //         <DetailItem
  //           label={t("Date Of Create Career")}
  //           value={
  //             new Date(lawyerData?.created_at).toLocaleDateString("en-GB") ||
  //             "-"
  //           }
  //         />
  //       </ul>
  //     </>
  //   );
  // };
  const rows = {
    original: {
      services: [
        {
          name: "Website Design",
          description: "Professional website design tailored to your brand.",
          price: "$500",
          duration: "5 days",
          status: "Active",
        },
        {
          name: "SEO Optimization",
          description: "Improve your search engine rankings.",
          price: "$300",
          duration: "3 days",
          status: "Inactive",
        },
        {
          name: "Logo Design",
          description: "Custom logo design with 3 revisions.",
          price: "$150",
          duration: "2 days",
          status: "Active",
        },
      ],
    },
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="h-7 w-7"
          color="secondary"
        >
          <Icon icon="heroicons:eye" className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent size="2xl" className="h-fit">
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl">
            {t("Details of “Service Provider Name”")}
          </DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="information">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="information">
              {t("Basic information")}
            </TabsTrigger>
            <TabsTrigger value="Details">
              {t("Details of the services provided")}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="information">
            <div className="flex flex-row justify-around items-center">
              <div className="flex flex-row gap-2 justify-between w-[45%] items-center">
                <span className="text-gray-400">Name</span>
                <span className="font-medium">{t("Status")}</span>
              </div>
              <div className="flex flex-row gap-2 justify-between w-[45%] items-center">
                <span className="text-gray-400">Name</span>
                <span className="font-medium">
                  {t("Service Provider Name")}
                </span>
              </div>
            </div>
            <div className="flex flex-row justify-around items-center">
              <div className="flex flex-row gap-2 justify-between  w-[45%] items-center">
                <span className="text-gray-400">Name</span>
                <span className="font-medium">{t("Email")}</span>
              </div>
              <div className="flex flex-row gap-2 justify-between w-[45%] items-center">
                <span className="text-gray-400">Name</span>
                <span className="font-medium">{t("City")}</span>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="Details">
            <table className="min-w-full border text-sm text-left text-gray-500">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-4 py-2">#</th>
                  <th className="px-4 py-2">{t("Service Name")}</th>
                  <th className="px-4 py-2">{t("Number of requests")}</th>
                  <th className="px-4 py-2">{t("Price")}</th>
                  <th className="px-4 py-2">{t("status")}</th>
                  <th className="px-4 py-2">{t("Date added")}</th>
                </tr>
              </thead>
              <tbody>
                {rows?.original?.services?.map(
                  (service: any, index: number) => (
                    <tr key={index} className="border-b">
                      <td className="px-4 py-2 font-medium">{index + 1}</td>
                      <td className="px-4 py-2">{service.name || "-"}</td>
                      <td className="px-4 py-2">
                        {service.description || "-"}
                      </td>
                      <td className="px-4 py-2">{service.price || "-"}</td>
                      <td className="px-4 py-2">{service.duration || "-"}</td>
                      <td className="px-4 py-2">{service.status || "-"}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>{" "}
          </TabsContent>
        </Tabs>{" "}
        <DialogFooter>
          <DialogClose asChild>footer content</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewMore;
