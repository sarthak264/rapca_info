const servicesTemplate = document.createElement("template");

class services extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `
    <section class="section section-padding">
            <div class="container">
                <div class="section-heading heading-left mb--20 mb_md--70">
                    <span class="subtitle">What We Can Do For You</span>
                    <h2 class="title">
                        Services we can <br />
                        help you with
                    </h2>
                </div>
                <div class="row">
                    <div class="col-lg-4 mt--200 mt_md--0" data-sal="slide-up" data-sal-duration="800"
                        data-sal-delay="100">
                        <div class="services-grid service-style-2">
                            <div class="thumbnail">
                                <img src="assets/media/icon/icon-1.png" alt="icon" />
                            </div>
                            <div class="content">
                                <h5 class="title"><a href="service-design.html">Back-end Development</a></h5>
                                <p>
                                We help you create efficient solutions designed with best industry practices and agile principles to craft quality solutions making security, accuracy, redundancy, and performance our key priorities.
                                </p>
                                <a href="service-backend.html" class="more-btn">Find out more</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 mt--100 mt_md--0" data-sal="slide-up" data-sal-duration="800"
                        data-sal-delay="200">
                        <div class="services-grid service-style-2 active">
                            <div class="thumbnail">
                                <img src="assets/media/icon/icon-2.png" alt="icon" />
                            </div>
                            <div class="content">
                                <h5 class="title"><a href="service-development.html">UI/UX Design</a></h5>
                                <p>
                               We make sure to properly blend the design with user experience and functionality to provide visitors the best possible user experience and help you get the desired “click” from your customers!
                                </p>
                                <a href="service-design.html" class="more-btn">Find out more</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4" data-sal="slide-up" data-sal-duration="800" data-sal-delay="300">
                        <div class="services-grid service-style-2">
                            <div class="thumbnail">
                                <img src="assets/media/icon/icon-6.png" alt="icon" />
                            </div>
                            <div class="content">
                                <h5 class="title">
                                    <a href="service-frontend.html">Front-end Development</a>
                                </h5>
                                <p>
                                We build interactive custom web applications to deliver pixel-perfect, stunning user experience. We create responsive, mobile-first, efficient, SEO friendly User Interfaces connecting them with back-end effectively.
                                </p>
                                <a href="service-frontend.html" class="more-btn">Find out more</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-4 mt--200 mt_md--0" data-sal="slide-up" data-sal-duration="800"
                        data-sal-delay="100">
                        <div class="services-grid service-style-2">
                            <div class="thumbnail">
                                <img src="assets/media/icon/icon-1.png" alt="icon" />
                            </div>
                            <div class="content">
                                <h5 class="title"><a href="service-seo.html">SEO</a></h5>
                                <p>
                                We help you create efficient solutions designed with best industry practices and agile principles to craft quality solutions making security, accuracy, redundancy, and performance our key priorities.
                                </p>
                                <a href="service-seo.html" class="more-btn">Find out more</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 mt--100 mt_md--0" data-sal="slide-up" data-sal-duration="800"
                        data-sal-delay="200">
                        <div class="services-grid service-style-2 active">
                            <div class="thumbnail">
                                <img src="assets/media/icon/icon-2.png" alt="icon" />
                            </div>
                            <div class="content">
                                <h5 class="title"><a href="service-wordpress.html">Wordpress and Shopify</a></h5>
                                <p>
                               We make sure to properly blend the design with user experience and functionality to provide visitors the best possible user experience and help you get the desired “click” from your customers!
                                </p>
                                <a href="service-wordpress.html" class="more-btn">Find out more</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4" data-sal="slide-up" data-sal-duration="800" data-sal-delay="300">
                        <div class="services-grid service-style-2">
                            <div class="thumbnail">
                                <img src="assets/media/icon/icon-6.png" alt="icon" />
                            </div>
                            <div class="content">
                                <h5 class="title">
                                    <a href="service-fullStack.html">Full Stack Web Development</a>
                                </h5>
                                <p>
                                We build interactive custom web applications to deliver pixel-perfect, stunning user experience. We create responsive, mobile-first, efficient, SEO friendly User Interfaces connecting them with back-end effectively.
                                </p>
                                <a href="service-fullStack.html" class="more-btn">Find out more</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ul class="shape-group-7 list-unstyled">
                <li class="shape shape-1"><img src="assets/media/others/circle-2.png" alt="circle" /></li>
                <li class="shape shape-2"><img src="assets/media/others/bubble-2.png" alt="Line" /></li>
                <li class="shape shape-3"><img src="assets/media/others/bubble-1.png" alt="Line" /></li>
            </ul>
        </section>
    `;
  }
}

customElements.define("services-component", services);
