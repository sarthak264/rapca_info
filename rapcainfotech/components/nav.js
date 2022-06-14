const headerTemplate = document.createElement("template");

class header extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `
      <header class="header axil-header header-style-4">
      <div id="axil-sticky-placeholder"></div>
      <div class="axil-mainmenu">
          <div class="container">
              <div class="header-navbar">
                  <div class="header-logo">
                    <a href="index.html"><img class="light-version-logo rapca-logo" src="assets/media/logo-3.svg" alt="logo"></a>
                    <a href="index.html"><img class="dark-version-logo rapca-logo" src="assets/media/logo-3.svg" alt="logo"></a>
                    <a href="index.html"><img class="sticky-logo rapca-logo" src="assets/media/logo-2.svg" alt="logo"></a>
                  </div>
                  <div class="header-main-nav">
                      <!-- Start Mainmanu Nav -->
                      <nav class="mainmenu-nav" id="mobilemenu-popup">
                          <div class="d-block d-lg-none">
                              <div class="mobile-nav-header">
                                  <div class="mobile-nav-logo">
                                      <a href="index.html">
                                          <img class="light-mode" src="assets/media/logo-2.svg" alt="Site Logo">
                                          <img class="dark-mode" src="assets/media/logo-3.svg" alt="Site Logo">
                                      </a>
                                  </div>
                                  <button class="mobile-menu-close" data-bs-dismiss="offcanvas"><i class="fas fa-times"></i></button>
                              </div>
                          </div>
                          <ul class="mainmenu">
                              <li class="menu-item-has-children">
                                  <a href="javascript:void(0);">Services</a>
                                  <ul class="axil-submenu">
                                    <li><a href="service-frontend.html">Frontend</a></li>
                                    <li><a href="service-backend.html">Backend</a></li>
                                    <li><a href="service-design.html">Design</a></li>
                                    <li><a href="service-fullstack.html">Full Stack web development</a></li>
                                    <li><a href="service-seo.html">SEO</a></li>
                                    <li><a href="service-wordpress.html">Wordpress and Shopify</a></li> 
                                  </ul>
                              </li>
                              <li>
                                  <a href="portfolio.html">Portfolio</a>
                              </li>
                              <li>
                                <a href="contact.html">Contact</a>
                              </li>
                          </ul>
                      </nav>
                      <!-- End Mainmanu Nav -->
                  </div>
                  <div class="header-action">
                      <ul class="list-unstyled">
                          <li class="header-btn">
                              <a href="contact.html" class="axil-btn btn-fill-white">Let's Talk</a>
                          </li>
                          <li class="mobile-menu-btn sidemenu-btn d-lg-none d-block">
                              <button class="btn-wrap btn-dark" data-bs-toggle="offcanvas" data-bs-target="#mobilemenu-popup">
                                  <span></span>
                                  <span></span>
                                  <span></span>
                              </button>
                          </li>
                          <li class="my_switcher d-block d-lg-none">
                              <ul>
                                  <li title="Light Mode">
                                      <a href="javascript:void(0)" class="setColor light" data-theme="light">
                                          <i class="fal fa-lightbulb-on"></i>
                                      </a>
                                  </li>
                                  <li title="Dark Mode">
                                      <a href="javascript:void(0)" class="setColor dark" data-theme="dark">
                                          <i class="fas fa-moon"></i>
                                      </a>
                                  </li>
                              </ul>
                          </li>
                      </ul>
                  </div>
              </div>
          </div>
      </div>
      </header>
      `;
  }
}

customElements.define("nav-component", header);
