// EbookCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
const EbookCard = ({ id, coverImageContent, title, genre, firstName, lastName, price }) => {
  const imageUrl = coverImageContent ? `data:image/jpeg;base64,${coverImageContent}` : 'placeholder_image_url.jpg';

  return (
    <div className="col-md-4 col-lg-2 col-xl-2 mb-4 col-6">
      {/* <Link to={`/read/${id}`} className="text-decoration-none text-dark"> */}
      <Link to={`/read/1`} className="text-decoration-none text-dark">
        <div className="rounded position-relative fruite-item d-flex flex-column">
          <div className="fruite-img flex-grow-1">
            <img
              src={imageUrl}
              className="img-fluid w-100 rounded-top"
              alt={`Cover for ${title}`}
            />
          </div>
          <div className="text-white bg-secondary px-3 py-1 rounded position-absolute">
            {genre}
          </div>
          <div className="p-3 border border-secondary border-top-0 rounded-bottom">
            <h5>{title}</h5>
            <p>
              <h5>By {firstName + " " + lastName}</h5>
            </p>
            <div className="d-flex justify-content-between flex-lg-wrap">
              <p className="text-dark fs-5 fw-bold mb-0">{price}</p>
              <button
                type="button"
                className="btn border border-secondary rounded-pill px-3 text-primary"
              >
                <i className="fa fa-shopping-bag me-2 text-primary" /> Buy
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default EbookCard;



