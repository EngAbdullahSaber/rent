"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTranslate } from "@/config/useTranslation";
import { Icon } from "@iconify/react";
import { toast as reToast } from "react-hot-toast";
import { AxiosError } from "axios";
import Image from "next/image";
import deleteIcon from "@/public/images/home/Objects.png";
import { motion, AnimatePresence } from "framer-motion";

interface DeleteConfirmationDialogProps {
  trigger?: React.ReactNode;
  title: string;
  description: string;
  handleDelete: (id: any) => Promise<boolean>;
  confirmButtonText?: string;
  cancelButtonText?: string;
  icon?: string;
  triggerClassName?: string;
  id: any;
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  trigger,
  title,
  description,
  handleDelete,
  confirmButtonText = "Agree",
  cancelButtonText = "Disagree",
  icon = "wpf:delete-shield",
  triggerClassName = "",
  id,
}) => {
  const { t } = useTranslate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Animation variants
  const backdrop = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modal = {
    hidden: {
      opacity: 0,
      y: -50,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      opacity: 0,
      y: 50,
      scale: 0.95,
      transition: { duration: 0.2 },
    },
  };

  const contentItem = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      const success = await handleDelete(id);
      if (success) {
        setIsDialogOpen(false);
      }
    } catch (error) {
      reToast.error(t("Something went wrong. Please try again."));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="icon"
              variant="outline"
              className={`h-7 w-7 ${triggerClassName}`}
              color="secondary"
            >
              <Icon icon="heroicons:trash" className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </DialogTrigger>

      <AnimatePresence>
        {isDialogOpen && (
          <DialogContent className="p-1 !h-auto" size="md" forceMount>
            <motion.div
              className="relative bg-background rounded-lg p-6"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={modal}
            >
              <motion.div
                className="flex flex-col items-center text-center"
                initial="hidden"
                animate="visible"
              >
                <motion.div custom={0} variants={contentItem}>
                  <Image
                    src={deleteIcon}
                    alt="Delete Icon"
                    width={100}
                    height={150}
                    className="transform transition-transform hover:scale-110"
                  />
                </motion.div>

                <motion.h3
                  className="mt-6 mb-4 text-success text-xl font-semibold"
                  custom={1}
                  variants={contentItem}
                >
                  {t(title)}
                </motion.h3>

                <motion.p
                  className="text-sm text-destructive mb-6"
                  custom={2}
                  variants={contentItem}
                >
                  {t(description)}
                </motion.p>
              </motion.div>

              <DialogFooter>
                <motion.div custom={3} variants={contentItem}>
                  <DialogClose asChild>
                    <Button
                      type="button"
                      variant="outline"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {t(cancelButtonText)}
                    </Button>
                  </DialogClose>
                </motion.div>

                <motion.div custom={4} variants={contentItem}>
                  <Button
                    type="button"
                    onClick={handleConfirm}
                    color="destructive"
                    disabled={isLoading}
                    whileHover={{ scale: isLoading ? 1 : 1.03 }}
                    whileTap={{ scale: isLoading ? 1 : 0.97 }}
                  >
                    {isLoading ? (
                      <motion.span
                        animate={{
                          opacity: [0.6, 1, 0.6],
                          transition: { repeat: Infinity, duration: 1.5 },
                        }}
                      >
                        {t("Processing")}
                      </motion.span>
                    ) : (
                      t(confirmButtonText)
                    )}
                  </Button>
                </motion.div>
              </DialogFooter>
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
