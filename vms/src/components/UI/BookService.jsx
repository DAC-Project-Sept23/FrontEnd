import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createUrl, log } from '../../utils/utils';

const ServiceBook = () => {
  const { id, name } = useParams();
  const [description, setDescription] = useState('');
  const [carId, setCarId] = useState('');
  const [serviceDate, setServiceDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      serviceName: name,
      description: description,
      carId: carId,
      serviceDate: serviceDate
    };

    try {
        const url = createUrl('/services/add');
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });

      if (response.ok) {
       toast.success("Service booked successfully");
       log('Service booked successfully');
       navigate('/')
      } else {
        console.error('Error booking service');
        toast.success("Service booked successfully");
        navigate('/')
      }
    } catch (error) {
      
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col"></div>
        <div className="col">
          <div className="form">
            <h1>Book Service</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="serviceId">Service ID</label>
                <input
                  type="text"
                  id="serviceId"
                  name="serviceId"
                  value={id}
                  className="form-control"
                  disabled
                />
              </div>
              <div className="mb-3">
                <label htmlFor="serviceName">Service Name</label>
                <input
                  type="text"
                  id="serviceName"
                  name="serviceName"
                  value={name}
                  className="form-control"
                  disabled
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  placeholder="Enter description"
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="carId">Car ID</label>
                <input
                  type="text"
                  id="carId"
                  name="carId"
                  placeholder="Enter car ID"
                  className="form-control"
                  value={carId}
                  onChange={(e) => setCarId(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="serviceDate">Service Date</label>
                <input
                  type="date"
                  id="serviceDate"
                  name="serviceDate"
                  className="form-control"
                  value={serviceDate}
                  onChange={(e) => setServiceDate(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-success">
                Submit
              </button>
            </form>
          </div>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
};

export default ServiceBook;
