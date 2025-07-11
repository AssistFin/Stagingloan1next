const ContactForm = () => {
  return (
    <>
      <form action="#">
        <div className="row">
          <div className="col-6">
            <div className="single-input">
              <label htmlFor="name" style={{color:'#1e3a8a'}}>Full Name</label>
              <input
                type="text"
                id="name"
                placeholder="What's your name?"
                required
              />
            </div>
          </div>
          <div className="col-6">
            <div className="single-input">
              <label style={{color:'#1e3a8a'}} htmlFor="email">Email Address</label>
              <input
                type="text"
                id="email"
                placeholder="What's your email?"
                required
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="single-input">
              <label style={{color:'#1e3a8a'}} htmlFor="phone">Phone Number</label>
              <input
                type="text"
                id="phone"
                placeholder="(123) 480 - 3540"
                required
              />
            </div>
          </div>
          <div className="col-6">
            <div className="single-input">
              <label style={{color:'#1e3a8a'}} htmlFor="loan">Service interested in</label>
              <input
                type="text"
                id="loan"
                placeholder="Ex. Auto Loan, Home Loan"
                required
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="single-input">
              <label style={{color:'#1e3a8a'}} htmlFor="message">Message</label>
              <textarea
                id="message"
                placeholder="I would like to get in touch with you..."
                cols="30"
                rows="10"
                required
              ></textarea>
            </div>
          </div>
        </div>
        <div className="btn-area text-center">
          <button type={"button"} className="cmn-btn">
            Submit Your Inquiry
          </button>
        </div>
      </form>
      
    </>
  );
};

export default ContactForm;
