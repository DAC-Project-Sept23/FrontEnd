import React from "react";
import '../../styles/Review.css';
import Review from "./Review"; // Assuming Review component is in a separate file

const Reviews = ({ reviews, userId, onDelete, onUpdate }) => {
    const handleDelete = (review) => {
        onDelete(review);
    };

    const handleUpdate = (review) => {
        onUpdate(review);
    };
    return (
        <div className="container col-lg-4" style={{ justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
            {reviews && reviews.length > 0 ? (
                <div>
                    <h1>Reviews</h1>
                    {reviews.map((review, index) => (
                        <Review key={index} review={review} userId={userId} onDelete={handleDelete} onUpdate={handleUpdate} />
                    ))}
                </div>
            ) : (
                !(sessionStorage.getItem('userRole') === 'ROLE_ADMIN') && <h1>Be the first one to add a review!</h1>
            )}
        </div>
    );
};

export default Reviews;

