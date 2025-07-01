import Image from "next/image";
import about_img_1 from "/public/images/about-img-1.png";
import about_img_2 from "/public/images/about-img-2.png";
import about_img_3 from "/public/images/about-img-3.png";

const Hero = () => {
  return (
    <section className="about-section">
      <div className="overlay pt-120 pb-120">
        <div className="container  wow fadeInUp">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="text-area">
                <h5 className="sub-title" style={{ fontSize: "27px" }}>
                  About Us
                </h5>
                <p style={{ color: "#1e3a8a" }}>
                  LoanOne is the flagship brand of AssistFin Technologies
                  Private Limited, a cutting-edge fintech platform
                  revolutionizing the way individuals access credit. At LoanOne,
                  we are driven by innovation, simplicity, and transparency to
                  make borrowing fast, easy, and stress-free. We empower
                  customers to meet their financial needs — whether personal,
                  educational, or emergency — at the click of a button. Backed
                  by advanced technology, data-driven algorithms, and a
                  customer-first approach, LoanOne offers personalized loan
                  solutions tailored to each individual’s financial profile. Our
                  digital lending platform ensures quick approvals, minimal
                  documentation, and a fully paperless experience. With a focus
                  on financial inclusion, we strive to make credit more
                  accessible, affordable, and efficient for everyone. Whether
                  you are looking to fund your goals or manage an urgent
                  expense, LoanOne is your trusted digital partner in navigating
                  your financial journey.{" "}
                </p>
                <h2
                  className="title"
                  style={{ fontSize: "27px", marginTop: "10px" }}
                >
                  Our Story & Vision
                </h2>
                <p style={{ color: "#1e3a8a" }}>
                  At LoanOne, we aim to redefine how individuals and businesses
                  access financial resources. Founded with the vision to empower
                  our clients with flexible loan products, our platform provides
                  transparent and efficient solutions to meet their unique
                  financial needs.
                </p>
                <p style={{ color: "#1e3a8a" }}>
                  Our innovative fintech platform combines cutting-edge
                  technology and personalized services to offer loans that are
                  easy to access and tailored to meet your specific goals,
                  whether personal or professional.
                </p>
                <h2
                  className="title"
                  style={{ fontSize: "27px", marginTop: "10px" }}
                >
                  Mission Statement :
                </h2>
                <p style={{ color: "#1e3a8a" }}>
                  To simplify the lending experience by providing accessible,
                  secure, and customized financial solutions.
                </p>
                <h6
                  style={{
                    fontSize: "20px",
                    marginTop: "10px",
                    color: "#1e3a8a",
                  }}
                >
                  LoanOne, the flagship brand of AssistFin Technologies Private
                  Limited, leverages cutting-edge technology to simplify access
                  to credit. By combining innovation with a deep understanding
                  of customer needs, LoanOne offers seamless, efficient, and
                  tailored financial solutions designed to support individuals
                  at every stage of their financial journey.
                </h6>
                <h5
                  style={{
                    fontSize: "24px",
                    marginTop: "10px",
                    color: "#1e3a8a",
                  }}
                >
                  Address :
                </h5>
                <p style={{ color: "#1e3a8a" }}>
                  AssistFin Technologies Private Limited
                </p>
                <p style={{ color: "#1e3a8a" }}>
                  CIN No. U62090UP2024PTC209235
                </p>
                <p style={{ color: "#1e3a8a" }}>
                  Reg. Off: T28-1802, Nirala Estate, Plot No. Gh4, Techzone IV,
                  Gautam Buddha Nagar, Noida, Uttar Pradesh-201306
                </p>
                <p style={{ color: "#1e3a8a" }}>
                  Corp. Off: B-233, 2nd Floor, Pacific Business Park, Sahibabad,
                  Ghaziabad, Uttar Pradesh- 201306
                </p>
                <p style={{ color: "#1e3a8a" }}>Email: info@assistfin.com</p>
                <p style={{ color: "#1e3a8a" }}>Cont: +917700840543</p>
              </div>
              {/* <div className="row cus-mar">
                <div className="col-xl-4 col-md-4">
                  <div className="count-content text-center">
                    <div className="count-number">
                      <h4 className="counter">98</h4>
                      <h4 className="static">%</h4>
                    </div>
                    <p>Customer satisfaction</p>
                  </div>
                </div>
                <div className="col-xl-4 col-md-4">
                  <div className="count-content text-center">
                    <div className="count-number ">
                      <h4 className="counter">250</h4>
                      <h4 className="static">M</h4>
                    </div>
                    <p>Monthly active users</p>
                  </div>
                </div>
                <div className="col-xl-4 col-md-4">
                  <div className="count-content text-center">
                    <div className="count-number ">
                      <h4 className="counter">100</h4>
                      <h4 className="static">K</h4>
                    </div>
                    <p>New Users per week</p>
                  </div>
                </div>
              </div> */}
            </div>
            {/* <div className="col-lg-6 text-end">
              <div className="img-area">
                <Image className="img-1" src={about_img_1} alt="image" />
                <Image className="img-2" src={about_img_2} alt="image" />
                <Image className="img-3" src={about_img_3} alt="image" />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
