import React, { useState } from "react";
import UpdateButton from "../../shared/UpdateButton";

interface UpdateButtonProps {
  banner: any; // Your partner data type
  classes: any; // Your partner data type
  setFlag: (flag: boolean) => void;
  flag: boolean;
}

const UpdateBannerButton = ({
  banner,
  flag,
  classes,
  setFlag,
}: UpdateButtonProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <UpdateButton
      entityName="Banner"
      classes={classes}
      initialData={{
        titleEn: "",
        titleAr: "",
        link: "",

        file: null,
      }}
      fields={[
        {
          name: "file",
          label: "Banner Image",
          type: "image",
          tab: "English",
          required: true,
          validation: {
            message: "Banner Image Is Required",
          },
        },

        {
          name: "titleEn",
          label: "Banner Title",
          type: "text",
          tab: "English",
          required: true,
          validation: {
            minLength: 2,
            maxLength: 50,
          },
        },

        {
          name: "titleAr",
          label: "Banner Title",
          type: "text",
          tab: "Arabic",
          required: true,
          validation: {
            minLength: 2,
            maxLength: 50,
          },
        },
        {
          name: "link",
          label: "Banner Link",
          type: "alt_text",
          tab: "English",
          validation: {
            url: true,
            message: "Please enter a valid URL",
          },
        },
      ]}
      currentData={{
        titleEn: banner?.title?.en,
        titleAr: banner?.title?.ar,
        link: banner?.link,
        file: banner?.image_url,
      }}
      onUpdate={async (data, id, lang) => {
        const formData = new FormData();
        // Object.entries(data).forEach(([key, value]) => {
        //   if (value !== null) {
        //     const match = key.match(/^(.*)(En|Ar)$/); // Check if key ends in En or Ar
        //     if (match) {
        //       const base = match[1]; // e.g., "description", "bio", "meta_title"
        //       const lang = match[2].toLowerCase(); // "en" or "ar"
        //       formData.append(`${base}[${lang}]`, value as string | Blob);
        //     } else {
        //       formData.append(key, value as string | Blob);
        //     }
        //   }
        // });
        // return await UpdateDepatments(formData, id, lang);
      }}
      setFlag={setFlag}
      flag={flag}
      setOpen={setOpen}
      open={open}
      itemId={banner.id}
    />
  );
};

export default UpdateBannerButton;
