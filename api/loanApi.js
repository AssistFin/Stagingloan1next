import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/loans`;

const getAuthHeaders = () => {
  const token = Cookies.get("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getLoanApplicationId = async () => {
  let loanApplicationId = Cookies.get("loan_application_id");

  if (!loanApplicationId) {
    try {
      const response = await axios.get(`${BASE_URL}/apply`, getAuthHeaders());
      if (response.data && response.data.data.length > 0) {
        loanApplicationId = response.data.data[0].id;

        const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

        Cookies.set("loan_application_id", loanApplicationId, {
          expires,
          secure: true,
          sameSite: "Strict",
        });
      }
    } catch (error) {
      console.error("Error fetching loan application ID:", error);
      throw error;
    }
  }
  return loanApplicationId;
};

export const fetchLoanApplicationData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/apply`, getAuthHeaders());
    const data = await response.json();

        /*
        |--------------------------------------------------------------------------
        | CASE 2: Cooling period active (<45 days)
        |--------------------------------------------------------------------------
        */
        if (data.status && data.data2 === "noteligible") {
          return data.data;
        }

        /*
        |--------------------------------------------------------------------------
        | CASE 3: Eligible for new loan → redirect
        |--------------------------------------------------------------------------
        */
        if (data.status && data.data2 === "applyforaloan") {
          router.push("/applyforaloan");
          return null;
        }

        /*
        |--------------------------------------------------------------------------
        | CASE 1: Pending loan exists
        |--------------------------------------------------------------------------
        */
        if (data.status && data.data) {
          const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

          Cookies.set("loan_application_id", data.data.id, {
            expires,
            secure: true,
            sameSite: "Strict",
          });

          return data.data;
        }

    return null;
  } catch (error) {
    console.error('Failed to fetch loan data:', error);
    return null;
  }
};

export const getAadharAddress = async () => {
  try {
    const response = await fetch(`${BASE_URL}/getaadharaddress`, getAuthHeaders());
    const data = await response.json();

    if (data.status && data.data && data.data.length > 0) {
      return data.data[0]; 
    }
    return null;
  } catch (error) {
    console.error('Failed to fetch loan data:', error);
    return null;
  }
};

export const applyForLoan = async (loanAmount, loanPurpose, runningLoan) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/apply`,
      {
        loan_amount: loanAmount.replace(/\D/g, ""), 
        purpose_of_loan: loanPurpose,
        running_loan: runningLoan,
      },
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Error applying for loan:", error);
    throw error;
  }
};

export const submitProofOfAddress = async (personalDetails) => {
  try {
    const loan_application_id = await getLoanApplicationId();
    let data = {
        loan_application_id: loan_application_id,
        date_of_birth: personalDetails.dob,
        pin_code: personalDetails.pinCode,
        city: personalDetails.city,
        employment_type: personalDetails.employmentType,
        monthly_income: personalDetails.monthlyIncomeNumber,
        income_received_in: personalDetails.incomeReceivedIn,
    };

    const response = await axios.post(
      `${BASE_URL}/personal-details`,
      data,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Error submitting proof of address:", error);
    throw error;
  }
};

export const saveAddressDetails = async (formData) => {
  try {
    const loan_application_id = await getLoanApplicationId();
    formData.loan_application_id = loan_application_id;
    const response = await axios.post(`${BASE_URL}/address-details`, formData, getAuthHeaders());

    return response.data;
  } catch (error) {
    console.error("Error saving address details:", error);
    throw error;
  }
};

export const saveEmploymentDetails = async (formData) => {
  try {
    const loan_application_id = await getLoanApplicationId();
    formData.loan_application_id = loan_application_id;
    const response = await axios.post(
      `${BASE_URL}/employment-details`,
      formData,
      getAuthHeaders()
    );

    return response.data;
  } catch (error) {
    console.error("Error saving employment details:", error);
    throw error;
  }
};

export const submitBankDetails = async (formData) => {
  try {
    const loan_application_id = await getLoanApplicationId();
    const token = Cookies.get("token");
    formData.append("loan_application_id", loan_application_id);
    const response = await axios.post(`${BASE_URL}/bank-details`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error submitting bank details:", error);
    throw error.response ? error.response.data : error.message;
  }
};

export const fetchLoanApprovalData = async () => {
  try {
    const applicationData = await fetchLoanApplicationData();
    if(applicationData) {
      const data = {
        loan_application_id: applicationData.id, 
        user_id: applicationData.user_id, 
        loan_number: applicationData.loan_no, 
      };
      const response = await axios.post(`${BASE_URL}/approval`, data, getAuthHeaders());

      return response.data;
    }

    return null;
  } catch (error) {
    console.error('Error fetching loan approval data:', error);
    throw error;
  }
};

export const fetchLoanDisbursalData = async () => {
  try {
    const applicationData = await fetchLoanApplicationData();
    const data = {
      loan_application_id: applicationData.id, 
      user_id: applicationData.user_id, 
    };
    const response = await axios.post(`${BASE_URL}/disbursal`, data, getAuthHeaders());

    return response.data;
  } catch (error) {
    console.error('Error fetching loan disbursal data:', error);
    throw error;
  }
};

export const acceptLoan = async (file_name) => {
  try {
    const applicationData = await fetchLoanApplicationData();
    const data = {
      loan_application_id: applicationData.id, 
      user_id: applicationData.user_id, 
      loan_number: applicationData.loan_no, 
      file_name
    };
    const response = await axios.post(`${BASE_URL}/acceptance`, data, getAuthHeaders());

    return response.data;
  } catch (error) {
    console.error('Error accepting loan:', error);
    throw error;
  }
};

export const updateLoanStep = async (currentStep, nextStep) => {
  try {
    const loan_application_id = await getLoanApplicationId();
    const data = {
      loan_application_id,
      current_step: currentStep,
      next_step: nextStep
    };

    const response = await axios.post(
      `${BASE_URL}/update-loan-step`,
      data,
      getAuthHeaders()
    );

    return response.data;
  } catch (error) {
    console.error("Error updating loan step:", error);
    throw error;
  }
};

export const fetchLoanBankDetails = async () => {
  try {
    const data = await fetchLoanApplicationData(); // same helper
    if (data) {
      return data.bank_details;
    }
    return null;
  } catch (err) {
    console.error("Failed to fetch bank details", err);
    return null;
  }
};

export const submitEnachMandate = async (payload) => {
  try {
        const applicationData = await fetchLoanApplicationData();
        const data1 = {
        loan_application_id: applicationData.id, 
        user_id: applicationData.user_id, 
        loan_number: applicationData.loan_no, 
        payload
      };
      const response = await axios.post(`${BASE_URL}/enach`, data1, getAuthHeaders());
      return response.data;
  } catch (err) {
    console.error("Failed to submit ENACH", err);
    return null;
  }
};

export const getEnachStatus = async () => {
  try {
    const response = await fetch(`${BASE_URL}/apply`, getAuthHeaders());
    const data = await response.json();
    
    if (data.status == true && data.data) {
      if(data.data.enachData?.status == 'ACTIVE')
      {
          const applicationData = await fetchLoanApplicationData();
            const data1 = {
            loan_application_id: applicationData.id, 
            current_step: 'cashfreeredirect', 
            next_step: 'loandisbursal',
          };
          const response = await axios.post(`${BASE_URL}/update-loan-step`, data1, getAuthHeaders());
      }
      return data.data.enachData?.status || null;
    }else{
      return 'INITIALIZED';
    }
  } catch (err) {
    console.error("Error fetching ENACH status:", err);
    return null;
  }
};

export const checkReturnStatus = async () => {
  try {
    const applicationData = await fetchLoanApplicationData();
    const data1 = {
      loan_application_id: applicationData.id, 
      user_id: applicationData.user_id, 
      loan_number: applicationData.loan_no,
    };
    const response = await axios.post(`${BASE_URL}/aauserresponse`, data1, getAuthHeaders());
    const data = response.data;

    if (data.status == true && data.aaData) {
      if(data.aaData == "success")
      {
          const applicationData = await fetchLoanApplicationData();
            const data2 = {
            loan_application_id: applicationData.id, 
            current_step: 'aareturnurl', 
            next_step: 'loanstatus',
          };
          const response = await axios.post(`${BASE_URL}/update-loan-step`, data2, getAuthHeaders());
          return data.aaData;
      }
      return data.aaData || null;
    }else{
      return 'INITIALIZED';
    }
  } catch (error) {
    console.error('Error accepting AA by digitap:', error);
    throw error;
  }
};

export const getBankFromAA = async () => {
  try {
    const applicationData = await fetchLoanApplicationData();
    const data1 = {
      loan_application_id: applicationData.id
    };
    const response = await axios.post(`${BASE_URL}/get-bank-from-aa`, data1, getAuthHeaders());
    const data = response.data;
    return data.data || null;
  } catch (error) {
    console.error("AA Bank Details API error:", error);
    return { status: false, message: "Network error" };
  }
}

export async function submitAABankDetails(payload) {
  try {
    const res = await axios.post(`${BASE_URL}/submit-aa-bank-details`, payload, getAuthHeaders());

    // Axios always returns data in res.data
    const data = res.data;
    console.log("API Response:", data);

      if (data?.status == true) {
            const applicationData = await fetchLoanApplicationData();
              const data1 = {
              loan_application_id: applicationData.id, 
              current_step: 'bankconfirmation', 
              next_step: 'loanstatus',
            };
            const response = await axios.post(`${BASE_URL}/update-loan-step`, data1, getAuthHeaders());
            return {
              status: true,
              message: data.message || "Success",
            };
      }

      // If status is false
      return {
        status: false,
        message: data?.message || "Something went wrong!!",
      };

  } catch (error) {
    console.error("Submit API error:", error);
    return { status: false, message: "Network error" };
  }
}

