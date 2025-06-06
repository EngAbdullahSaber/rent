import React from "react";
import CreateButton from "../../shared/CreateButton";

interface CreateButtonProps {
  setFlag: (flag: boolean) => void;
  flag: boolean;
}
const CreateBannerButton = ({ flag, setFlag }: CreateButtonProps) => {
  return (
    <div>
      <CreateButton
        entityName="Banner"
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
        onCreate={async (data, lang) => {
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
          // return await CreateDepatment(formData, lang);
        }}
        setFlag={setFlag}
        flag={flag}
        buttonShape={true}
      />
    </div>
  );
};

export default CreateBannerButton;
