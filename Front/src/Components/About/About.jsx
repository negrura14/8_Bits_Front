import "./About.css";
import data from "./data";
import logo from "../../Img/Logo.png"

export default function About() {

  return (
    <div>
      <section className="container aboutS">
      <div class="row featurette p-5 my-5">
      <div class="col-md-7">
        <h2 >About Us.</h2>
        <p >At 8 Bits, we are passionate about video games. We believe that video games are more than a form of entertainment; they are a way to connect, explore and challenge the limits of the imagination. Our mission is to provide gamers around the world with a reliable and exciting platform to access the best digital video games.</p>
      </div>
      <div class="col-md-5">
        <img src={logo}></img>
      </div>
    </div>
    <div class="row  p-5">
      <div class="col-6 p-5 featurette">
        <h2 >What we offer</h2>
        <p >At 8 Bits, we are proud to offer a wide selection of high-quality digital video games for a variety of platforms. Whether you're a fan of adventure, role-playing, sports, or any other genre, we've got something for you. We work closely with the industry's leading developers and publishers to ensure you always have access to the latest and most popular titles.</p>
      </div>
      <div class="col-6 p-5 featurette">
        <h2 >Join Our Community</h2>
        <p >At 8 Bits we believe in the gaming community. We're excited to share our passion with you and look forward to having you join our growing community of players. Follow us on social networks and stay up to date with the latest news, releases and special offers.</p>
      </div>
      
    </div>
      <section>
        
      </section>

        <section className="team-page-section">
          <div className="container">
            <div className="sec-title centered">
              <div className="title">Our Team</div>
              <div className="separator">
                <span></span>
              </div>
            </div>

            <div className="team">
            
<div className="row clearfix " >
            {data.map((element) => (

  <div className="team-block col-xl-4 col-lg-4 col-md-4 col-sm-12  " key={element.name}>
    <div
      className="inner-box wow fadeInLeft"
      data-wow-delay="0ms"
      data-wow-duration="1500ms"
    >
      <ul className="social-iconsA">
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
