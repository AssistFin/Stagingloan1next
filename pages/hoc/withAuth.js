import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import AuthContext from "../../context/AuthContext";

const withAuth = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const { authToken } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
      if (!authToken) {
        router.push("/"); // Redirect to login if not authenticated
      }
    }, [authToken, router]);

    if (!authToken) {
      return null; // Prevent component from rendering while redirecting
    }

    return <WrappedComponent {...props} />;
  };

  // ✅ Add display name for debugging
  AuthComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

  return AuthComponent;
};

export default withAuth;
