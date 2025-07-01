import { useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export default function useAuthCheck() {
  const token = Cookies.get("token");
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, [token, router]);
}
