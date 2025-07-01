/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useRouter } from "next/router"; // Import Next.js router
import styles from "../styles/KFS.module.css";

const KFS = () => {
  const kfsRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const router = useRouter(); // Initialize router

  const kfsData = {
    companyName: "LOANONE FINANCE PRIVATE LIMITED",
    logo: "/logoloann.png", // Make sure this is inside the "public" folder
    date: "08/08/2024",
    applicantName: "Akshay Awasthi",
    loanAmount: "₹10,000",
    interestRate: "60% per annum (3-month tenure)",
    processingFee: "₹1,000",
    gst: "₹180",
    totalCharges: "₹1,180",
    netDisbursedAmount: "₹8,820",
    totalRepayAmount: "₹11,016",
    annualPercentageRate: "95.4%",
    loanTenure: "3 Months",
    repaymentFrequency: "Monthly",
    emiAmount: "₹3,672",
    penalInterest: "36.5% annually",
    coolingOffPeriod: "3 Days",
    grievanceOfficer: "Samir Sethi",
    officerAddress: "4338, Padam Singh Road, Karol Bagh, New Delhi - 110005",
    officerPhone: "+91 98999-85495",
  };

  const downloadPDF = async () => {
    setIsDownloading(true);

    try {
      const pdf = new jsPDF();
      const element = kfsRef.current;

      if (!element) {
        throw new Error("Invalid element reference");
      }

      // Load logo image
      const logoUrl = window.location.origin + kfsData.logo;
      const logoBase64 = await loadImage(logoUrl);

      // Add heading
      pdf.setFontSize(20);
      pdf.text("Key Fact Statement (KFS)", 70, 20);

      // Add logo if successfully loaded
      if (logoBase64) {
        pdf.addImage(logoBase64, "PNG", 75, 25, 60, 30); // Adjust size & position
      }

      // Add company name
      pdf.setFontSize(14);
      pdf.text(kfsData.companyName, 65, 70);

      // Hide download button before capturing screenshot
      const downloadButton = element.querySelector(".downloadButton");
      if (downloadButton) downloadButton.style.display = "none";

      // Capture content as image
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      // Add captured content to PDF
      pdf.addImage(imgData, "PNG", 10, 80, 190, 0);

      // Save PDF
      pdf.save("KFS_Document.pdf");

      // Restore button visibility
      if (downloadButton) downloadButton.style.display = "block";
    } catch (error) {
      console.error("Error generating PDF:", error);
    }

    setIsDownloading(false);
  };

  // Load an image and return Base64
  const loadImage = async (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "Anonymous"; // Prevents CORS issues
      img.src = src;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      };
      img.onerror = (err) => reject(err);
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.card} ref={kfsRef}>
        <div className={styles.KFS}>
          <h1 className={styles.heading}>Key Fact Statement (KFS)</h1>
          <img src={kfsData.logo} alt="Company Logo" width={100} height={100} className={styles.logo} />
        </div>
        <p><strong>{kfsData.companyName}</strong></p>
        <p><strong>Date:</strong> {kfsData.date}</p>
        <p><strong>Applicant Name:</strong> {kfsData.applicantName}</p>

        <div className={styles.kfsDetails}>
          <p><strong>Loan Amount:</strong> {kfsData.loanAmount}</p>
          <p><strong>Interest Rate:</strong> {kfsData.interestRate}</p>
          <p><strong>Processing Fee:</strong> {kfsData.processingFee}</p>
          <p><strong>GST:</strong> {kfsData.gst}</p>
          <p><strong>Total Charges:</strong> {kfsData.totalCharges}</p>
          <p><strong>Net Disbursed Amount:</strong> {kfsData.netDisbursedAmount}</p>
          <p><strong>Total Repayable Amount:</strong> {kfsData.totalRepayAmount}</p>
          <p><strong>Annual Percentage Rate:</strong> {kfsData.annualPercentageRate}</p>
          <p><strong>Loan Tenure:</strong> {kfsData.loanTenure}</p>
          <p><strong>Repayment Frequency:</strong> {kfsData.repaymentFrequency}</p>
          <p><strong>EMI Amount:</strong> {kfsData.emiAmount}</p>
          <p><strong>Penal Interest for Delay:</strong> {kfsData.penalInterest}</p>
          <p><strong>Cooling Off Period:</strong> {kfsData.coolingOffPeriod}</p>
        </div>

        <h3>Grievance Officer</h3>
        <p><strong>Name:</strong> {kfsData.grievanceOfficer}</p>
        <p><strong>Address:</strong> {kfsData.officerAddress}</p>
        <p><strong>Phone:</strong> {kfsData.officerPhone}</p>

       <div style={{display:'flex', flexDirection:'column'}}>
       <button className={`${styles.button} downloadButton`} onClick={downloadPDF} disabled={isDownloading}>
          {isDownloading ? "Downloading..." : "Download PDF"}
        </button>

        {/* Button to navigate to Sanction Page */}
        <button
          className={styles.redirectButton}
          onClick={() => router.push("/sanction")}
        >
          View Sanction Details
        </button>
       </div>
      </div>
    </div>
  );
};

export default KFS;