import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/layout";
import "../styles/globals.scss";
import { AuthProvider } from "../context/AuthContext";
import Loading from "../components/Loader";  // Import the Loading component

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Show loader
  const startLoading = () => setLoading(true);

  // Hide loader
  const stopLoading = () => setLoading(false);

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");

    // Add route change event listeners
    const handleRouteChangeStart = () => setLoading(true);
    const handleRouteChangeComplete = () => setLoading(false);
    const handleRouteChangeError = () => setLoading(false);

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    router.events.on("routeChangeError", handleRouteChangeError);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
      router.events.off("routeChangeError", handleRouteChangeError);
    };
  }, [router]);

  if (Component.getLayout) {
    return Component.getLayout(
      <AuthProvider>
        <Head>
          <title>LoanOne</title>
          <meta name="description" content="Seamless, Fast, and Transparent Loan Solutions – Tailored for Your Needs." />
          <link rel="icon" href="favicon.ico" />
        </Head>
        <Loading loading={loading} />  {/* Loader for route changes */}
        <Component {...pageProps} startLoading={startLoading} stopLoading={stopLoading} />
      </AuthProvider>
    );
  }

  return (
    <AuthProvider>
      <Head>
        <title>LoanOne</title>
        <meta name="description" content="Seamless, Fast, and Transparent Loan Solutions – Tailored for Your Needs." />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <Layout>
        <Loading loading={loading} />  {/* Loader for route changes */}
        <Component {...pageProps} startLoading={startLoading} stopLoading={stopLoading} key={Component.name} />
      </Layout>
    </AuthProvider>
  );
}
