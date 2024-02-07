import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from "../components/UI/CarItem";
import axios from "axios";
import { createUrl, log } from '../utils/utils';

const CarListing = () => {
  const [cars, setCars] = useState([]); 
  
  useEffect( () => {
    loadCars();
  }, []);

  const loadCars = () => {
    const url = createUrl('/cars');
    axios.get(url)
    .then(function (response) {
      setCars(response.data);
      log(response);
    })
    .catch(function (error) {
      
      log(error);
    })
    .finally(function () {
     
    });
  }
  return (
    <Helmet title="Cars">
      <CommonSection title="Car Listing" />

      <section>
        <Container>
          <Row>
            {cars.map((item) => (
              <CarItem item={item} key={item.id} />
            ))}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarListing;
