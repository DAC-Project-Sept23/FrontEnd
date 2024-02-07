import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../../styles/car-details.css' // Import the CSS file
import { createUrl } from '../../utils/utils';


const CarDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [carDetails, setCarDetails] = useState();
  const imageUrl = createUrl(`/cars/images/${id}`);

  useEffect(() => {
    fetchCarDetails(id);
  }, []);

  const testDrive = () => {
    navigate('/test_drive', {state : {...carDetails}})
  };

  const goHome = () => {
    navigate('/')
  };

  const fetchCarDetails = (id) => {
    const url = createUrl(`/cars/${id}`)
    axios
      .get(url)
      .then(function (response) {
        setCarDetails(response.data);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };



 
  return (
    <div className="container mt-5" style={{marginBottom : '50px'}} >
      {carDetails && (
        <div className="card">
          <div className="card-title">
            <h4 className="mb-0">Car Details</h4>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-4">
                <div className="car__img">
                  <img className="img-fluid" src={imageUrl} alt="" />
                </div>
              </div>
              <div className="col-md-4 car-details">
                <div>
                  <p>Brand Name: {carDetails.brandName}</p>
                  <p>Model Name: {carDetails.modelName}</p>
                  <p>Year: {carDetails.year}</p>
                  <p>Color: {carDetails.carSpecification.color}</p>
                  <p>Fuel Type: {carDetails.fuelType}</p>
                </div>
              </div>
              <div className="col-md-4 car-details">
                <div>
                  <p>Price: ₹{carDetails.price}</p>
                  <p>Engine: {carDetails.carSpecification.engine}</p>
                  <p>Mileage: {carDetails.mileage}</p>
                  <p>Horsepower: {carDetails.carSpecification.horsepower}</p>
                  <p>Transmission Type: {carDetails.transmissionType}</p>
                </div>
              </div>
            </div>
            <div className="mt-4 car-details">
              <h5>Description:</h5>
              <p>{carDetails.description}</p>
            </div>
            <div className="buttons">
              <button className="btn btn-primary" onClick={testDrive}>Test Drive</button>
              <button className="btn btn-success" onClick={goHome}>Back</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetails;