"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslate } from "@/config/useTranslation";
import TableData from "./TableData";
import { AnimatePresence, motion } from "framer-motion";
import BreadcrumbComponent from "../../(category-mangement)/shared/BreadcrumbComponent";
import CreateCategoryButton from "./CreateCategoryButton";

const page = () => {
  const { t } = useTranslate();
  const [flag, setFlag] = useState(false);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const titleAnimation = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 0.8,
      },
    },
  };

  const buttonAnimation = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        delay: 0.2,
      },
    },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  const cardAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.4,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={container}
      className="space-y-5"
    >
      <div className="flex sm:flex-row xs:gap-5 xs:flex-col w-full justify-between items-center my-5">
        <motion.div variants={item}>
          <motion.div
            variants={titleAnimation}
            initial="hidden"
            animate="visible"
            className="text-default-900 text-2xl font-bold my-2"
          >
            {t("Management of Categories")}
          </motion.div>
          <motion.div variants={item}>
            <BreadcrumbComponent header={"Categories"} body={"Category"} />
          </motion.div>
        </motion.div>

        <motion.div
          variants={buttonAnimation}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
          className="flex sm:flex-row xs:flex-col gap-[10px] justify-between items-center"
        >
          <CreateCategoryButton setFlag={setFlag} flag={flag} />
        </motion.div>
      </div>

      <AnimatePresence>
        <motion.div variants={cardAnimation} initial="hidden" animate="visible">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>{t("Category Details")}</CardTitle>
            </CardHeader>
            <CardContent>
              <TableData setFlag={setFlag} flag={flag} />
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default page;
