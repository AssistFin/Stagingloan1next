import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { fetchLoanApplicationData } from "../api/loanApi"; // Import API function

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loanData, setLoanData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = Cookies.get("token");
    const storedUser = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;
  
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
  
      // Fetch loan application data every time user navigates
      const fetchData = async () => {
        try {
          const data = await fetchLoanApplicationData();
          if (data) {
            setLoanData(data);
          }
        } catch (error) {
          console.error("Failed to fetch loan data:", error);
        }
      };
  
      fetchData(); // Fetch fresh data on each page load
    }
  }, [router.asPath]); // ✅ Depend on router.asPath to trigger API call on navigation
  

  const login = async (userData, accessToken) => {
    setUser(userData);
    setToken(accessToken);

    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

    Cookies.set("token", accessToken, {
      expires,
      secure: true,
      sameSite: "Strict",
    });
    
    Cookies.set("user", JSON.stringify(userData), {
      expires,
      secure: true,
      sameSite: "Strict",
    });
    // Fetch loan data
    const loanData = await fetchLoanApplicationData();

    if (loanData?.next_step) {
      setLoanData(loanData);
      router.push(`/${loanData.next_step}`);
    } else {
      router.push('/applyforaloan');
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setLoanData(null);

    Cookies.remove("token");
    Cookies.remove("user");

    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, token, loanData, setLoanData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);

// ✅ Add default export
export default AuthContext;
