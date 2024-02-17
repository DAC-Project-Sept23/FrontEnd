import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { createUrl } from '../../utils/utils';
import { getAuthorizationHeader } from '../../utils/jwtUtil';

const AccountDetails = () => {
  const [userDetails, setUserDetails] = useState({
    email: '',
    firstName: '',
    lastName: '',
    birthdate: '',
  });
  const [originalUserDetails, setOriginalUserDetails] = useState({}); // Store original user details
  const [isEditable, setIsEditable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const userId = sessionStorage.getItem('userId');
  useEffect(() => {
    if (userId) {
      fetchUserDetails(userId);
    }
  }, []);

  const fetchUserDetails = async (userId) => {
    try {
      const url = createUrl(`/users/${userId}`)
      const response = await fetch(url, {
        headers: {
          Authorization: getAuthorizationHeader(),
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUserDetails(data);
        setOriginalUserDetails(data); // Save original user details
      } else {
        toast.error('Failed to fetch user details');
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      toast.error('Error fetching user details. Please try again later.');
    }
  };

  const updateUserDetails = async () => {
    try {
      const url = createUrl(`/users/${userId}`)
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization:  getAuthorizationHeader(),
        },
        body: JSON.stringify({
          firstName: userDetails.firstName,
          lastName: userDetails.lastName,
          dob: userDetails.birthdate,
          id : userId
        }),
      });
      if (response.ok) {
        toast.success('User details updated successfully');
        setIsEditable(false);
      } else {
        toast.error('Failed to update user details');
      }
    } catch (error) {
      console.error('Error updating user details:', error);
      toast.error('Error updating user details. Please try again later.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    updateUserDetails();
    setIsLoading(false);
  };

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleCancelClick = () => {
    // Revert to original user details when cancel is clicked
    setUserDetails(originalUserDetails);
    setIsEditable(false);
  };

  return (
    <div className="upload-form-container">
      <h2 className="form-heading">My Details</h2>
      <Form className="user-detail-form" onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={userDetails.email}
            readOnly
          />
        </Form.Group>

        <Form.Group controlId="firstName">
          <Form.Label>First Name:</Form.Label>
          <Form.Control
            type="text"
            value={userDetails.firstName}
            onChange={(e) => setUserDetails({ ...userDetails, firstName: e.target.value })}
            readOnly={!isEditable}
            required
          />
        </Form.Group>

        <Form.Group controlId="lastName">
          <Form.Label>Last Name:</Form.Label>
          <Form.Control
            type="text"
            value={userDetails.lastName}
            onChange={(e) => setUserDetails({ ...userDetails, lastName: e.target.value })}
            readOnly={!isEditable}
            required
          />
        </Form.Group>

        <Form.Group controlId="birthdate">
          <Form.Label>Birthdate:</Form.Label>
          <Form.Control
            type="date"
            value={userDetails.dob}
            onChange={(e) => setUserDetails({ ...userDetails, birthdate: e.target.value })}
            readOnly={!isEditable}
            required
          />
        </Form.Group>

        <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
          {!isEditable && (
            <Button variant="primary" onClick={handleEditClick}>
              Edit
            </Button>
          )}
          {isEditable && (
            <>
              <Button variant="primary" type="submit" disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save'}
              </Button>
              <Button variant="secondary" onClick={handleCancelClick} disabled={isLoading}>
                Cancel
              </Button>
            </>
          )}
        </div>
      </Form>
    </div>
  );
};

export default AccountDetails;


