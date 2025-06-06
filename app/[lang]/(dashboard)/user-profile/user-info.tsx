"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@/components/svg";
import { useTranslate } from "@/config/useTranslation";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useParams } from "next/navigation";

type PasswordTypes = {
  email: "text" | "email";
  phone: "text" | "tel";
  password: "password" | "text";
};

const UserInfo = () => {
  const { t } = useTranslate();
  const { lang } = useParams();
  const [passwordTypes, setPasswordTypes] = useState<PasswordTypes>({
    email: "email",
    phone: "tel",
    password: "password",
  });
  const [formData, setFormData] = useState({
    email: "user@example.com",
    phone: "+1234567890",
    password: "••••••••",
  });
  const [displayPassword, setDisplayPassword] = useState("••••••••"); // Display value

  const [avatar, setAvatar] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const togglePasswordType = (field: keyof PasswordTypes) => {
    setPasswordTypes((prev) => ({
      ...prev,
      [field]: prev[field] === "password" ? "text" : "password",
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setAvatar(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    // Reset display password to dots when saving
    setDisplayPassword("••••••••");
    // Reset password type to hidden
    setPasswordTypes((prev) => ({ ...prev, password: "password" }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden">
        <motion.div
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <CardHeader className="border-none mb-0">
            <CardTitle className="text-xl font-bold text-default-800">
              {t("Account Information")}
            </CardTitle>
          </CardHeader>

          <CardContent className="px-4 py-8">
            {/* Avatar Section */}
            <motion.div
              className="flex flex-col items-center gap-4 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Label
                htmlFor="avatar-upload"
                className="relative h-24 w-24 rounded-full bg-default-100 cursor-pointer group"
              >
                <AnimatePresence mode="wait">
                  {avatar ? (
                    <motion.div
                      key="avatar"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="h-full w-full rounded-full overflow-hidden"
                    >
                      <Image
                        src={avatar}
                        alt="User avatar"
                        width={96}
                        height={96}
                        className="h-full w-full object-cover"
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="default-icon"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="h-full w-full flex items-center justify-center"
                    >
                      <User className="text-default-400 h-16 w-16" />
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div
                  className="absolute inset-0 bg-black bg-opacity-30 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                  whileHover={{ opacity: 1 }}
                >
                  <Icon
                    icon="heroicons:camera-solid"
                    className="text-white h-6 w-6"
                  />
                </motion.div>
              </Label>
              <Input
                id="avatar-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleAvatarChange}
              />
              <motion.p
                className="text-sm text-default-600"
                whileHover={{ scale: 1.05 }}
              >
                {t("Click to change avatar")}
              </motion.p>
            </motion.div>

            {/* Form Fields */}
            <div className="flex flex-col gap-6 mb-6">
              {[
                {
                  label: "Email",
                  field: "email",
                  type: passwordTypes.email,
                  placeholder: "Enter your email",
                },
                {
                  label: "Phone",
                  field: "phone",
                  type: passwordTypes.phone,
                  placeholder: "Enter your phone",
                },
                {
                  label: "Password",
                  field: "password",
                  type: passwordTypes.password,
                  placeholder: "Enter your password",
                },
              ].map(({ label, field, type, placeholder }, index) => (
                <motion.div
                  key={field}
                  className="relative"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Label className="block mb-2">{t(label)}</Label>
                  <Input
                    type={type}
                    name={field}
                    value={
                      field === "password" &&
                      passwordTypes.password === "password"
                        ? displayPassword
                        : formData[field as keyof typeof formData]
                    }
                    onChange={handleInputChange}
                    placeholder={t(placeholder)}
                    disabled={!isEditing}
                    className="pr-10"
                  />
                  {field === "password" && (
                    <motion.button
                      type="button"
                      className={`absolute ${
                        lang == "en" ? "right-3" : "left-3"
                      } top-[32px]`}
                      onClick={() => {
                        togglePasswordType(field as keyof PasswordTypes);
                        // When revealing password, show the actual value
                        if (passwordTypes.password === "password") {
                          setDisplayPassword(formData.password);
                        } else {
                          setDisplayPassword("••••••••");
                        }
                      }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Icon
                        icon={
                          passwordTypes.password === "password"
                            ? "heroicons:eye"
                            : "heroicons:eye-slash"
                        }
                        className="w-5 h-5 text-default-400"
                      />
                    </motion.button>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Action Buttons */}
            <motion.div
              className="flex justify-end gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    {t("Cancel")}
                  </Button>
                  <Button onClick={handleSave}>{t("Save Changes")}</Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)}>
                  {t("Edit Profile")}
                </Button>
              )}
            </motion.div>
          </CardContent>
        </motion.div>
      </Card>
    </motion.div>
  );
};

export default UserInfo;
