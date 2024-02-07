import React from 'react';

const AccountDetails = () => {
  return (
    <div className="account-details-inner">
      {/* Render fields for email, phone number, address, etc. */}
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" value="johndoe@example.com" disabled />
      <label htmlFor="phone">Phone:</label>
      <input type="tel" id="phone" value="+1234567890" disabled />
      {/* Add edit functionality if needed */}
    </div>
  );
};

export default AccountDetails;
