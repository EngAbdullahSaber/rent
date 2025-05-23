"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useMediaQuery } from "@/hooks/use-media-query";
import Logo from "@/public/images/auth/LawyerLogo.png";
import Image from "next/image";
import { useTranslate } from "@/config/useTranslation";
import { motion } from "framer-motion";
import { AxiosError } from "axios";
import { ForgetPassword1 } from "@/services/auth/auth";
interface ErrorResponse {
  errors?: {
    [key: string]: string[]; // This allows us to map error fields to an array of error messages
  };
}
const schema = z.object({
  email: z.string().email({ message: "Your email is invalid." }),
});
const ForgotForm = () => {
  const [isPending, startTransition] = React.useTransition();
  const isDesktop2xl = useMediaQuery("(max-width: 1530px)");
  const [email, setEmail] = React.useState("");
  const { lang } = useParams();

  const router = useRouter();

  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/auth/email-message");

    // try {
    //   const res = await ForgetPassword1(
    //     {
    //       email: email,
    //     },
    //     lang
    //   );
    //   if (res) {
    //     toast.success(res?.message);
    //     startTransition(true);
    //     localStorage.setItem("forgetToken1", res?.body?.token);
    //     localStorage.setItem("email", email);

    //   }
    // } catch (error) {
    //   const axiosError = error as AxiosError<ErrorResponse>; // Cast the error

    //   // Check if we have errors in the response
    //   const errors = axiosError.response?.data?.errors;
    //   if (errors) {
    //     // Loop through each field in the errors object
    //     for (const field in errors) {
    //       if (Object.prototype.hasOwnProperty.call(errors, field)) {
    //         // Assuming the first error in the array is the most important one
    //         const errorMessage = errors[field][0];
    //         toast.error(`${field}: ${errorMessage}`); // Display the error in a toast
    //       }
    //     }
    //   } else {
    //     // If no field-specific errors, display a general error message
    //     toast.error("Something went wrong.");
    //   }
    // }
  };
  const { t } = useTranslate();

  return (
    <div className="w-full">
      <motion.div
        initial={{ y: -50 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.6 }}
      ></motion.div>
      <motion.div
        initial={{ y: -50 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.8 }}
        className="2xl:text-4xl font-medium  text-4xl text-zinc-950 my-6 2xl:mt-2 leading-6"
      >
        {t("Forgot your password?")}
      </motion.div>
      <motion.div
        initial={{ y: -50 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 1 }}
        className="2xl:text-lg text-base text-default-600 mt-2 leading-6"
      >
        {t("recovery paragraph")}
      </motion.div>
      <form onSubmit={handleSubmit} className="mt-5 xl:mt-7">
        <motion.div
          initial={{ y: -50 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <Label htmlFor="email" className="mb-2 font-medium text-default-600">
            {t("Enter email/phone number")}{" "}
          </Label>
          <Input
            disabled={isPending}
            type="email"
            id="email"
            placeholder={t("Enter email/phone number")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            size={!isDesktop2xl ? "xl" : "lg"}
          />
        </motion.div>

        <motion.div
          initial={{ y: -50 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 1.4 }}
        >
          {" "}
          <Button
            className="w-full mt-6 bg-[#0F60FF] text-white hover:bg-[#3d6cca]"
            size={!isDesktop2xl ? "lg" : "md"}
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? t("sending") : t("Send Recovery Email")}
          </Button>
        </motion.div>
      </form>
    </div>
  );
};

export default ForgotForm;
