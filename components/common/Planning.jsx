import Link from "next/link";
import planning_data from "../../data/planningData";
import PlaningCard from "../cards/PlaningCard";

const Planning = () => {
  return (
    <section className="financial-planning">
      <div className="overlay pt-120 pb-120">
        <div className="container wow fadeInUp">
          {/* Financial Planning Section (Left Side) */}
          <div className="row d-flex justify-content-center align-items-center">
            <div>
              <div className="section-text">
                <h5 className="sub-title" style={{fontSize: '27px'}}>Financial Planning</h5>
                <h2 className="title" style={{fontSize: '27px'}}>
                  Let&apos;s plan your finances the right way
                </h2>
                <p>
                  Lending that doesn&apos;t weigh you down. We know how hard it is
                  to start something new, that&apos;s why we have the perfect plan
                  for you.
                </p>
              </div>
              {/* <Link href="/register" className="cmn-btn">
                Apply for a loan
              </Link> */}
            </div>
          </div>

          {/* Loan Options Section (Full Width Below) */}
          <div className="row g-4 mt-5 justify-content-center">
            {planning_data.map((singlePlanning) => (
              <div
                key={singlePlanning.id}
                className="col-xl-3 col-lg-6 col-md-6 col-sm-12"
              >
                <PlaningCard singlePlanning={singlePlanning} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Planning;