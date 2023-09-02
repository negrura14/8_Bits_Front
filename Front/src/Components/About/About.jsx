import "./About.css";

export default function About() {
  // pretendo generar un array con todos nuestros datos y luego con un map renderizar todos de una sóla vez
  const data = [];

  return (
    <div>
      <section>
        <section class="team-page-section">
          <div class="container">
            <div class="sec-title centered">
              <div class="title">Our Team</div>
              <div class="separator">
                <span></span>
              </div>
              <h2>About Us</h2>
            </div>

            <div class="row clearfix">
              <div class="team-block col-lg-4 col-md-6 col-sm-12">
                <div
                  class="inner-box wow fadeInLeft"
                  data-wow-delay="0ms"
                  data-wow-duration="1500ms"
                >
                  <ul class="social-icons">
                    <li>
                      <a href="#">
                        <i class="fab fa-github"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="fab fa-instagram"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="fab fa-twitter"></i>
                      </a>
                    </li>

                    <li>
                      <a href="#">
                        <i class="fab fa-linkedin-in"></i>
                      </a>
                    </li>
                  </ul>
                  <div className="card2RM ">
                    <div className="cardRM ">
                      <div className="wrapper">
                        <img
                          src="https://i.pinimg.com/originals/53/29/53/5329530842a095a6ad61f3f5dd668ace.jpg"
                          className="cover_image"
                        />
                      </div>
                      <img
                        src="https://art.pixilart.com/29c01efd2a4882e.png"
                        className="character"
                      />
                    </div>
                  </div>
                  <div class="lower-content">
                    <h3>
                      <a href="#">Lorem Ipsum </a>
                    </h3>
                    <div class="designation">Simply dummy text </div>
                  </div>
                </div>
              </div>
              
              
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
