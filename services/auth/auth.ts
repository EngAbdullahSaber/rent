import { api } from "../axios";

export async function LogIn(data: any, lang: any) {
  let res = await api.post(`user/auth/login`, data, {
    headers: {
      "Accept-Language": lang,
    },
  });
  if (res) return res.data;
  else return false;
}
export async function ForgetPassword1(data: any, lang: any) {
  let res = await api.post(`user/auth/forget-password/send`, data, {
    headers: {
      "Accept-Language": lang,
    },
  });
  if (res) return res.data;
  else return false;
}
export const VerifyLogin = async (
  data: { username: string; code: string },
  config: { headers: { Authorization: string } }
) => {
  try {
    const response = await api.post(
      "user/auth/verify_user", // Replace with your actual API endpoint
      data, // Send the username and OTP code as data
      config // Send headers containing the token
    );
    return response.data; // Return the response data
  } catch (error) {
    throw error; // Throw error to be handled in the component
  }
};
export const VerifyPassword = async (
  data: { username: string; code: string },
  config: { headers: { Authorization: string } }
) => {
  try {
    const response = await api.post(
      "user/auth/forget-password/verify", // Replace with your actual API endpoint
      data, // Send the username and OTP code as data
      config // Send headers containing the token
    );
    return response.data; // Return the response data
  } catch (error) {
    throw error; // Throw error to be handled in the component
  }
};
export const CreateNewPassword = async (
  data: { username: string; code: string },
  config: { headers: { Authorization: string } }
) => {
  try {
    const response = await api.post(
      "user/auth/forget-password/change-password", // Replace with your actual API endpoint
      data, // Send the username and OTP code as data
      config // Send headers containing the token
    );
    return response.data; // Return the response data
  } catch (error) {
    throw error; // Throw error to be handled in the component
  }
};
export async function UploadImage(data: any, lang: any) {
  let res = await api.post(`user/images/upload_image`, data, {
    headers: {
      "Accept-Language": lang,
    },
  });
  if (res) return res.data;
  else return false;
}
export async function RemoveImage(id: any, lang: any) {
  let res = await api.delete(`user/images/delete_image/${id}`, {
    headers: {
      "Accept-Language": lang,
    },
  });
  if (res) return res.data;
  else return false;
}
export async function getDashBoardInfo(lang: any, data: any) {
  let res = await api.post(`user/home`, data, {
    headers: {
      "Accept-Language": lang,
    },
  });
  if (res) return res.data;
  else return false;
}
export async function translateText(
  text: string,
  targetLang: string
): Promise<string> {
  const response = await fetch("/api/translate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      q: text,
      target: targetLang,
    }),
  });

  const data = await response.json();
  return data.translatedText;
}

export const translateToArabic = async (text: string): Promise<string> => {
  try {
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
        text
      )}&langpair=en|ar`
    );
    const data = await response.json();
    return data.responseData.translatedText || text;
  } catch (error) {
    console.error("Translation failed:", error);
    return text;
  }
};
export const translateToEnglish = async (text: string): Promise<string> => {
  try {
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
        text
      )}&langpair=ar|en`
    );
    const data = await response.json();
    return data.responseData.translatedText || text;
  } catch (error) {
    console.error("Translation failed:", error);
    return text;
  }
};
