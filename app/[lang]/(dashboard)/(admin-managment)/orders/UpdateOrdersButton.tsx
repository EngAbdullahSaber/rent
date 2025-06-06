import React, { useState } from "react";
import UpdateButton from "../../shared/UpdateButton";

interface UpdateButtonProps {
  order: any; // Your order data type
  classes: any; // Your order data type
  setFlag: (flag: boolean) => void;
  flag: boolean;
}

const UpdateOrdersButton = ({
  order,
  flag,
  classes,

  setFlag,
}: UpdateButtonProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <UpdateButton
      entityName="Order"
      classes={classes}
      initialData={{
        order_date: "",
        provider_name: "",
        customer_name: "",
        status: "",
      }}
      fields={[
        {
          name: "provider_name",
          label: "Provider Name",
          type: "text",
          tab: "English",
          required: true,
          validation: {
            message: "Provider Name Is Required",
          },
        },
        {
          name: "customer_name",
          label: "Customer Name",
          type: "text",
          tab: "English",
          required: true,
          validation: {
            message: "Customer Name Is Required",
          },
        },
        {
          name: "status",
          label: "Status",
          type: "text",
          tab: "English",
          required: true,
          validation: {
            message: "Status Is Required",
          },
        },
        {
          name: "order_date",
          label: "Order Date",
          type: "textarea",
          tab: "English",
          required: true,
        },
      ]}
      currentData={{
        order_date: order?.order_date,
        provider_name: order?.provider_name,
        customer_name: order?.customer_name,
        status: order?.status,
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
      itemId={order.id}
    />
  );
};

export default UpdateOrdersButton;
