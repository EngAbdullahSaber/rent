"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslate } from "@/config/useTranslation";
import DatePickerWithRange from "@/components/date-picker-with-range";
import EcommerceStats from "./ecommerce-stats";
import ReportsSnapshot from "./reports-snapshot";
import TableData from "./TableData";
import { useForm } from "react-hook-form";
import { Select } from "@/components/common/atoms/Select";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const Page = () => {
  const { t } = useTranslate();
  const options = [
    { value: "admin", label: "Administrator" },
    { value: "user", label: "Regular User" },
    { value: "guest", label: "Guest" },
  ];
  const { register, handleSubmit, setValue, watch } = useForm();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-6 pb-6"
    >
      {/* Header Section */}
      <motion.div variants={cardVariants} className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-medium text-default-800">
            {t("Sales statistics")}
          </h1>
          <DatePickerWithRange />
        </div>

        {/* Stats Card */}
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              <EcommerceStats />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Reports Snapshot */}
      <motion.div variants={cardVariants}>
        <ReportsSnapshot />
      </motion.div>

      {/* Sales Tables */}
      <motion.div variants={containerVariants} className="space-y-6">
        {/* Sales by Service */}
        <motion.div variants={cardVariants}>
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <p>{t("Sales table by service")}</p>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center w-full md:w-auto">
                  <DatePickerWithRange />
                  <div className="w-full sm:w-[200px]">
                    <Select
                      keyData="serviceFilter"
                      data={options}
                      value={watch("serviceFilter")}
                      setValue={(key, value) => setValue(key, value)}
                      placeholder="Filter services..."
                    />
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TableData />
            </CardContent>
            <CardFooter className="bg-gray-100/50 dark:bg-gray-800 text-center flex justify-center py-3">
              <span className="font-medium">
                {t("Totals")}: <span className="text-primary">87,873$</span>
              </span>
            </CardFooter>
          </Card>
        </motion.div>

        {/* Sales by Service Provider */}
        <motion.div variants={cardVariants}>
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <p>{t("Sales table by service Provider")}</p>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center w-full md:w-auto">
                  <DatePickerWithRange />
                  <div className="w-full sm:w-[200px]">
                    <Select
                      keyData="providerFilter"
                      data={options}
                      value={watch("providerFilter")}
                      setValue={(key, value) => setValue(key, value)}
                      placeholder="Filter providers..."
                    />
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TableData />
            </CardContent>
            <CardFooter className="bg-gray-100/50 dark:bg-gray-800 text-center flex justify-center py-3">
              <span className="font-medium">
                {t("Totals")}: <span className="text-primary">87,873$</span>
              </span>
            </CardFooter>
          </Card>
        </motion.div>

        {/* Sales by City */}
        <motion.div variants={cardVariants}>
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <p>{t("Sales table by City")}</p>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center w-full md:w-auto">
                  <DatePickerWithRange />
                  <div className="w-full sm:w-[200px]">
                    <Select
                      keyData="cityFilter"
                      data={options}
                      value={watch("cityFilter")}
                      setValue={(key, value) => setValue(key, value)}
                      placeholder="Filter cities..."
                    />
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TableData />
            </CardContent>
            <CardFooter className="bg-gray-100/50 dark:bg-gray-800 text-center flex justify-center py-3">
              <span className="font-medium">
                {t("Totals")}: <span className="text-primary">87,873$</span>
              </span>
            </CardFooter>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Page;
