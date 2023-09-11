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
            <div>
              <p>At 8 Bits, we are passionate about video games. We believe that video games are more than a form of entertainment; they are a way to connect, explore and challenge the limits of the imagination. Our mission is to provide gamers around the world with a reliable and exciting platform to access the best digital video games.</p>
              <h4>What we offer</h4>
              <p>At 8 Bits, we are proud to offer a wide selection of high-quality digital video games for a variety of platforms. Whether you're a fan of adventure, role-playing, sports, or any other genre, we've got something for you. We work closely with the industry's leading developers and publishers to ensure you always have access to the latest and most popular titles.</p>
              <h4>Join Our Community</h4>
              <p>At 8 Bits we believe in the gaming community. We're excited to share our passion with you and look forward to having you join our growing community of players. Follow us on social networks and stay up to date with the latest news, releases and special offers.</p>
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
