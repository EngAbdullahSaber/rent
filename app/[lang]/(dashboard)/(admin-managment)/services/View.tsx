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
import { motion, AnimatePresence } from "framer-motion";

const ViewMore: React.FC<ViewUserData> = ({ row }) => {
  const { t, loading, error } = useTranslate();
  const { lang } = useParams();

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
        <DialogContent size="3xl" className="h-fit">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <DialogHeader>
              <motion.div variants={itemVariants}>
                <DialogTitle className="font-bold text-2xl">
                  {t("Details of “Customer name”")}
                </DialogTitle>
              </motion.div>
            </DialogHeader>

            <motion.div
              className="flex flex-row justify-between items-center"
              variants={itemVariants}
            >
              <div className="flex flex-col gap-2 justify-between w-[32%] items-center">
                <span className="font-medium">{t("order number")}</span>
                <span className="text-gray-400">434</span>
              </div>
              <div className="flex flex-col gap-2 justify-between w-[32%] items-center">
                <span className="font-medium">{t("Provider name")}</span>
                <span className="text-gray-400">Name</span>
              </div>
              <div className="flex flex-col gap-2 justify-between w-[32%] items-center">
                <span className="font-medium">{t("Customer name")}</span>
                <span className="text-gray-400">Name</span>
              </div>
            </motion.div>

            <motion.hr className="my-4" variants={fadeIn} />

            <motion.div
              className="flex flex-row justify-around items-center"
              variants={itemVariants}
            >
              <div className="flex flex-col gap-2 justify-between w-[32%] items-center">
                <span className="font-medium">{t("Services")}</span>
                <span className="text-gray-400">434</span>
              </div>
              <div className="flex flex-col gap-2 justify-between w-[32%] items-center">
                <span className="font-medium">{t("Price")}</span>
                <span className="text-gray-400">Name</span>
              </div>
              <div className="flex flex-col gap-2 justify-between w-[32%] items-center">
                <span className="font-medium">{t("Order date")}</span>
                <span className="text-gray-400">Name</span>
              </div>
            </motion.div>

            <motion.hr className="my-2" variants={fadeIn} />

            <DialogFooter>
              <motion.div
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
