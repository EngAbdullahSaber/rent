"use client";

import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslate } from "@/config/useTranslation";
import { motion, AnimatePresence } from "framer-motion";
import BreadcrumbComponent from "../../(category-mangement)/shared/BreadcrumbComponent";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HexColorPicker } from "react-colorful";

const Page = () => {
  const { t } = useTranslate();
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeColorPicker, setActiveColorPicker] = useState<string | null>(
    null
  );
  const [formData, setFormData] = useState({
    primaryColor: "#3b82f6",
    secondaryColor: "#10b981",
    backgroundColor: "#ffffff",
    textColor: "#1a1a1a",
    photo: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleColorChange = (color: string) => {
    if (activeColorPicker) {
      setFormData((prev) => ({ ...prev, [activeColorPicker]: color }));
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prev) => ({
          ...prev,
          photo: event.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Animation configurations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12,
        duration: 0.6,
      },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const buttonHover = {
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
      transition: { type: "spring", stiffness: 400 },
    },
    tap: { scale: 0.98 },
  };

  const cardHover = {
    hover: {
      y: -5,
      boxShadow: "0 15px 30px rgba(0,0,0,0.12)",
      transition: { type: "spring", stiffness: 300 },
    },
  };

  const handleSave = () => {
    console.log("Theme saved:", formData);
    setIsEditing(false);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-6 mx-auto max-w-6xl"
    >
      {/* Header Section */}
      <motion.div
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10"
        variants={fadeUp}
      >
        <div>
          <motion.h1
            className="text-3xl font-bold text-gray-900 dark:text-white mb-3"
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 12,
              delay: 0.1,
            }}
          >
            {t("Theme Customization")}
          </motion.h1>
          <motion.div variants={fadeIn}>
            <BreadcrumbComponent
              header={"Appearance"}
              body={"Theme Customization"}
            />
          </motion.div>
        </div>

        <motion.div
          className="flex gap-3"
          variants={fadeUp}
          transition={{ delay: 0.2 }}
        >
          {isEditing ? (
            <>
              <motion.div variants={fadeUp}>
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                  whileHover="hover"
                  whileTap="tap"
                  className="px-6 py-3 rounded-lg"
                >
                  {t("Cancel")}
                </Button>
              </motion.div>
              <motion.div variants={fadeUp}>
                <Button
                  onClick={handleSave}
                  whileHover="hover"
                  whileTap="tap"
                  className="px-6 py-3 rounded-lg bg-primary hover:bg-primary-dark"
                >
                  {t("Save Theme")}
                </Button>
              </motion.div>
            </>
          ) : (
            <motion.div variants={fadeUp}>
              <Button
                onClick={() => setIsEditing(true)}
                whileHover="hover"
                whileTap="tap"
                className="px-6 py-3 rounded-lg"
              >
                <Icon icon="heroicons:pencil" className="mr-2 h-5 w-5" />
                {t("Customize Theme")}
              </Button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {/* Form Card */}
      <AnimatePresence mode="wait">
        <motion.div variants={fadeUp} className="mb-10">
          <motion.div whileHover="hover" variants={cardHover}>
            <Card className="shadow-lg rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <CardHeader className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 p-6">
                <motion.div variants={fadeIn}>
                  <CardTitle className="text-xl font-semibold">
                    {t("Theme Settings")}
                  </CardTitle>
                </motion.div>
              </CardHeader>
              <CardContent className="p-6">
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {/* Color Fields - First Column */}
                  <div className="space-y-8">
                    {[
                      {
                        label: "Primary Color",
                        field: "primaryColor",
                        type: "color",
                        icon: "heroicons:swatch",
                      },
                      {
                        label: "Secondary Color",
                        field: "secondaryColor",
                        type: "color",
                        icon: "heroicons:swatch",
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={item.field}
                        className="relative"
                        variants={fadeUp}
                        transition={{ delay: index * 0.1 + 0.3 }}
                      >
                        <Label className="block mb-3 text-gray-700 dark:text-gray-300">
                          {t(item.label)}
                        </Label>
                        <div className="relative flex items-center gap-4">
                          <div
                            className="w-72 h-16 rounded-lg border-2 border-gray-300 cursor-pointer shadow-sm transition-all hover:shadow-md"
                            style={{
                              backgroundColor: formData[
                                item.field as keyof typeof formData
                              ] as string,
                            }}
                            onClick={() =>
                              setActiveColorPicker(
                                activeColorPicker === item.field
                                  ? null
                                  : item.field
                              )
                            }
                          />
                          <div className="flex-1">
                            <Input
                              type="text"
                              name={item.field}
                              value={
                                formData[
                                  item.field as keyof typeof formData
                                ] as string
                              }
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              className="w-full pl-10 pr-4 py-3 text-base rounded-lg border-gray-300 dark:border-gray-600"
                            />
                          </div>
                          <motion.div
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            whileHover={{ scale: 1.1 }}
                          >
                            <Icon icon={item.icon} className="h-5 w-5" />
                          </motion.div>
                          {activeColorPicker === item.field && (
                            <div className="absolute z-10 top-20 left-0">
                              <HexColorPicker
                                color={
                                  formData[
                                    item.field as keyof typeof formData
                                  ] as string
                                }
                                onChange={handleColorChange}
                              />
                              <div className="mt-2 text-sm text-gray-500">
                                Click anywhere to close
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Color Fields - Second Column */}
                  <div className="space-y-8">
                    {[
                      {
                        label: "Background Color",
                        field: "backgroundColor",
                        type: "color",
                        icon: "heroicons:rectangle-stack",
                      },
                      {
                        label: "Text Color",
                        field: "textColor",
                        type: "color",
                        icon: "heroicons:paint-brush",
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={item.field}
                        className="relative"
                        variants={fadeUp}
                        transition={{ delay: (index + 2) * 0.1 + 0.3 }}
                      >
                        <Label className="block mb-3 text-gray-700 dark:text-gray-300">
                          {t(item.label)}
                        </Label>
                        <div className="relative flex items-center gap-4">
                          <div
                            className="w-72 h-16 rounded-lg border-2 border-gray-300 cursor-pointer shadow-sm transition-all hover:shadow-md"
                            style={{
                              backgroundColor: formData[
                                item.field as keyof typeof formData
                              ] as string,
                            }}
                            onClick={() =>
                              setActiveColorPicker(
                                activeColorPicker === item.field
                                  ? null
                                  : item.field
                              )
                            }
                          />
                          <div className="flex-1">
                            <Input
                              type="text"
                              name={item.field}
                              value={
                                formData[
                                  item.field as keyof typeof formData
                                ] as string
                              }
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              className="w-full pl-10 pr-4 py-3 text-base rounded-lg border-gray-300 dark:border-gray-600"
                            />
                          </div>
                          <motion.div
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            whileHover={{ scale: 1.1 }}
                          >
                            <Icon icon={item.icon} className="h-5 w-5" />
                          </motion.div>
                          {activeColorPicker === item.field && (
                            <div className="absolute z-10 top-20 left-0">
                              <HexColorPicker
                                color={
                                  formData[
                                    item.field as keyof typeof formData
                                  ] as string
                                }
                                onChange={handleColorChange}
                              />
                              <div className="mt-2 text-sm text-gray-500">
                                Click anywhere to close
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Photo Upload - Full Width */}
                  <motion.div
                    className="md:col-span-2"
                    variants={fadeUp}
                    transition={{ delay: 0.7 }}
                  >
                    <Label className="block mb-3 text-gray-700 dark:text-gray-300">
                      {t("Upload Background Image")}
                    </Label>
                    <div className="relative">
                      {formData.photo ? (
                        <div className="relative group">
                          <img
                            src={formData.photo}
                            alt="Uploaded preview"
                            className="w-full h-64 rounded-lg object-cover border-2 border-gray-300 shadow-sm"
                          />
                          {isEditing && (
                            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                type="button"
                                onClick={triggerFileInput}
                                className="bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors"
                              >
                                <Icon
                                  icon="heroicons:pencil"
                                  className="h-5 w-5 text-gray-700"
                                />
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={triggerFileInput}
                          disabled={!isEditing}
                          className="w-full h-64 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors bg-gray-50 hover:bg-gray-100"
                        >
                          <Icon
                            icon="heroicons:photo"
                            className="h-12 w-12 text-gray-400 mb-3"
                          />
                          <p className="text-gray-500 font-medium">
                            {t("Click to upload an image")}
                          </p>
                          <p className="text-sm text-gray-400 mt-1">
                            {t("Recommended size: 1920x1080px")}
                          </p>
                        </button>
                      )}
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handlePhotoUpload}
                        accept="image/*"
                        className="hidden"
                        disabled={!isEditing}
                      />
                    </div>
                  </motion.div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Preview Section */}
      {!isEditing && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, type: "spring" }}
          className="mb-8"
        >
          <motion.div whileHover="hover" variants={cardHover}>
            <Card className="shadow-lg rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <CardHeader className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 p-6">
                <CardTitle className="text-xl font-semibold">
                  {t("Theme Preview")}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-2">
                          Primary Color
                        </h3>
                        <div
                          className="w-full h-12 rounded-lg"
                          style={{ backgroundColor: formData.primaryColor }}
                        />
                        <p className="mt-1 text-sm text-gray-600">
                          {formData.primaryColor}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-2">
                          Secondary Color
                        </h3>
                        <div
                          className="w-full h-12 rounded-lg"
                          style={{ backgroundColor: formData.secondaryColor }}
                        />
                        <p className="mt-1 text-sm text-gray-600">
                          {formData.secondaryColor}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-2">
                          Background
                        </h3>
                        <div
                          className="w-full h-12 rounded-lg border border-gray-200"
                          style={{ backgroundColor: formData.backgroundColor }}
                        />
                        <p className="mt-1 text-sm text-gray-600">
                          {formData.backgroundColor}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-2">
                          Text Color
                        </h3>
                        <div
                          className="w-full h-12 rounded-lg border border-gray-200 flex items-center justify-center"
                          style={{ backgroundColor: formData.backgroundColor }}
                        >
                          <p
                            className="text-lg font-medium"
                            style={{ color: formData.textColor }}
                          >
                            Sample Text
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-600">
                          {formData.textColor}
                        </p>
                      </div>
                    </div>
                  </div>
                  {formData.photo && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">
                        Background Image
                      </h3>
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <img
                          src={formData.photo}
                          alt="Theme preview"
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Page;
