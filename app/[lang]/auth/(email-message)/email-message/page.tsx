"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LoginImage from "@/public/images/auth/229384126_11060547 1.png";
import LoginBackground from "@/public/images/auth/Minimal Pattern - 7 - A.png";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslate } from "@/config/useTranslation";
const ForgotPage = () => {
  const { lang } = useParams();
  const { t } = useTranslate();
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(`/${lang}/auth/verify`);
    }, 5000);

    return () => clearTimeout(timer);
  }, [lang, router]);
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
              <motion.div
                initial={{ y: -50 }}
                whileInView={{ y: 0 }}
                transition={{ duration: 0.8 }}
                className="2xl:text-4xl font-medium  text-center text-4xl text-zinc-950 my-6 2xl:mt-2 leading-6"
              >
                {t("Check your email")}
              </motion.div>
              <motion.div
                initial={{ y: -50 }}
                whileInView={{ y: 0 }}
                transition={{ duration: 1 }}
                className="2xl:text-lg text-base text-center text-default-600 mt-2 leading-6"
              >
                {t("recovery paragraph")}
              </motion.div>
              <Image
                src={LoginImage}
                height={320}
                width={324}
                alt="Login Image"
                className="w-80 mx-auto h-80 block"
                priority={true}
              />{" "}
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.6 }}
                className=" text-sm text-center my-2"
              >
                <span>
                  {t("Didn't receive the code?")}
                  <Link
                    href="/auth/forgot"
                    className="flex-none text-sm text-primary"
                  >
                    {t("Rewrite email")}
                  </Link>
                </span>
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
