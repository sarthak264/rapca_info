const footerTemplate = document.createElement("template");

class Footer extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `
    <footer class="footer-area">
    <div class="container">
        <div class="footer-main">
            <div class="row">
                <div class="col-xl-6 col-lg-5" data-sal="slide-right" data-sal-duration="800"
                    data-sal-delay="100">
                    <div class="footer-widget border-end">
                        <div class="footer-newsletter">
                            <h2 class="title">Get in touch!</h2>
                            <form>
                                <div class="input-group">
                                    <input type="email" class="form-control" placeholder="Email address" />
                                    <button class="subscribe-btn" type="submit">Subscribe</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-xl-6 col-lg-7" data-sal="slide-left" data-sal-duration="800"
                    data-sal-delay="100">
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="footer-widget">
                                <h6 class="widget-title">Services</h6>
                                <div class="footer-menu-link">
                                    <ul class="list-unstyled">
                                        <li><a href="service-fullStack.html">Full Stack Web development</a></li>
                                        <li><a href="service-seo.html">SEO</a></li>
                                        <li><a href="service-wordpress.html">Wordpress and Shopify</a></li>
                                        <li><a href="service-frontend.html">Frontend</a></li>
                                        <li><a href="service-backend.html">Backend</a></li>
                                        <li><a href="service-design.html">Design</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="footer-widget">
                                <h6 class="widget-title">Resourses</h6>
                                <div class="footer-menu-link">
                                    <ul class="list-unstyled">
                                        <li><a href="javascript:void(0);">Blog</a></li>
                                        <li><a href="portfolio.html">Portfolio</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="footer-widget">
                                <h6 class="widget-title">Support</h6>
                                <div class="footer-menu-link">
                                    <ul class="list-unstyled">
                                        <li><a href="contact.html">Contact</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer-bottom" data-sal="slide-up" data-sal-duration="500" data-sal-delay="100">
            <div class="footer-copyright text-center">
                <span class="copyright-text">© 2021. All rights reserved by
                    <a href="#">RapcaInfoTech</a>.
                </span>
            </div>
        </div>
    </div>
</footer>
      `;
  }
}

customElements.define("footer-component", Footer);
