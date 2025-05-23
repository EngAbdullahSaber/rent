"use client";
import { Fragment } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import background from "@/public/images/auth/line.png";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import VerfiyForm from "@/components/auth/verify-form";
import Logo from "@/public/images/auth/LawyerLogo.png";
import { motion } from "framer-motion";
import LayoutLoader from "@/components/layout-loader";
import LoginImage from "@/public/images/auth/13416089_5243319 1.png";
import LoginBackground from "@/public/images/auth/Minimal Pattern - 7 - A.png";
import { useParams } from "next/navigation";
const VerifyPage = () => {
  const [openVideo, setOpenVideo] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>();
  const { lang } = useParams();

  if (loading) {
    return <LayoutLoader />;
  }
  return (
    <Fragment>
      <div className="min-h-screen bg-card  flex items-center  overflow-hidden w-full">
        <div className="lg-inner-column flex w-full flex-wrap overflow-hiddenjustify-center overflow-y-auto">
          <div className="min-h-screen basis-full md:basis-1/2 bg-[#fff] w-full px-4 flex justify-center items-center">
            <div className="lg:w-[480px]">
              <VerfiyForm loading={loading} setLoading={setLoading} />
            </div>
          </div>{" "}
          <div className="basis-1/2  w-full relative bg-[#fff] hidden xl:flex  flex-col justify-center items-center">
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
                className="w-80 h-80 block"
                priority={true}
              />{" "}
              <Image
                src={LoginBackground}
                height={250}
                width={254}
                alt="Login Image"
                className={`w-64 absolute -top-2 h-72 block${
                  lang == "en" ? " -right-2 rotate-90" : " -left-2"
                }`}
                priority={true}
              />
            </motion.div>{" "}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default VerifyPage;
