// import LoginPage from "./login";
import HowItWork from "../components/accountDetail/HowItWork";
import Planning from "../components/common/Planning";
import Faq from "../components/faq/Faq";
import Features from "../components/home/Features";
import HomeBanner from "../components/home/HomeBanner";
import Personalized from "../components/home/Personalized";
import FeaturesPage from "./FeaturesPage";
import ProductsSection from "./ProductsSection";

export default function Index({ startLoading, stopLoading }) {
  return (
    <>
      {/* Main Page Content */}
      <HomeBanner startLoading={startLoading} stopLoading={stopLoading} />

      {/* Login Component */}
      {/* <LoginPage /> */}
      <FeaturesPage />
      {/* Other Sections */}
      <Features />
      <ProductsSection />
      <HowItWork />
      <Planning />
      <Personalized />
      <Faq />
    </>
  );
}
