"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslate } from "@/config/useTranslation";
import { motion, AnimatePresence } from "framer-motion";
import BreadcrumbComponent from "../../(category-mangement)/shared/BreadcrumbComponent";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import "react-quill/dist/quill.snow.css";

// Dynamic import for ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] flex items-center justify-center">
      Loading editor...
    </div>
  ),
});

const Page = () => {
  const { t } = useTranslate();
  const [content, setContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Enhanced toolbar configuration
  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    "font",
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "script",
    "blockquote",
    "code-block",
    "list",
    "bullet",
    "indent",
    "direction",
    "align",
    "link",
    "image",
    "video",
  ];

  // Enhanced animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 0.5,
      },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.03, boxShadow: "0px 5px 15px rgba(0,0,0,0.1)" },
    tap: { scale: 0.98 },
    focus: { scale: 1.02 },
  };

  const editorVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  const handleSave = () => {
    console.log("Content saved:", content);
    setIsEditing(false);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-6 max-w-7xl mx-auto"
    >
      {/* Header Section */}
      <motion.div
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8"
        variants={itemVariants}
      >
        <div>
          <motion.h1
            className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
            initial={{ x: -30 }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            {t("Terms and Conditions")}
          </motion.h1>
          <BreadcrumbComponent
            header={"Fixed Pages"}
            body={"Terms and Condition"}
          />
        </div>

        <motion.div className="flex gap-3" variants={itemVariants}>
          {isEditing ? (
            <>
              <motion.div variants={buttonVariants}>
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                  whileHover="hover"
                  whileTap="tap"
                  className="px-6 py-3"
                >
                  {t("Cancel")}
                </Button>
              </motion.div>
              <motion.div variants={buttonVariants}>
                <Button
                  onClick={handleSave}
                  whileHover="hover"
                  whileTap="tap"
                  className="px-6 py-3 bg-primary hover:bg-primary-dark"
                >
                  {t("Save Changes")}
                </Button>
              </motion.div>
            </>
          ) : (
            <motion.div variants={buttonVariants}>
              <Button
                onClick={() => setIsEditing(true)}
                whileHover="hover"
                whileTap="tap"
                className="px-6 py-3"
              >
                <Icon icon="heroicons:pencil" className="mr-2 h-5 w-5" />
                {t("Edit Content")}
              </Button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {/* Editor Card */}
      <AnimatePresence mode="wait">
        <motion.div variants={itemVariants} className="mb-8">
          <motion.div
            whileHover={{ scale: 1.005 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Card className="shadow-xl rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
              <CardHeader className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <CardTitle className="text-xl font-semibold">
                  {t("Content Editor")}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 h-[500px]">
                <motion.div
                  variants={editorVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={setContent}
                    modules={modules}
                    formats={formats}
                    readOnly={!isEditing}
                    style={{
                      height: "400px",
                      border: "none",
                      fontFamily: "'Inter', sans-serif",
                    }}
                    className="rounded-b-xl"
                  />
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Preview Section */}
      {!isEditing && content && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <motion.div
            whileHover={{ scale: 1.005 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Card className="shadow-xl rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
              <CardHeader className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <CardTitle className="text-xl font-semibold">
                  {t("Preview")}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div
                  className="prose dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Page;
