import React from "react";

import CommonSection from "../components/UI/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import AboutSection from "../components/UI/AboutSection";
import { Container, Row, Col } from "reactstrap";

import driveImg from "../assets/all-images/ebook-store.jpg";
import OurMembers from "../components/UI/OurMembers";
import "../styles/about.css";

const About = () => {
  return (
    <Helmet title="About">
      <CommonSection title="About Us" />
      <AboutSection aboutClass="aboutPage" />

      <section className="about__page-section">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12">
              <div className="about__page-img">
                <img src={driveImg} alt="" className="w-100 rounded-3" />
              </div>
            </Col>

            <Col lg="6" md="6" sm="12">
              <div className="about__page-content">
              <div className="about__section">
                <h2 className="section__title">
                  Our Commitment to You
                </h2>

                <p className="section__description">
                  At Page Palette, we are committed to providing you with the best ebook shopping experience possible. We offer a diverse range of ebooks, carefully curated to cater to every reading taste. Whether you're into fiction, non-fiction, self-help, or children's books, you'll find something you love in our collection.
                </p>

                <p className="section__description">
                  Our user-friendly interface makes it easy for you to browse, purchase, and enjoy your favorite ebooks. We strive to ensure that every interaction you have with Page Palette is seamless and enjoyable. Your satisfaction is our top priority, and we are dedicated to providing you with exceptional customer service every step of the way.
                </p>
              </div>
                <div className=" d-flex align-items-center gap-3 mt-4">
                  <span className="fs-4">
                    <i class="ri-phone-line"></i>
                  </span>

                  <div>
                    <h6 className="section__subtitle">Need Any Help?</h6>
                    <h4>+91-1234567890</h4>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <h6 className="section__subtitle">Meet</h6>
              <h2 className="section__title">The Creators</h2>
            </Col>
            <OurMembers />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default About;
