const mainPortfolioTemplate = document.createElement("template");

class mainPortfolio extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `
    <section class="section-padding single-portfolio-area">
        <div class="container">
          <div class="row">
            <div class="col-lg-5">
              <div class="section-heading heading-left mb-0">
                <span class="subtitle">Branding, Creative</span>
                <h3 class="title">Creative agency</h3>
              </div>
              <p>
                From the designers and engineers who are creating the next
                generation of web and mobile experiences, to anyone putting a
                website together for the first time. We provide elegant
                solutions that set new standards for online publishing.
              </p>
              <p>
                Digital technology has made our world more transparent and
                interconnected, posing new challenges and opportunities for
                every business. A holistic, user-centric perspective is what
                truly sets one apart.
              </p>
              <a href="contact.html" class="axil-btn btn-fill-primary"
                >Get it Now</a
              >
            </div>
            <div class="col-lg-6 offset-xl-1">
              <div class="why-choose-us">
                <div class="section-heading heading-left">
                  <h3 class="title">We delivered</h3>
                  <p>
                    Digital technology has made our world more transparent and
                    interconnected, posing new challenges and opportunities for
                    every business.
                  </p>
                </div>
                <div class="accordion" id="choose-accordion">
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                      <button
                        class="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        <i class="far fa-compress"></i> Strategy
                      </button>
                    </h2>
                    <div
                      id="collapseOne"
                      class="accordion-collapse collapse show"
                      aria-labelledby="headingOne"
                      data-bs-parent="#choose-accordion"
                    >
                      <div class="accordion-body">
                        Aenean hendrerit laoreet vehicula. Nullam convallis
                        augue at enim gravida pellentesque.
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="headingTwo">
                      <button
                        class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                      >
                        <i class="far fa-code"></i>Design
                      </button>
                    </h2>
                    <div
                      id="collapseTwo"
                      class="accordion-collapse collapse"
                      aria-labelledby="headingTwo"
                      data-bs-parent="#choose-accordion"
                    >
                      <div class="accordion-body">
                        Aenean hendrerit laoreet vehicula. Nullam convallis
                        augue at enim gravida pellentesque.
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="headingThree">
                      <button
                        class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree"
                        aria-expanded="false"
                        aria-controls="collapseThree"
                      >
                        <i class="fal fa-globe"></i>Development
                      </button>
                    </h2>
                    <div
                      id="collapseThree"
                      class="accordion-collapse collapse"
                      aria-labelledby="headingThree"
                      data-bs-parent="#choose-accordion"
                    >
                      <div class="accordion-body">
                        Aenean hendrerit laoreet vehicula. Nullam convallis
                        augue at enim gravida pellentesque.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define("mainportfolio-component", mainPortfolio);
