"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Icon } from "@iconify/react";
import { useTranslate } from "@/config/useTranslation";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { DialogContent } from "@/components/ui/dialog";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const tableRowVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.3,
    },
  }),
};

// Reusable component with animation
const DetailItem: React.FC<{ label: string; value: string | number }> = ({
  label,
  value,
}) => (
  <motion.li
    className="flex flex-row gap-6 items-center"
    variants={itemVariants}
  >
    <span className="text-sm text-default-900 font-medium w-[40%]">
      {label}:
    </span>
    <span className="text-default-500 dark:text-white font-semibold w-[55%]">
      {value}
    </span>
  </motion.li>
);

interface ViewUserData {
  row: any;
}

const ViewMore: React.FC<ViewUserData> = ({ row }) => {
  const { t } = useTranslate();

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
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            size="icon"
            variant="outline"
            className="h-7 w-7"
            color="secondary"
          >
            <Icon icon="heroicons:eye" className="h-4 w-4" />
          </Button>
        </motion.div>
      </DialogTrigger>

      <AnimatePresence>
        <DialogContent size="2xl" className="h-fit" forceMount>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="h-full"
          >
            <DialogHeader>
              <motion.div variants={itemVariants}>
                <DialogTitle className="font-bold text-2xl">
                  {t("Details of “Service Provider Name”")}
                </DialogTitle>
              </motion.div>
            </DialogHeader>

            <Tabs defaultValue="information">
              <motion.div variants={itemVariants}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="information">
                    {t("Basic information")}
                  </TabsTrigger>
                  <TabsTrigger value="Details">
                    {t("Details of the services provided")}
                  </TabsTrigger>
                </TabsList>
              </motion.div>

              <TabsContent value="information">
                <motion.div className="space-y-4" variants={containerVariants}>
                  <motion.div
                    className="flex flex-row justify-around items-center"
                    variants={itemVariants}
                  >
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
                  </motion.div>

                  <motion.div
                    className="flex flex-row justify-around items-center"
                    variants={itemVariants}
                  >
                    <div className="flex flex-row gap-2 justify-between w-[45%] items-center">
                      <span className="text-gray-400">Name</span>
                      <span className="font-medium">{t("Email")}</span>
                    </div>
                    <div className="flex flex-row gap-2 justify-between w-[45%] items-center">
                      <span className="text-gray-400">Name</span>
                      <span className="font-medium">{t("City")}</span>
                    </div>
                  </motion.div>
                </motion.div>
              </TabsContent>

              <TabsContent value="Details">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                >
                  <motion.table
                    className="min-w-full border text-sm text-left text-gray-500"
                    variants={fadeIn}
                  >
                    <motion.thead
                      className="bg-gray-100 text-gray-700 uppercase text-xs"
                      variants={itemVariants}
                    >
                      <tr>
                        <th className="px-4 py-2">#</th>
                        <th className="px-4 py-2">{t("Service Name")}</th>
                        <th className="px-4 py-2">{t("Number of requests")}</th>
                        <th className="px-4 py-2">{t("Price")}</th>
                        <th className="px-4 py-2">{t("status")}</th>
                        <th className="px-4 py-2">{t("Date added")}</th>
                      </tr>
                    </motion.thead>
                    <motion.tbody>
                      {rows?.original?.services?.map(
                        (service: any, index: number) => (
                          <motion.tr
                            key={index}
                            className="border-b"
                            variants={tableRowVariants}
                            custom={index}
                            whileHover={{
                              backgroundColor: "rgba(0, 0, 0, 0.02)",
                            }}
                          >
                            <td className="px-4 py-2 font-medium">
                              {index + 1}
                            </td>
                            <td className="px-4 py-2">{service.name || "-"}</td>
                            <td className="px-4 py-2">
                              {service.description || "-"}
                            </td>
                            <td className="px-4 py-2">
                              {service.price || "-"}
                            </td>
                            <td className="px-4 py-2">
                              {service.duration || "-"}
                            </td>
                            <td className="px-4 py-2">
                              {service.status || "-"}
                            </td>
                          </motion.tr>
                        )
                      )}
                    </motion.tbody>
                  </motion.table>
                </motion.div>
              </TabsContent>
            </Tabs>

            <DialogFooter>
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              ></motion.div>
            </DialogFooter>
          </motion.div>
        </DialogContent>
      </AnimatePresence>
    </Dialog>
  );
};

export default ViewMore;
