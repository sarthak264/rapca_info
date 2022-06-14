const projectsTemplate = document.createElement("template");

class projects extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `
    <section class="section section-padding-2 bg-color-light">
            <div class="container">
                <div class="section-heading heading-left">
                    <span class="subtitle">Our Project</span>
                    <h2 class="title">
                        Some of our <br />
                        finest work.
                    </h2>
                </div>
                <div class="axil-isotope-wrapper">
                    <div class="row isotope-list">
                        <div class="col-xl-4 col-md-6 project branding">
                            <div class="project-grid">
                                <div class="thumbnail">
                                    <a href="portfolio-zaio.html">
                                        <img src="assets/images/zaio.png" alt="project">
                                    </a>
                                </div>
                                <div class="content">
                                    <h4 class="title"><a href="portfolio-zaio.html">ZAIO</a></h4>
                                    <span class="subtitle">Reactjs, Nodejs, Cloudinary, CodeSandBox, React-Bootstrap, Agora Web RTC</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-4 col-md-6 project branding">
                            <div class="project-grid">
                                <div class="thumbnail">
                                    <a href="portfolio-weexpand.html">
                                        <img src="assets/images/weexpand.png" alt="project">
                                    </a>
                                </div>
                                <div class="content">
                                    <h4 class="title"><a href="portfolio-weexpand.html">Weexpand</a></h4>
                                    <span class="subtitle">Typescript, Reactjs, Redux, Yum, formik, Material-UI, Styled-components</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-4 col-md-6 project mobile">
                            <div class="project-grid">
                                <div class="thumbnail">
                                    <a href="portfolio-finsight.html">
                                        <img src="assets/images/finsight.png" alt="project">
                                    </a>
                                </div>
                                <div class="content">
                                    <h4 class="title"><a href="portfolio-finsight.html">Finsight</a></h4>
                                    <span class="subtitle">Reactjs, redux, firebase, Material-UI, Ant Design</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-4 col-md-6 project branding">
                            <div class="project-grid">
                                <div class="thumbnail">
                                    <a href="portfolio-hungerlink.html">
                                        <img src="assets/images/hunger link.jpg" alt="project">
                                    </a>
                                </div>
                                <div class="content">
                                    <h4 class="title"><a href="portfolio-hungerlink.html">Hunger.link</a></h4>
                                    <span class="subtitle">React-Admin, Typescript</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-4 col-md-6 project mobile">
                            <div class="project-grid">
                                <div class="thumbnail">
                                    <a href="portfolio-careerado.html">
                                        <img src="assets/images/careerado.png" alt="project">
                                    </a>
                                </div>
                                <div class="content">
                                    <h4 class="title"><a href="portfolio-careerado.html">Careerado</a></h4>
                                    <span class="subtitle">Next.js, Typescript, Firebase, Strapi</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="more-project-btn">
                        <a href="#" class="axil-btn btn-fill-primary">Discover More Projects</a>
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

customElements.define("projects-component", projects);
