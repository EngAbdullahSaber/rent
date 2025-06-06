"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslate } from "@/config/useTranslation";
import { motion, AnimatePresence } from "framer-motion";
import BreadcrumbComponent from "../../(category-mangement)/shared/BreadcrumbComponent";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Page = () => {
  const { t } = useTranslate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    couponName: "",
    usageCount: "",
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    discountType: "",
    discountValue: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (
    name: "startDate" | "endDate",
    date: Date | undefined
  ) => {
    setFormData((prev) => ({ ...prev, [name]: date }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, discountType: value }));
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
    console.log("Coupon saved:", formData);
    setIsEditing(false);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-6 mx-auto"
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
            {t("Coupon Management")}
          </motion.h1>
          <motion.div variants={fadeIn}>
            <BreadcrumbComponent
              header={"Marketing"}
              body={"Coupon Management"}
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
                  {t("Save Coupon")}
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
                <Icon icon="heroicons:plus" className="mr-2 h-5 w-5" />
                {t("Create Coupon")}
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
                    {t("Coupon Details")}
                  </CardTitle>
                </motion.div>
              </CardHeader>
              <CardContent className="p-6">
                <motion.div
                  className="flex flex-col gap-8"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {[
                    {
                      label: "Coupon Name",
                      field: "couponName",
                      type: "text",
                      placeholder: "Enter coupon name",
                      icon: "heroicons:ticket",
                    },
                    {
                      label: "Number of times of use",
                      field: "usageCount",
                      type: "number",
                      placeholder: "Enter usage limit",
                      icon: "heroicons:arrow-path-rounded-square",
                    },
                    {
                      label: "Discount Type",
                      field: "discountType",
                      type: "select",
                      options: ["Percentage", "Fixed Amount"],
                      icon: "heroicons:tag",
                    },
                    {
                      label: "Discount Value",
                      field: "discountValue",
                      type: "number",
                      placeholder: "Enter discount value",
                      icon: "heroicons:banknotes",
                    },
                    {
                      label: "Start Date",
                      field: "startDate",
                      type: "date",
                      icon: "heroicons:calendar",
                    },
                    {
                      label: "End Date",
                      field: "endDate",
                      type: "date",
                      icon: "heroicons:calendar",
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
                      <div className="relative">
                        {item.type === "select" ? (
                          <Select
                            onValueChange={handleSelectChange}
                            disabled={!isEditing}
                          >
                            <SelectTrigger className="pl-10 pr-4 py-5 text-base rounded-lg border-gray-300 dark:border-gray-600">
                              <SelectValue placeholder="Select discount type" />
                            </SelectTrigger>
                            <SelectContent>
                              {item.options?.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : item.type === "date" ? (
                          <Popover>
                            <PopoverTrigger asChild disabled={!isEditing}>
                              <Button
                                variant="outline"
                                className="pl-10 pr-4 py-5 h-auto w-full justify-start text-left font-normal"
                              >
                                {formData[item.field as keyof typeof formData]
                                  ? format(
                                      formData[
                                        item.field as keyof typeof formData
                                      ] as Date,
                                      "PPP"
                                    )
                                  : "Pick a date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={
                                  formData[
                                    item.field as keyof typeof formData
                                  ] as Date
                                }
                                onSelect={(date) =>
                                  handleDateChange(
                                    item.field as "startDate" | "endDate",
                                    date
                                  )
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        ) : (
                          <Input
                            type={item.type}
                            name={item.field}
                            value={
                              formData[
                                item.field as keyof typeof formData
                              ] as string
                            }
                            onChange={handleInputChange}
                            placeholder={t(item.placeholder || "")}
                            disabled={!isEditing}
                            className="pl-10 pr-4 py-5 text-base rounded-lg border-gray-300 dark:border-gray-600"
                          />
                        )}
                        <motion.div
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          whileHover={{ scale: 1.1 }}
                        >
                          <Icon icon={item.icon} className="h-5 w-5" />
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Preview Section */}
      {!isEditing && formData.couponName && (
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
                  {t("Current Coupon")}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <motion.div
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Icon
                      icon="heroicons:ticket"
                      className="h-5 w-5 text-primary"
                    />
                    <p className="text-gray-700 dark:text-gray-300">
                      Coupon: {formData.couponName}
                    </p>
                  </motion.div>

                  {formData.usageCount && (
                    <motion.div
                      className="flex items-center gap-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 }}
                    >
                      <Icon
                        icon="heroicons:arrow-path-rounded-square"
                        className="h-5 w-5 text-primary"
                      />
                      <p className="text-gray-700 dark:text-gray-300">
                        Usage limit: {formData.usageCount} times
                      </p>
                    </motion.div>
                  )}

                  {formData.discountType && formData.discountValue && (
                    <motion.div
                      className="flex items-center gap-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Icon
                        icon="heroicons:tag"
                        className="h-5 w-5 text-primary"
                      />
                      <p className="text-gray-700 dark:text-gray-300">
                        Discount: {formData.discountValue}
                        {formData.discountType === "Percentage" ? "%" : "$"} (
                        {formData.discountType})
                      </p>
                    </motion.div>
                  )}

                  {formData.startDate && (
                    <motion.div
                      className="flex items-center gap-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.35 }}
                    >
                      <Icon
                        icon="heroicons:calendar"
                        className="h-5 w-5 text-primary"
                      />
                      <p className="text-gray-700 dark:text-gray-300">
                        Starts: {format(formData.startDate, "PPP")}
                      </p>
                    </motion.div>
                  )}

                  {formData.endDate && (
                    <motion.div
                      className="flex items-center gap-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Icon
                        icon="heroicons:calendar"
                        className="h-5 w-5 text-primary"
                      />
                      <p className="text-gray-700 dark:text-gray-300">
                        Ends: {format(formData.endDate, "PPP")}
                      </p>
                    </motion.div>
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
