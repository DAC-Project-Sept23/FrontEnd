import React, { useState } from 'react';
import '../styles/test-drive.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { createUrl, log } from '../utils/utils';

const TestDrivePage = () => {
  const location = useLocation();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [testDriveDate, setTestDriveDate] = useState('');
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  


  const carDetails = location.state;
  const handleSubmit = async (event) => {
    const userId = sessionStorage.getItem('userId')
    event.preventDefault();
    try {
      // Prepare the data to be sent in the POST request
      const requestData = {
        userId,
        carId :carDetails.id,
        testDriveDate,
        comments,
        
      };

      // Make the POST request
      const url = createUrl('/testdrive');
      const response = await axios.post(url, requestData);

      if (response) {
        setSubmitted(true);
        toast.success('Thank you for requesting a test drive. We will contact you shortly.'); 
      } else {
        log('Failed to submit the form.');
      }
    } catch (error) {
      log('An error occurred while submitting the form:', error);
    }
  };


  

  return (
    <div className="test-drive-container">
      <h2>Test Drive Page</h2>
      {submitted ? (
        <p>Thank you for requesting a test drive. We will contact you shortly.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Car Brand:</label>
            <input type="text" value={carDetails.brandName} readOnly disabled />
          </div>

          <div>
            <label>Car Model:</label>
            <input type="text" value={carDetails.modelName} readOnly disabled />
          </div>

          <div>
            <label>Full Name:</label>
            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
          </div>

          <div>
            <label>Phone Number:</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>

          <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div>
            <label>Test Drive Date:</label>
            <input type="date" value={testDriveDate} onChange={(e) => setTestDriveDate(e.target.value)} required />
          </div>

          <div>
            <label>Comments:</label>
            <textarea
              rows="4"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Additional comments..."
            />
          </div>

          <button type="submit">Request Test Drive</button>
        </form>
      )}
    </div>
  );
};

export default TestDrivePage;