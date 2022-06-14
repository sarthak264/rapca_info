const bannerTemplate = document.createElement("template");

class banner extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `
    <section class="banner banner-style-5">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6 col-xl-7">
                        <div class="banner-content">
                            <h1 class="title" data-sal="slide-up" data-sal-duration="1000" data-sal-delay="200">
                                Technology &amp; design Studio
                            </h1>
                            <div data-sal="slide-up" data-sal-duration="1000" data-sal-delay="100">
                                <a href="portfolio.html" class="axil-btn btn-fill-white btn-large">View Showcase</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-xl-5" data-sal="slide-up" data-sal-duration="1000" data-sal-delay="100">
                        <div class="banner-form">
                            <div class="contact-form-box shadow-box">
                                <h3 class="title">Get a free Keystroke quote now</h3>
                                <form method="POST" action="mail.php" class="axil-contact-form">
                                    <div class="form-group">
                                        <label>Name</label>
                                        <input type="text" class="form-control" name="contact-name"
                                            placeholder="John Smith" />
                                    </div>
                                    <div class="form-group">
                                        <label>Email</label>
                                        <input type="email" class="form-control" name="contact-email"
                                            placeholder="example@mail.com" />
                                    </div>
                                    <div class="form-group mb--40">
                                        <label>Phone</label>
                                        <input type="tel" class="form-control" name="contact-company"
                                            placeholder="+123456789" />
                                    </div>
                                    <div class="form-group">
                                        <button type="submit" class="axil-btn btn-borderd btn-fluid btn-primary"
                                            name="submit-btn">
                                            Get Pricing Now
                                        </button>
                                    </div>
                                    <input type="hidden" class="form-control" name="contact-message" value="Null" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
  }
}

customElements.define("banner-component", banner);
