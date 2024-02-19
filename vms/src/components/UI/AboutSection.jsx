import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../../styles/about-section.css";
import aboutImg from "../../assets/all-images/imge-1.jpg";

const AboutSection = ({ aboutClass }) => {
  return (
    <section
      className="about__section"
      style={
        aboutClass === "aboutPage"
          ? { marginTop: "0px" }
          : { marginTop: "280px" }
      }
    >
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="about__section-content">
              <h4 className="section__subtitle">About Us</h4>
              <h2 className="section__title">Welcome to Page Palette</h2>
              <p className="section__description">
              Welcome to Page Palette, your premier destination for all things related to eBooks. At Page Palette, we are passionate about books and reading, and we strive to provide a comprehensive platform where readers can discover, purchase, and enjoy a wide range of eBooks.
              Our collection features a diverse selection of titles, carefully curated to cater to all tastes and preferences. Whether you're into classic literature, contemporary fiction, non-fiction, or something else entirely, you're sure to find something that piques your interest.
              We are committed to providing a seamless and enjoyable reading experience. Our user-friendly interface makes it easy to browse and purchase eBooks, and our responsive customer support team is always on hand to assist you with any queries or issues you may have.
              At Page Palette, we believe that reading should be accessible to everyone. That's why we offer a range of affordable pricing options and regularly update our collection with new titles and exclusive deals. Join us in celebrating the joy of reading and discover your next favorite eBook at Page Palette.
              </p>

              <div className="about__section-item d-flex align-items-center">
                <p className="section__description d-flex align-items-center gap-2">
                  <i class="ri-checkbox-circle-line"></i> Wide Selection of eBooks
                </p>
                
                <p className="section__description d-flex align-items-center gap-2">
                  <i class="ri-checkbox-circle-line"></i> User-Friendly Interface
                </p>
              </div>

              <div className="about__section-item d-flex align-items-center">
                <p className="section__description d-flex align-items-center gap-2">
                  <i class="ri-checkbox-circle-line"></i> Responsive Customer Support
                </p>
                
                <p className="section__description d-flex align-items-center gap-2">
                  <i class="ri-checkbox-circle-line"></i> Affordable Pricing
                </p>
              </div>

            </div>
          </Col>

          <Col lg="6" md="6">
            <div className="about__img">
              <img src={aboutImg} alt="" className="w-100" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutSection;
