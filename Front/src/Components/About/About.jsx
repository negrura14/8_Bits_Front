import "./About.css";
import data from "./data";

export default function About() {

  return (
    <div>
      <section>
        <section className="team-page-section">
          <div className="container">
            <div className="sec-title centered">
              <div className="title">Our Team</div>
              <div className="separator">
                <span></span>
              </div>
              <h2>About Us</h2>
            </div>

            <div className="team">
            
<div className="row clearfix " >
            {data.map((element) => (

  <div className="team-block col-lg-4 col-md-4 col-sm-12  " key={element.name}>
    <div
      className="inner-box wow fadeInLeft"
      data-wow-delay="0ms"
      data-wow-duration="1500ms"
    >
      <ul className="social-icons">
        <li>
          <a href={element.github} target="_blank">
            <i className="fab fa-github" ></i>
          </a>
        </li>
        <li>
          <a href={element.instragram} target="_blank">
            <i className="fab fa-instagram"></i>
          </a>
        </li>
        <li>
          <a href={element.twitter} target="_blank">
            <i className="fab fa-twitter"></i>
          </a>
        </li>

        <li>
          <a href={element.linkedIn} target="_blank">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </li>
      </ul>
      <div className="card2RM ">
        <div className="cardRM ">
          <div className="wrapper">
            <img
              src={element.avPhoto}
              className="cover_image"
            />
          </div>
          <img
            src={element.rePhoto}
            className="character"
          />
        </div>
      </div>
      <div className="lower-content">
        <h3>
          <p >{element.name}</p>
        </h3>
        <div className="designation">{element.about}</div>
      </div>
    </div>
  </div>

))}
</div>

            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
