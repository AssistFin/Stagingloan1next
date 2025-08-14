import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/loans`;
const NEW_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`;
// Get Auth Headers
const getAuthHeaders = () => {
  const token = Cookies.get("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const initiateLoanPayment = async (paymentData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/initiate-payment`,
      paymentData,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Payment initiation error:", error);
    throw error.response?.data || { message: "Payment failed" };
  }
};


export const verifyLoanPayment = async (orderId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/payment/verify?order_id=${orderId}`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Payment verification error:", error);
    throw error.response?.data || { message: "Payment verification failed" };
  }
};

export const verifyLinkPayment = async (orderId) => {
  try {
    const response = await axios.get(
      `${NEW_BASE_URL}/payment/verify?order_id=${orderId}`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Payment verification error:", error);
    throw error.response?.data || { message: "Payment verification failed" };
  }
};