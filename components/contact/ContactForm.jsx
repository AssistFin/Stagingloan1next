const ContactForm = () => {
  return (
    <>
      <form action="#">
        <div className="row">
          <div className="col-6">
            <div className="single-input">
              <label htmlFor="name" style={{ color: "#1e3a8a" }}>
                Full Name
              </label>
              <input type="text" id="name" placeholder="What's your name?" required />
            </div>
          </div>

          <div className="col-6">
            <div className="single-input">
              <label htmlFor="email" style={{ color: "#1e3a8a" }}>
                Email Address
              </label>
              <input type="text" id="email" placeholder="What's your email?" required />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <div className="single-input">
              <label htmlFor="phone" style={{ color: "#1e3a8a" }}>
                Phone Number
              </label>
              <input type="text" id="phone" placeholder="(123) 480 - 3540" required />
            </div>
          </div>

          <div className="col-6">
            <div className="single-input">
              <label htmlFor="loan" style={{ color: "#1e3a8a" }}>
                Service interested in
              </label>
              <input type="text" id="loan" placeholder="Ex. Auto Loan, Home Loan" required />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="single-input">
              <label htmlFor="message" style={{ color: "#1e3a8a" }}>
                Message
              </label>
              <textarea
                id="message"
                placeholder="I would like to get in touch with you..."
                rows="6"
                required
              ></textarea>
            </div>
          </div>
        </div>

        {/* ✅ CONSENT — FIXED FOR SINGLE LINE */}
        <div className="row">
          <div className="col-12">
            <div className="single-input consent-inline">
              <input type="checkbox" id="consent" required />
              <label htmlFor="consent">
                I authorize Loanone to send notifications via SMS / RCS / Call / Email / WhatsApp.
              </label>
            </div>
          </div>
        </div>

        <div className="btn-area text-center">
          <button type="button" className="cmn-btn">
            Submit Your Inquiry
          </button>
        </div>
      </form>

      {/* ✅ OVERRIDE THEME CSS (THIS IS THE KEY) */}
      <style jsx>{`
        /* override .single-input behavior ONLY for consent */
        .single-input.consent-inline {
          display: flex !important;
          align-items: center;
          gap: 10px;
        }

        .single-input.consent-inline label {
          display: inline !important;
          margin: 0 !important;
          cursor: pointer;
          white-space: nowrap;
        }

        .single-input.consent-inline input[type="checkbox"] {
          width: 16px;
          height: 16px;
          margin: 0 !important;
          flex-shrink: 0;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default ContactForm;