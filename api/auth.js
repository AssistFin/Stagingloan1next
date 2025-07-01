import axios from "axios";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`;

export const loginWithMobile = async (mobile) => {
  return axios.post(`${API_BASE_URL}/loginwithmobile`, { mobile });
};

export const verifyOTP = async (mobile, otp) => {
  return axios.post(`${API_BASE_URL}/verify-login-otp`, { mobile, otp });
};
