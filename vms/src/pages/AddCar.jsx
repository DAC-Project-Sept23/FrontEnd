import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createUrl } from '../utils/utils';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import '../styles/add-car.css';

const Admin = () => {

    const navigate = useNavigate();
    const [showAddCarForm, setShowAddCarForm] = useState(false);
    const [newCar, setNewCar] = useState({
        brandName: '',
        modelName: '',
        year: 0,
        price: 0,
        mileage: 0,
        fuelType: '',
        transmissionType: '',
        description: '',
        carSpec: {
            color: '',
            engine: '',
            horsepower: 0,
            dimensions: 0,
        },
    });

    const toggleAddCarForm = () => {
        setShowAddCarForm(!showAddCarForm);
    };



    const addNewCar = (event) => {
        event.preventDefault(); // Prevent form submission

        // Check if all required fields are filled
        if (
            newCar.brandName &&
            newCar.modelName &&
            newCar.year &&
            newCar.price &&
            newCar.mileage &&
            newCar.fuelType &&
            newCar.transmissionType &&
            newCar.description &&
            newCar.carSpec.color &&
            newCar.carSpec.engine &&
            newCar.carSpec.horsepower &&
            newCar.carSpec.dimensions
        ) {
            const url = createUrl('/cars'); // Use the provided API endpoint
            axios
                .post(url, newCar)
                .then((res) => {
                    toast.success('Car Added Successfully!');
                    toggleAddCarForm();
                    setNewCar({
                        brandName: '',
                        modelName: '',
                        year: 0,
                        price: 0,
                        mileage: 0,
                        fuelType: '',
                        transmissionType: '',
                        description: '',
                        carSpec: {
                            color: '',
                            engine: '',
                            horsepower: 0,
                            dimensions: 0,
                        },
                    });
                })
                .catch((error) => {
                    console.error(error);
                    toast.error('An error occurred while adding the car.');
                });
        } else {
            toast.error('Please fill in all the required fields.');
        }
    };

    const goAdmin = () => {
        navigate('/admin')
    }


    return (


        <div className="container mt-5">
            <i><h1 className="text-center mb-4">Admin Dashboard</h1></i>



            <form onSubmit={addNewCar} className="add-car-form">
                <div className="form-section">
                    <div className="form-group">
                        <label htmlFor="brandName">Brand Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="brandName"
                            value={newCar.brandName}
                            onChange={(e) => setNewCar({ ...newCar, brandName: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="modelName">Model Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="modelName"
                            value={newCar.modelName}
                            onChange={(e) => setNewCar({ ...newCar, modelName: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Year</label>
                        <input
                            type="number"
                            className="form-control"
                            id="year"
                            value={newCar.year}
                            onChange={(e) => setNewCar({ ...newCar, year: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input
                            type="number"
                            className="form-control"
                            id="price"
                            value={newCar.price}
                            onChange={(e) => setNewCar({ ...newCar, price: e.target.value })}
                            required
                        />
                    </div>
                </div>
                <div className="form-section">
                    <div className="form-group">
                        <label htmlFor="price">mileage</label>
                        <input
                            type="number"
                            className="form-control"
                            id="mileage"
                            value={newCar.mileage}
                            onChange={(e) => setNewCar({ ...newCar, mileage: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="fuelType">Fuel Type</label>
                        <input
                            type="text"
                            className="form-control"
                            id="fuelType"
                            value={newCar.fuelType}
                            onChange={(e) => setNewCar({ ...newCar, fuelType: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="fuelType">Transmission Type</label>
                        <input
                            type="text"
                            className="form-control"
                            id="transmissionType"
                            value={newCar.transmissionType}
                            onChange={(e) => setNewCar({ ...newCar, transmissionType: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="fuelType">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            value={newCar.description}
                            onChange={(e) => setNewCar({ ...newCar, description: e.target.value })}
                            required
                        />
                    </div>
                </div>
                <div className="form-section">
                    <div className="form-group">
                        <label htmlFor="color">Color</label>
                        <input
                            type="text"
                            className="form-control"
                            id="color"
                            value={newCar.carSpec.color}
                            onChange={(e) => setNewCar({ ...newCar, carSpec: { ...newCar.carSpec, color: e.target.value } })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="engine">Engine</label>
                        <input
                            type="text"
                            className="form-control"
                            id="engine"
                            value={newCar.carSpec.engine}
                            onChange={(e) => setNewCar({ ...newCar, carSpec: { ...newCar.carSpec, engine: e.target.value } })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="horsepower">Horsepower</label>
                        <input
                            type="number"
                            className="form-control"
                            id="horsepower"
                            value={newCar.carSpec.horsepower}
                            onChange={(e) => setNewCar({ ...newCar, carSpec: { ...newCar.carSpec, horsepower: e.target.value } })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dimensions">Dimensions</label>
                        <input
                            type="number"
                            className="form-control"
                            id="dimensions"
                            value={newCar.carSpec.dimensions}
                            onChange={(e) => setNewCar({ ...newCar, carSpec: { ...newCar.carSpec, dimensions: e.target.value } })}
                            required
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-outline-primary btn-sm" style={{ marginTop: '20px' }} >Add Car</button>
                <button type="submit" className="btn btn-outline-info btn-sm" style={{ marginTop: '20px', marginLeft: '20px' }} onClick={goAdmin} >Back</button>
            </form>


        </div>



    );
};

export default Admin;
