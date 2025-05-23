"use client";
import Image from "next/image";
import { Icon } from "@iconify/react";
import background from "@/public/images/auth/line.png";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Fragment, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import CreatePasswordForm from "./create-password-form";
import Logo from "@/public/images/auth/LawyerLogo.png";
import { motion } from "framer-motion";
import LoginImage from "@/public/images/auth/20602816_6333052 1.png";
import LoginBackground from "@/public/images/auth/Minimal Pattern - 7 - A.png";
import { useParams } from "next/navigation";
const CreatePasswordPage = () => {
  const [openVideo, setOpenVideo] = useState<boolean>(false);
  const { lang } = useParams();

  return (
    <>
      <div className="min-h-screen bg-background  flex items-center  overflow-hidden w-full">
        <div className="min-h-screen basis-full overflow-hidden flex flex-wrap w-full  justify-center overflow-y-auto">
          <div className=" min-h-screen basis-full md:basis-1/2 w-full px-4 py-5 flex justify-center items-center">
            <div className="lg:w-[480px] ">
              <CreatePasswordForm />
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
    </>
  );
};

export default CreatePasswordPage;
