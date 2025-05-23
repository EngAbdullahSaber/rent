"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "@/public/images/auth/LawyerLogo.png";
import { useTranslate } from "@/config/useTranslation";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { AxiosError } from "axios";
import { LogIn, VerifyLogin } from "@/services/auth/auth";
import { headerConfigKeyName } from "@/services/app.config";
import { storeTokenInLocalStorage } from "@/services/utils";
import { changeUserData, setPhoneTokens } from "@/store/Action";
import { updateAxiosHeader } from "@/services/axios";
import { useAccessToken } from "@/config/accessToken";
import LayoutLoader from "../layout-loader";
import Link from "next/link";

interface ErrorResponse {
  errors?: {
    [key: string]: string[];
  };
}

interface RootState {
  userName: string;
}
interface RootState1 {
  accessToken: string;
}
const VerifyForm = ({
  loading,
  setLoading,
}: {
  loading: any;
  setLoading: any;
}) => {
  const totalOtpField = 6; // Total number of OTP fields
  const otpArray: string[] = Array.from({ length: totalOtpField }, () => "");
  const [otp, setOtp] = useState<string[]>(otpArray);

  const otpFields = Array.from({ length: totalOtpField }, (_, index) => index);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const { lang } = useParams();

  const dispatch = useDispatch();
  const username = useSelector((state: RootState) => state.userName);
  const tokenOtp = useSelector((state: RootState1) => state.phoneToken);
  const accessToken = useAccessToken();
  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    if (!isNaN(Number(value)) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value.length === 1 && index < totalOtpField - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace" && otp[index] === "" && index > 0) {
      setOtp((prevOtp) => {
        const newOtp = [...prevOtp];
        newOtp[index - 1] = "";
        return newOtp;
      });
      inputRefs.current[index - 1]?.focus();
    } else if (event.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (event.key === "ArrowRight" && index < totalOtpField - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const enteredOtp = otp.slice().reverse().join("");
    setOtp(otpArray); // Reset OTP input
    setLoading(false);
    router.replace("/dashboard");

    // try {
    //   // Send username and OTP to the API
    //   const res = await VerifyLogin(
    //     {
    //       email: username,
    //       code: enteredOtp, // Send OTP as a string
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${tokenOtp}`, // Set token in the Authorization header
    //       },
    //     }
    //   );
    //   if (res) {
    //     // Check if the response has a valid message
    //     if (res?.message) {
    //       toast.success(res.message);
    //     }
    //     let userRole;
    //     // Ensure the access_token exists before trying to store it
    //     if (res?.body?.access_token) {
    //       dispatch(
    //         changeUserData({
    //           email: res.body.user.email,
    //           role_with_permission: res.body.user?.role,
    //           verify_access_token: res.body.user.verify_access_token,
    //         })
    //       );
    //       localStorage.setItem(
    //         "permissions",
    //         JSON.stringify(res?.body?.user?.role_with_permission?.permissions)
    //       );
    //       if (res.body.user?.role) {
    //         // Redirect based on role
    //         if (res.body.user?.role == "lawyer") {
    //           router.replace("/lawyer-cases");
    //         } else if (res.body.user?.role == "client") {
    //           router.replace("/client-cases");
    //         } else {
    //           router.replace("/dashboard");
    //         }
    //       } else {
    //         toast.error("User role information is missing");
    //       }
    //       userRole = res.body.user?.role;
    //     } else {
    //       toast.error("Access token missing");
    //       return;
    //     }

    //     // Ensure the user and role information exists before using it
    //     console.log(res.body.user?.role);
    //   } else {
    //     toast.error("Response is invalid or missing");
    //   }
    //   setLoading(true);
    // } catch (error) {
    //   const axiosError = error as AxiosError<ErrorResponse>;
    //   const response = axiosError.response?.data;

    //   const errors = response?.errors;
    //   const message = response?.message;

    //   if (errors) {
    //     for (const field in errors) {
    //       if (Object.prototype.hasOwnProperty.call(errors, field)) {
    //         const errorMessage = errors[field][0];
    //         toast.error(`${field}: ${errorMessage}`);
    //         setLoading(true);
    //       }
    //     }
    //   } else if (message) {
    //     toast.error(
    //       message == "please login first" ? t("enteredcode not valid") : null
    //     ); // Show "please login first" or similar messages
    //   } else {
    //     toast.error("Something went wrong.");
    //   }
    // }
  };

  const isOtpComplete = otp.every((digit) => digit !== "");
  const { t } = useTranslate();
  useEffect(() => {
    if (accessToken) {
      updateAxiosHeader(accessToken);
    }
  }, [accessToken]);
  if (loading) {
    return <LayoutLoader />;
  }
  return (
    <div className="w-full md:w-[480px] py-5">
      <motion.div
        initial={{ y: -50 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 1.2 }}
      ></motion.div>
      <motion.div
        initial={{ y: -50 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 1.2 }}
        className="2xl:text-4xl font-medium  text-4xl text-zinc-950 my-6 2xl:mt-2 leading-6"
      >
        {t("Verify the phone number")}
      </motion.div>
      <motion.div
        initial={{ y: -50 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 1.2 }}
        className="2xl:text-lg text-base text-default-600 mt-2 leading-6"
      >
        {t("verify paragraph")}
      </motion.div>
      <form className="mt-8">
        <motion.div
          initial={{ y: -50 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 1.2 }}
          className="flex flex-wrap gap-1 lg:gap-6"
        >
          {otpFields.map((index) => (
            <Input
              key={`otp-code-${index}`}
              type="text"
              id={`otp${index}`}
              name={`otp${index}`}
              value={otp[index]}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(event) => handleKeyDown(index, event)}
              maxLength={1}
              className="w-10 h-10 sm:w-[60px] bg-[#fff]  sm:h-16 rounded text-center text-2xl font-medium text-default-900"
              ref={(ref) => (inputRefs.current[index] = ref)}
            />
          ))}
        </motion.div>
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.6 }}
          className=" text-sm my-2"
        >
          <span>
            {t("Didn't receive the code?")}
            <Link
              href="/auth/forgot"
              className="flex-none text-sm text-primary"
            >
              {t("Resend")}
            </Link>
          </span>
        </motion.div>
        <motion.div
          initial={{ y: -50 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 1.2 }}
          className="mt-6"
        >
          <Button
            type="button"
            className="w-full bg-[#0F60FF] text-white hover:bg-[#3d6cca]"
            size="lg"
            onClick={handleSubmit}
            disabled={!isOtpComplete}
          >
            {t("Verify Now")}
          </Button>
        </motion.div>
      </form>
    </div>
  );
};

export default VerifyForm;
