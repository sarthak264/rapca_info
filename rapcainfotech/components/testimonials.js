const TestimonialsTemplate = document.createElement("template");

class Testimonials extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `
        <section class="section section-padding">
        <div class="container">
            <div class="section-heading heading-left">
                <h2 class="title">Testimonial</h2>
                <p>
                    Nulla facilisi. Nullam in magna id dolor blandit rutrum eget vulputate augue sed eu
                    leo eget risus imperdiet.
                </p>
            </div>
            <div class="row">
                <div class="col-lg-4" data-sal="slide-up" data-sal-duration="1000" data-sal-delay="100">
                    <div class="testimonial-grid active">
                        <span class="social-media"><img src="assets/images/weExpand logo.png" alt="Yelp" /></span>
                        <p>
                            “Fast work with good quality. And very resourceful. Well done.”
                        </p>
                        <div class="author-info">
                            <div class="content">
                                <span class="name">Steve Ng</span>
                                <span class="designation">Co-Founder and CTO at WeExpand</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ul class="shape-group-4 list-unstyled">
            <li class="shape-1"><img src="assets/media/others/bubble-1.png" alt="Bubble" /></li>
        </ul>
    </section>
    `;
  }
}

customElements.define("testimonials-component", Testimonials);
