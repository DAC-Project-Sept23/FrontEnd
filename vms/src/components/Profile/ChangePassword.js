import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { createUrl, log } from '../../utils/utils';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/ChangePassword.css';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(newPassword === confirmPassword)
    {
      setIsLoading(true);
      try {
        const userId = sessionStorage.getItem('userId');
        const url = createUrl(`/users/password/${userId}`);
        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ oldPass: currentPassword, newPass: newPassword, userId: userId }),
        });
      
        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage || 'Failed to change password.');
        }
      
        toast.success('Password changed successfully!');
        setIsLoading(false);
        resetForm();
      } catch (error) {
        toast.error(error.message || 'Failed to change password.');
        setIsLoading(false);
      }
    }
    else
    {
      toast.error('New password not matching with confirm password.');
      setIsLoading(false);
      resetForm();
    }
    
  };

  const resetForm = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="upload-form-container">
      <h2 className="form-heading">Change Password</h2>
      <Form className="change-password-form" onSubmit={handleSubmit}>
        <Form.Group controlId="currentPassword">
          <Form.Label>Current Password:</Form.Label>
          <Form.Control type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="newPassword">
          <Form.Label>New Password:</Form.Label>
          <Form.Control type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </Form.Group>
        <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
          <Button variant="primary" type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Change Password'}
          </Button>
          <Button variant="secondary" onClick={resetForm} disabled={isLoading}>
            Reset
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ChangePassword;
