import React, { useEffect, useState } from "react";
import "../../styles/insurance-list.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { createUrl, log } from '../../utils/utils';
import { toast } from 'react-toastify';

const BookingPage = () => {

  const location = useLocation();
  const selectedCar = location.state?.car || {};

  //Insurance and Finance
  const [insurance, setInsurance] = useState([]);
  const [selectedInsurance, setSelectedInsurance] = useState(null); // Track selected insurance
  const [finance, setFinance] = useState([]);
  const [selectedFinance, setSelectedFinance] = useState(null);
  const navigate = useNavigate();

  //Paymet states
  //const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState("");
  //const [showPaymentPending, setShowPaymentPending] = useState(false);
  const [selectedInsuranceError, setSelectedInsuranceError] = useState(false);
  const status = selectedPaymentOption === "cardPayment" ? "SUCCESSFUL" : "PENDING";

  const [selectedDeliveryDate, setSelectedDeliveryDate] = useState(null); // Add state for selected date
  
  // -----------------------------Load After Loading the page only Once--------------------------------
  useEffect(() => {
    loadInsurance();
    loadFinance();
    
  }, []);

  // --------------------------------------Insurance-------------------------------------------------
  const loadInsurance = () => {
    
    const url = createUrl(`/insurance`);
    axios
      .get(url)
      .then(function (response) {
        setInsurance(response.data);
        log(response.data);
      })
      .catch(function (error) {
        log(error);
      });
  };

  const handleInsuranceChange = (insuranceId) => {
    setSelectedInsurance(insuranceId);
    console.log("you have choose Insurance" + insuranceId);
  };

  // --------------------------------------Finance-------------------------------------------------
  const loadFinance = () => {
    const url = createUrl(`/finance`);
    axios
      .get(url)
      .then(function (response) {
        setFinance(response.data);
        log(response.data);
      })
      .catch(function (error) {
        log(error);
      });

  };


  const handleFinanceChange = (financeId) => {
    setSelectedFinance(financeId);
    log("you have choose Finance = " + financeId);
  }


  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedInsurance) {
      setSelectedInsuranceError(true);
      return;
    } else {
      setSelectedInsuranceError(false);
    }

    if (selectedPaymentOption === "cardPayment") {
      // setPaymentSuccessful(true);
      // setShowPaymentPending(false);
      toast.success("Payment Successfull")
    } else if (selectedPaymentOption === "cashPayment") {
      // setShowPaymentPending(true);
      // setPaymentSuccessful(false); // Reset payment successful status for cash payment
      toast.info("Payment pending , select COD")
    }

    setSelectedFinance(null);
    setSelectedDeliveryDate(null);
    setSelectedInsurance(null);
    setSelectedPaymentOption("");
  };



  
  //-----------------------Make A post request for user can book the car ---------------------------------
  const BookCar = () => {
    const userId = sessionStorage.getItem('userId');
    if (!selectedInsurance || !selectedFinance || !selectedDeliveryDate) {
      // Check if all required data is selected before making the booking
      console.log("Please select insurance, finance, and delivery date.");
      return;
    }

    const bookingData = {
      insuranceId: selectedInsurance,
      financeId: selectedFinance,
      deliveryDate: selectedDeliveryDate,
      carId: selectedCar.id,
      userId,
      status : status
      // status: selectedPaymentOption === "cardPayment" ? "SUCCESSFUL" : "PENDING",
  };

    const url = createUrl(`/bookings`);
    axios
      .post(url, bookingData)
      .then(function (response) {
        console.log("Booking successful:", response.data);
        // You might want to set some state here to indicate successful booking
        if (status === "SUCCESSFUL") {
          toast.success("Payment Successful");
          navigate("/");
        } else {
          toast.info("Payment pending, select COD");
          navigate("/");
        }
      })
      .catch(function (error) {
        console.log("Booking error:", error);
        toast.success("Payment Failure")
      });
  }


return (
  <div className="container">
  <div className="insurance-list">
    <center>
      <h1 className="selected-car">
        You Have Chosen {selectedCar.brandName} {selectedCar.modelName}
      </h1>
    </center>
    <div className="insurance-section">
      <h1 className="section-title">Select Insurance</h1>
      <div className="insurance-options">
        <div className="insurance-card-list">
          {insurance.map((data) => (
            <div
              key={data.insuranceId}
              className={`insurance-card ${
                selectedInsurance === data.insuranceId ? "selected" : ""
              }`}
              onClick={() => handleInsuranceChange(data.insuranceId)}
            >
              <h3 className="insurance-provider">{data.insuranceProvider}</h3>
              <p className="premium-amount">
                Premium Amount: {data.premiumAmt}
              </p>
              <p className="year">Year: {data.year}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="finance-section">
      <h1 className="section-title">Select Finance</h1>
      <div className="finance-options">
        <div className="finance-card-list">
          {finance.map((data) => (
            <div
              key={data.financeId}
              className={`finance-card ${
                selectedFinance === data.financeId ? "selected" : ""
              }`}
              onClick={() => handleFinanceChange(data.financeId)}
            >
              <h3 className="finance-name">{data.financeName}</h3>
              <p className="loan-amount">Loan Amount: {data.loanAmount}</p>
              <p className="interest-rate">Interest Rate: {data.interestRate}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  



{/* ------------------------------- Payment -------------------------------------- */}

<div className="container">
  <div className="delivery-payment-section">

    <div className="row">
      <div className="col">
        <form>
          <div className="mb-3">
            <label htmlFor="deliveryDate" className="form-label">
              Delivery Date:
            </label>
            <input
              type="date"
              className="form-control"
              id="deliveryDate"
              name="deliveryDate"
              value={selectedDeliveryDate}
              onChange={(e) => setSelectedDeliveryDate(e.target.value)}
              required
            />
          </div>
        </form>
      </div>
      <div className="col"></div>
      <div className="col"></div>
    </div>
  </div>

  <div className="delivery-payment-section">
    <h2 className="section-title">Enter Payment Details</h2>

    <div className="payment-options">
      <label>
        <input
          type="radio"
          name="options"
          value="cardPayment"
          checked={selectedPaymentOption === "cardPayment"}
          onChange={() => setSelectedPaymentOption("cardPayment")}
        />
        Card Payment
      </label>
      <label>
        <input
          type="radio"
          name="options"
          value="cashPayment"
          checked={selectedPaymentOption === "cashPayment"}
          onChange={() => setSelectedPaymentOption("cashPayment")}
        />
        Cash Payment
      </label>
    </div>

    <div className="payment-form">
      <div className="row justify-content-left">
        <div className="col-md-6">
          {selectedPaymentOption === "cashPayment" ? (
            <div>
              <button
                className="btn btn-primary"
                onClick={BookCar}
                disabled={!selectedInsurance}
              >
                Payment
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="cardNumber" className="form-label">
                  Card Number:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="Enter card number"
                  maxLength="16"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="cvv" className="form-label">
                  CVV:
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="cvv"
                  name="cvv"
                  placeholder="Enter CVV"
                  maxLength="3"
                  required
                />
              </div>
              <button
                type="submit"
                onClick={BookCar}
                className="btn btn-primary"
                disabled={!selectedInsurance}
              >
                Payment
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  </div>
</div>

</div>
</div>
);
};

export default BookingPage;