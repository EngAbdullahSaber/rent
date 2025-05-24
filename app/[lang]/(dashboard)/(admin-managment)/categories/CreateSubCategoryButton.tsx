import React from "react";
import CreateButton from "../../shared/CreateButton";

interface CreateButtonProps {
  setFlag: (flag: boolean) => void;
  flag: boolean;
}
const CreateSubCategoryButton = ({ flag, setFlag }: CreateButtonProps) => {
  return (
    <div>
      <CreateButton
        entityName="Category"
        initialData={{
          nameEn: "",
          nameAr: "",
          categoryId: "",
          file: null,
        }}
        fields={[
          {
            name: "file",
            label: "SubCategory Icon",
            type: "image",
            tab: "English",
            required: true,
            validation: {
              message: "SubCategory Icon Is Required",
            },
          },
          {
            name: "nameEn",
            label: "SubCategory Name",
            type: "text",
            tab: "English",
            required: true,
            validation: {
              minLength: 2,
              maxLength: 50,
            },
          },
          {
            name: "nameAr",
            label: "SubCategory Name",
            type: "text",
            tab: "Arabic",
            required: true,
            validation: {
              minLength: 2,
              maxLength: 50,
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
        buttonShape={false}
      />
    </div>
  );
};

export default CreateSubCategoryButton;
