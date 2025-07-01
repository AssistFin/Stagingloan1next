import axios from "axios";
import Cookies from "js-cookie";
import { getLoanApplicationId } from "./loanApi";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/loans/documents`;

export const uploadSelfie = async (formData) => {
  try {
    const loan_application_id = await getLoanApplicationId();
    const token = Cookies.get("token");
    formData.append("loan_application_id", loan_application_id);
    const response = await axios.post(BASE_URL, formData, {
      headers: {
        Authorization: `Bearer ${token}`, 
        "Content-Type": "multipart/form-data", 
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error uploading selfie:", error);
    throw error;
  }
};
