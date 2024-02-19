import React from 'react';

const CreatorCard = ({ name, role, description, photo }) => {
  return (
    <div className="creator-card">
      <div className="card-image">
        <img src={`${photo}`} alt={name} />
      </div>
      <div className="card-content">
        <h3 className="creator-name">{name}</h3>
        <p className="creator-role">{role}</p>
        <p className="creator-description">{description}</p>
      </div>
    </div>
  );
};

export default CreatorCard;