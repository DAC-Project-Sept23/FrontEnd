import React, { useState } from 'react';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Show loading indicator
    setErrorMessage(''); // Clear any previous errors

    // Validate password fields
    if (!currentPassword) {
      setErrorMessage('Current password is required.');
      setIsLoading(false);
      return;
    }
    if (!newPassword) {
      setErrorMessage('New password is required.');
      setIsLoading(false);
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage('New passwords must match.');
      setIsLoading(false);
      return;
    }

    // Replace this with your actual password change logic (using API calls, etc.)
    try {
      const response = await fetch('/api/change-password', {
        method: 'POST',
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to change password.');
      }

      // Password changed successfully, handle success (e.g., show a message)
      console.log('Password changed successfully!');
      setIsLoading(false);
      // Implement success handling, like showing a confirmation message
    } catch (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="change-password-inner">
      <form onSubmit={handleSubmit}>
        <label htmlFor="current-password">Current Password:</label>
        <input
          type="password"
          id="current-password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />
        <label htmlFor="new-password">New Password:</label>
        <input
          type="password"
          id="new-password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <label htmlFor="confirm-password">Confirm Password:</label>
        <input
          type="password"
          id="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Change Password'}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
