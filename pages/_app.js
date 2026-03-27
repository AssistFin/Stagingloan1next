import Script from "next/script";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/layout";
import "../styles/globals.scss";
import { AuthProvider } from "../context/AuthContext";
import Loading from "../components/Loader";

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");

    const handleRouteChangeStart = () => setLoading(true);
    const handleRouteChangeComplete = () => setLoading(false);
    const handleRouteChangeError = () => setLoading(false);

    const handleRouteChange = (url) => {
      window.gtag('config', process.env.NEXT_PUBLIC_GTAG_ID, {
        page_path: url,
      });
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    router.events.on("routeChangeError", handleRouteChangeError);
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
      router.events.off("routeChangeError", handleRouteChangeError);
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  // ✅ Google Analytics script
  const GtagScripts = (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GTAG_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GTAG_ID}');
          `,
        }}
      />
    </>
  );

  // ✅ Google Tag Manager script
  const GTMScript = (
    <Script id="gtm-init" strategy="afterInteractive">
      {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-KVJ6T7KB');
      `}
    </Script>
  );

  // ✅ If using custom layout
  if (Component.getLayout) {
    return Component.getLayout(
      <AuthProvider>
        <Head>
          <title>LoanOne</title>
          <meta
            name="description"
            content="Seamless, Fast, and Transparent Loan Solutions – Tailored for Your Needs."
          />
          <link rel="icon" href="Icon_Green.jpg" />
        </Head>
        {GTMScript}
        {GtagScripts}
        <Loading loading={loading} />
        <Component
          {...pageProps}
          startLoading={startLoading}
          stopLoading={stopLoading}
        />
      </AuthProvider>
    );
  }

  // ✅ Default layout fallback
  return (
    <AuthProvider>
      <Head>
        <title>LoanOne</title>
        <meta
          name="description"
          content="Seamless, Fast, and Transparent Loan Solutions – Tailored for Your Needs."
        />
        <link rel="icon" href="Icon_Green.jpg" />
      </Head>
      {GTMScript}
      {GtagScripts}
      <Layout>
        <Loading loading={loading} />
        <Component
          {...pageProps}
          startLoading={startLoading}
          stopLoading={stopLoading}
          key={Component.name}
        />
      </Layout>
    </AuthProvider>
  );
}
