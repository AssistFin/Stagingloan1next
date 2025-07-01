import axios from "axios";
import Cookies from "js-cookie";
import { getLoanApplicationId } from "./loanApi";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/kyc`;
const BASE_URL1 = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`;
// Get Auth Headers
const getAuthHeaders = () => {
  const token = Cookies.get("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
};

// Verify PAN API
export const verifyPan = async (panNumber, name, dob) => {
  try {
    const loan_application_id = await getLoanApplicationId();
    const vdob = dob;  
    const [year, month, day] = vdob.split("-");  
    const formattedDob = `${day}/${month}/${year}`;
    
    const data = { 
      pan_number: panNumber, 
      name, 
      dob: formattedDob, 
      loan_application_id
    };

    const response = await axios.post(
      `${BASE_URL}/pan/verify`,
      data,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Error verifying PAN:", error);
    throw error;
  }
};

// Send Aadhaar OTP
export const sendAadhaarOtp = async (aadharNumber) => {
    try {
      const loan_application_id = await getLoanApplicationId();
      const data = { 
        aadhar_number: aadharNumber, 
        loan_application_id
      };
      const response = await axios.post(
        `${BASE_URL}/aadhaar/otp`,
        data,
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      console.error("Error sending Aadhaar OTP:", error);
      throw error;
    }
  };

  // Verify OTP
export const verifyAadharOtp = async (otp, referenceId) => {
    try {
      const loan_application_id = await getLoanApplicationId();
      const data = { 
        otp, 
        reference_id: referenceId,
        loan_application_id
      };

      const response = await axios.post(
        `${BASE_URL}/aadhaar/otp/verify`,
        data,
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      console.error("Error verifying OTP:", error);
      throw error;
    }
  };


    // Verify OTP
export const getUserProfile = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL1}/users/user-info`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};