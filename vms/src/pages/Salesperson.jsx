import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';
import { createUrl, log } from '../utils/utils';
const Salesperson = () => {

    const navigate = useNavigate();
    const [carBookings, setCarBookings] = useState([]);
    const [finances, setFinances] = useState([]);
    const [users, setUsers] = useState([]);
    const [insurances, setInsurances] = useState([]);
    const [testDriveBookings, setTestDriveBookings] = useState([]);
    const [carServices, setCarServices] = useState([]);
    // const token = localStorage.getItem('token');


    useEffect(() => {
        fetchCarBookings();
        fetchFinances();
        fetchUsers();
        fetchInsurances();
        fetchTestDriveBookings();
        fetchCarServices();
    }, []);

    // Fetch functions (similar to previous code)

    const fetchCarBookings = () => {
        const url = createUrl('/bookings')
        axios.get(url)
            .then(function (response) {
                setCarBookings(response.data);

                log(response);

            })
            .catch(function (error) {

                log(error);
            })
            .finally(function () {

            });
    };

    const handleStatusChange = (bookingId) => {
        // Update the status to 'SUCCESSFUL'
        const url = createUrl(`/bookings/status/${bookingId}`)
    axios.put(url, { status: 'SUCCESSFUL' })
      .then(response => {
        toast.success("You Accept The Request ..... Having BookingId = "+bookingId);
        fetchCarBookings();
      })
      .catch(error => {
        console.error('Error updating status:', error);
        toast.success("You Accept The Request ..... Having BookingId = "+bookingId);
        fetchCarBookings();
      });
  };

    const fetchFinances = () => {
        const url = createUrl('/finance')
        axios.get(url)
            .then(function (response) {
                setFinances(response.data);

                log(response);

            })
            .catch(function (error) {

                log(error);
            })
            .finally(function () {

            });
    };



    const deleteFinance = (id) => {
        const url = createUrl(`/finance/${id}`)
        axios.delete(url)
            .then(res => {
                log(res);
                fetchFinances();
                toast.error('Finance Deleted SucessFully!! id = ' + id)
                log(res.data);

                const posts = this.state.posts.filter(item => item.id !== id);
                this.setState({ posts });
            })
    }


    const fetchUsers = () => {
        const url = createUrl('/users')
        axios.get(url)
            .then(function (response) {
                setUsers(response.data);

                log(response);

            })
            .catch(function (error) {

                log(error);
            })
            .finally(function () {

            });
    };


    const fetchInsurances = () => {
        const url = createUrl('/insurance')
        axios.get(url)
            .then(function (response) {
                setInsurances(response.data);

                log(response);

            })
            .catch(function (error) {

                log(error);
            })
            .finally(function () {

            });
    };

    const fetchTestDriveBookings = () => {
        const url = createUrl('/testdrive')
        axios.get(url)
            .then(function (response) {
                setTestDriveBookings(response.data);

                log(response);

            })
            .catch(function (error) {

                log(error);
            })
            .finally(function () {

            });
    };

    const deleteTestDrive = (id) => {
        const url = createUrl(`/testdrive/${id}`)
        axios.delete(url)
            .then(res => {
                log(res);
                fetchTestDriveBookings();
                toast.error('Test Drive Deleted SucessFully!! id = ' + id)
                log(res.data);

                const posts = this.state.posts.filter(item => item.id !== id);
                this.setState({ posts });
            })
    }

    const fetchCarServices = () => {
        const url = createUrl('/services')
        axios.get(url)
            .then(function (response) {
                setCarServices(response.data);

                log(response);

            })
            .catch(function (error) {

                log(error);
            })
            .finally(function () {

            });
    };



    const back = () => {
        localStorage.removeItem('token');
        // Redirect or handle logout logic as needed
        navigate('/')


    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Salesperson Dashboard</h1>

            {/* Car Bookings */}
            <div className="card mb-3">
                <div className="card-body">
                    <h5 className="card-title">Car Bookings</h5>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Mobile</th>
                                <th>Car Brand</th>
                                <th>Car Model</th>
                                <th>Booking Date</th>
                                <th>Payment Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {carBookings.map((booking) => (
                                <tr key={booking.id}>
                                    <td>{booking.user.firstName + "  " + booking.user.lastName}</td>
                                    <td>{booking.user.phone}</td>
                                    <td>{booking.car.brandName}</td>
                                    <td>{booking.car.modelName}</td>
                                    <td>{booking.bookingDate}</td>
                                    <td>{booking.status}</td>
                                    <td>
                                        {/* Add a button that triggers the status change */}
                                        {booking.status === 'PENDING' && (
                                            <button
                                                className="btn btn-outline-primary btn-sm"
                                                onClick={() => handleStatusChange(booking.id)}
                                            >
                                                Accept-Payment
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Finances */}
            <div className="card mb-3">
                <div className="card-body">
                    <h5 className="card-title">Finances</h5>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Loan Amount</th>
                                <th>Interest Rate</th>
                                <th>Monthly Payment</th>
                                <th>Financer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {finances.map((finance) => (
                                <tr key={finance.financeId}>
                                    <td>{finance.loanAmount}</td>
                                    <td>{finance.interestRate}</td>
                                    <td>{finance.monthlyPayment}</td>
                                    <td>{finance.financeName}</td>
                                    <td>
                                        <button className="btn btn-outline-danger btn-sm" onClick={() => { deleteFinance(finance.financeId) }} >Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Customers */}
            <div className="card mb-3">
                <div className="card-body">
                    <h5 className="card-title">Users</h5>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                user.userRoles === 'USER' && (
                                    <tr key={user.id}>
                                        <td>{user.firstName + "  " + user.lastName}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.address}</td>
                                    </tr>
                                )
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Insurances */}
            <div className="card mb-3">
                <div className="card-body">
                    <h5 className="card-title">Insurances</h5>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Insurance Provider</th>
                                <th>Policy Number</th>
                                <th>Permium Amt</th>
                                <th>Claim Amt</th>
                                <th>Years</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {insurances.map((insurance) => (
                                <tr key={insurance.id}>
                                    <td>{insurance.insuranceProvider}</td>
                                    <td>{insurance.policyNumber}</td>
                                    <td>{insurance.premiumAmt}</td>
                                    <td>{insurance.claimAmt}</td>
                                    <td>{insurance.year}</td>
                                    <td>{insurance.mode}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Test Drive Bookings */}
            <div className="card mb-3">
                <div className="card-body">
                    <h5 className="card-title">Test Drives</h5>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Car</th>
                                <th>Date</th>
                                {/* Add table headers for other details */}
                            </tr>
                        </thead>
                        <tbody>
                            {testDriveBookings.map((booking) => (
                                <tr key={booking.testDriveId}>
                                    <td>{booking.user.firstName + "  " + booking.user.lastName}</td>
                                    <td>{booking.user.booking[0].car.brandName}</td>
                                    <td>{booking.testDriveDate}</td>
                                    <td>
                                        <button className="btn btn-outline-danger btn-sm" onClick={() => { deleteTestDrive(booking.testDriveId) }} >Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Car Services */}
            <div className="card mb-3">
                <div className="card-body">
                    <h5 className="card-title">Car Services</h5>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Service Name</th>
                                <th>Descriptiom</th>
                                {/* Add table headers for other details */}
                            </tr>
                        </thead>
                        <tbody>
                            {carServices.map((service) => (
                                <tr key={service.serviceId}>
                                    <td>{service.serviceName}</td>
                                    <td>{service.description}</td>
                                    {/* Add table cells for other details */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <button className="btn btn-outline-danger btn-sm" onClick={back}>
                Back
            </button>
        </div>
    );
};

export default Salesperson;