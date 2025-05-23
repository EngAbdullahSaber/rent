"use client";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import LoginImage from "@/public/images/auth/229384126_11060547 1.png";
import LoginBackground from "@/public/images/auth/Minimal Pattern - 7 - A.png";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useTranslate } from "@/config/useTranslation";
import { Button } from "@/components/ui/button";
const ForgotPage = () => {
  const { lang } = useParams();
  const { t } = useTranslate();

  return (
    <>
      <div className="min-h-screen bg-background  flex items-center  overflow-hidden w-full">
        <div className="min-h-screen basis-full flex overflow-hidden flex-wrap w-full  justify-center overflow-y-auto">
          <div className="basis-1/2  w-full relative overflow-hidden  bg-[#fff] hidden xl:flex  flex-col justify-center items-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1.2 }}
            >
              <Image
                src={LoginImage}
                height={320}
                width={324}
                alt="Login Image"
                className="w-80 mx-auto h-80 block"
                priority={true}
              />{" "}
              <motion.div
                initial={{ y: -50 }}
                whileInView={{ y: 0 }}
                transition={{ duration: 0.8 }}
                className="2xl:text-4xl font-medium  text-center text-4xl text-zinc-950 my-6 2xl:mt-2 leading-6"
              >
                {t("Password changed successfully")}
              </motion.div>{" "}
              <motion.div
                initial={{ y: -50 }}
                whileInView={{ y: 0 }}
                transition={{ duration: 1.4 }}
              >
                <Link
                  href="/auth/login"
                  className="flex-none text-sm text-primary"
                >
                  {" "}
                  <Button className="w-full mt-6 bg-[#0F60FF] text-white hover:bg-[#3d6cca]">
                    {t("Back to login")}
                  </Button>{" "}
                </Link>
              </motion.div>
            </motion.div>{" "}
          </div>
          <Image
            src={LoginBackground}
            height={250}
            width={254}
            alt="Login Image"
            className={`w-64 absolute -top-2 h-72 block${
              lang == "en" ? " right-2 rotate-90" : " left-2"
            }`}
            priority={true}
          />
        </div>
      </div>
    </>
  );
};

export default ForgotPage;
