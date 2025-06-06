"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslate } from "@/config/useTranslation";
import { motion, AnimatePresence } from "framer-motion";
import BreadcrumbComponent from "../../(category-mangement)/shared/BreadcrumbComponent";
import CreateServicesProviderButton from "./CreateBannerButton";
import Link from "next/link";
import Image from "next/image";
import DeleteConfirmationDialog from "../../shared/DeleteConfirmationDialog";
import UpdateBannerButton from "./UpdateBannerButton";

const Page = () => {
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
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const titleAnimation = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 120,
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
        stiffness: 150,
        damping: 10,
        delay: 0.2,
      },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 },
    },
  };

  const bannerItem = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        type: "spring",
        stiffness: 120,
        damping: 10,
      },
    }),
    hover: {
      scale: 1.03,
      y: -5,
      transition: {
        duration: 0.2,
        type: "spring",
        stiffness: 200,
      },
    },
  };

  const overlayAnimation = {
    hidden: { opacity: 0 },
    hover: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  const textAnimation = {
    hidden: { y: 20, opacity: 0 },
    hover: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.15,
        duration: 0.3,
      },
    },
  };

  const deleteButtonAnimation = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.3,
        duration: 0.3,
      },
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.2 },
    },
  };

  const data = [
    {
      id: 1,
      imgs: "https://api.venuat.com/uploads/venues/omar-rodriguez-XYuNwlYtfLI-unsplash.jpg",
      name: "name",
      link: "#",
    },
    // ... other data items
  ];

  const handleDelete = async (id: any) => {
    // Your delete logic here
    return true;
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={container}
      className="space-y-5 p-4"
    >
      {/* Header Section */}
      <div className="flex sm:flex-row xs:gap-5 xs:flex-col w-full justify-between items-center my-5">
        <motion.div variants={item}>
          <motion.div
            variants={titleAnimation}
            initial="hidden"
            animate="visible"
            className="text-default-900 text-2xl font-bold my-2"
          >
            {t("Management of Banners")}
          </motion.div>
          <motion.div variants={item}>
            <BreadcrumbComponent header={"Banners"} body={"Banner"} />
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
          <CreateServicesProviderButton setFlag={setFlag} flag={flag} />
        </motion.div>
      </div>

      {/* Banners Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <AnimatePresence mode="wait">
          {data.map((item, index) => (
            <motion.div
              key={item.id}
              custom={index}
              variants={bannerItem}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="relative group"
              layout
            >
              <Link href={item.link} passHref>
                <motion.div className="flex flex-col h-60 relative w-full rounded-xl shadow-lg overflow-hidden bg-white">
                  <motion.div
                    variants={deleteButtonAnimation}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    className="absolute top-3 right-3 z-20"
                  >
                    <DeleteConfirmationDialog
                      title="Deleting Banner"
                      description="Are You Sure For Delete This Banner?"
                      handleDelete={handleDelete}
                      id={item.id}
                      class="  text-white rounded-full  transition-colors"
                      buttonShape={true}
                    />
                  </motion.div>
                  <motion.div
                    variants={deleteButtonAnimation}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    className="absolute top-3 left-3 z-20"
                  >
                    <UpdateBannerButton
                      banner={item}
                      classes="text-white rounded-full transition-colors"
                      setFlag={setFlag}
                      flag={flag}
                    />
                  </motion.div>

                  <Image
                    src={item.imgs}
                    alt={`Banner ${item.id}`}
                    fill
                    className="object-cover"
                    quality={85}
                  />

                  <motion.div
                    className="absolute inset-0 bg-black/30 flex items-center justify-center"
                    initial="hidden"
                    whileHover="hover"
                    variants={overlayAnimation}
                  >
                    <motion.span
                      className="text-lg text-center font-semibold text-white px-4 py-2 bg-black/50 rounded-lg backdrop-blur-sm"
                      variants={textAnimation}
                    >
                      {item.name}
                    </motion.span>
                  </motion.div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default Page;
