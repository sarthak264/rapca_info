const counterTemplate = document.createElement("template");

class counter extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `
    <section class="section section-padding bg-color-dark">
            <div class="container">
                <div class="section-heading heading-light">
                    <span class="subtitle">Featured Case Study</span>
                    <h2 class="title">Design startup movement</h2>
                    <p>
                        In vel varius turpis, non dictum sem. Aenean in efficitur ipsum, in egestas ipsum.
                        Mauris in mi ac tellus.
                    </p>
                </div>
                <div class="row">
                    <div class="col-lg-3 col-6" data-sal="slide-up" data-sal-duration="800" data-sal-delay="100">
                        <div class="counterup-progress active">
                            <div class="icon">
                                <img src="assets/media/icon/icon-7.png" alt="Apple" />
                            </div>
                            <div class="count-number h2">
                                <span class="number count">15</span>
                                <span class="symbol">+</span>
                            </div>
                            <h6 class="title">Years of operation</h6>
                        </div>
                    </div>
                    <div class="col-lg-3 col-6" data-sal="slide-up" data-sal-duration="800" data-sal-delay="200">
                        <div class="counterup-progress">
                            <div class="icon">
                                <img src="assets/media/icon/icon-8.png" alt="Apple" />
                            </div>
                            <div class="count-number h2">
                                <span class="number count">360</span>
                                <span class="symbol">+</span>
                            </div>
                            <h6 class="title">Projects deliverd</h6>
                        </div>
                    </div>
                    <div class="col-lg-3 col-6" data-sal="slide-up" data-sal-duration="800" data-sal-delay="300">
                        <div class="counterup-progress">
                            <div class="icon">
                                <img src="assets/media/icon/icon-9.png" alt="Apple" />
                            </div>
                            <div class="count-number h2">
                                <span class="number count">600</span>
                                <span class="symbol">+</span>
                            </div>
                            <h6 class="title">Specialist</h6>
                        </div>
                    </div>
                    <div class="col-lg-3 col-6" data-sal="slide-up" data-sal-duration="800" data-sal-delay="400">
                        <div class="counterup-progress">
                            <div class="icon">
                                <img src="assets/media/icon/apple.png" alt="Apple" />
                            </div>
                            <div class="count-number h2">
                                <span class="number count">64</span>
                                <span class="symbol">+</span>
                            </div>
                            <h6 class="title">Years of operation</h6>
                        </div>
                    </div>
                </div>
            </div>
            <ul class="list-unstyled shape-group-10">
                <!-- <li class="shape shape-1"><img src="assets/media/others/line-9.png" alt="Circle"></li> -->
                <li class="shape shape-2">
                    <img src="assets/media/others/bubble-42.png" alt="Circle" />
                </li>
                <li class="shape shape-3">
                    <img src="assets/media/others/bubble-43.png" alt="Circle" />
                </li>
            </ul>
        </section>
    `;
  }
}

customElements.define("counter-component", counter);
