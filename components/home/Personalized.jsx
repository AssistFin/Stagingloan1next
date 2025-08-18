import Image from "next/image";
import Link from "next/link";
import personalized from "/public/images/personalized.png";

const Personalized = () => {
  return (
    <section className="personalized">
      <div className="overlay">
        <div className="container  wow fadeInUp">
          <div className="row d-flex justify-content-between">
            <div className="col-lg-6 col-xl-5 d-flex align-items-center justify-content-end">
              <div className="img-area">
                <Image src={personalized} alt="image" />
              </div>
            </div>
            <div className="col-lg-6 col-xl-5 pt-120 pb-120">
              <div className="section-text">
                <h3 className="title" style={{fontSize: '27px'}}>Need a Personalized Solution?</h3>
                <p>We understand every professional’s needs are unique. Connect with us and we’ll craft a loan
solution that fits your salary, lifestyle, and financial goals.</p>
                <p><strong>Basic Eligibility:</strong></p>
                <ul class="list">
                <li class="list-item d-flex align-items-center">
                <span class="check d-flex align-items-center justify-content-center"></span><span>Minimum monthly salary: ₹20,000+</span></li>
                <li class="list-item d-flex align-items-center">
                <span class="check d-flex align-items-center justify-content-center"></span><span>Age: 21 – 55 years</span></li>
                <li class="list-item d-flex align-items-center">
                <span class="check d-flex align-items-center justify-content-center"></span><span>Salaried with a stable income source</span></li>
                <li class="list-item d-flex align-items-center">
                <span class="check d-flex align-items-center justify-content-center"></span><span>Valid bank account &amp; KYC documents</span></li>
                </ul>
              </div>
              {/* <Link href="/register" className="cmn-btn">
                Apply for a loan
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Personalized;