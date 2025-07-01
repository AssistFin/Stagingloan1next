import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import Social from "../social/Social";
import footer_Illu_left from "/public/images/footer-Illu-left.png";
import footer_Illu_right from "/public/images/footer-Illu-right.png";
import Logo from "/public/images/logo.png";

const Footer = () => {
  return (
    <div className="footer-section row">
  <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3">
    <div className="footer-box">
      <Link href="/" className="logo">
        {/* <Image src={Logo} alt="logo" /> */}
        <Image
            src="/Logo_Color@4x.png"
            alt="LoanOne Logo"
            width={193}   // adjust these to a scaled size
            height={26}   // adjust these to a scaled size
          />
      </Link>
      <p>
        LoanOne, the flagship brand of AssistFin Technologies Private Limited, leverages cutting-edge technology to simplify access to credit. By combining innovation with a deep understanding of customer needs.
      </p>
      <div className="social-link d-flex align-items-center">
        {/* Socials links here */}
        <Social
          items={[
            [FaFacebookF, "/"],
            [FaTwitter, "/"],
            [FaLinkedinIn, "https://www.linkedin.com/company/loanone/about/"],
            [FaInstagram, "/"],
          ]}
        />
      </div>
    </div>
  </div>
  <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3">
    <div className="footer-box">
      <h5>Company</h5>
      <ul className="footer-link">
        <li><Link href="/privacy-policy">Privacy Policy</Link></li>
        <li><Link href="/refundpolicy">Refund Policy</Link></li>
        <li><Link href="/cancellationpolicy">Cancellation Policy</Link></li>
        <li><Link href="/partnergrmpolicy">Partner GRM Policy</Link></li>
        <li><Link href="/grievance">Grievance Redressal Policy</Link></li>
      </ul>
    </div>
  </div>
  <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3">
    <div className="footer-box">
      <h5>Products</h5>
      <ul className="footer-link">
        <li><Link href="/personalLoan">Personal Loan</Link></li>
        <li><Link href="/codeofconduct">Code of Conduct</Link></li>
        <li><Link href="/terms&conditions">Terms & Conditions</Link></li>
      </ul>
      <h5 style={{marginTop:'20px'}}>Contact Info</h5>
      <ul className="footer-link">
      <p>Email: 	care@loanone.in </p>
      <p>Contact Us: 	9211717788 </p>
      </ul>
    </div>
  </div>
  <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3">
    <div className="footer-box">
      <h5>Address Info</h5>
      <ul className="footer-link">
        <li>
          <p>AssistFin Technologies Private Limited</p>
          <p>CIN No. U62090UP2024PTC209235</p>
          <p>Reg. Off: T28-1802, Nirala Estate, Plot No. Gh4, Techzone IV, Gautam Buddha Nagar, Noida, Uttar Pradesh-201306</p>
          <p>Corp. Off: B-233, 2nd Floor, Pacific Business Park, Sahibabad, Ghaziabad, Uttar Pradesh- 201306</p>
        </li>
      </ul>
    </div>
  </div>
  <div className="row mt-3">
          <div className="col-12">
            <div className="footer-bottom">
              <div className="left">
                <p>
                  {" "}
                  Copyright © <Link href="index">LoanOne</Link> | Designed by{" AssistFin "}
                  </p>
              </div>
              <div className="right">
                <Link href="/privacy-policy" className="cus-bor">
                  Privacy{" "}
                </Link>
                <Link href="terms&conditions">Terms &amp; Condition </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Footer;