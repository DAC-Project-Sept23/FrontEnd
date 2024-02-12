import React from "react";
import '../../styles/Review.css';
import Review from "./Review"; // Assuming Review component is in a separate file

const Reviews = ({ reviews, userId, onDelete, onUpdate }) => {
    const handleDelete = (review) => {
        // Call onDelete function with the review to be deleted
        onDelete(review);
    };

    const handleUpdate = (review) => {
        // Call onUpdate function with the review to be updated
        onUpdate(review);
    };

    return (
        <div className="container col-lg-4">
            {reviews && reviews.length > 0 ? (
                <div>
                    <h1>Reviews</h1>
                    {reviews.map((review, index) => (
                        <Review key={index} review={review} userId={userId} onDelete={handleDelete} onUpdate={handleUpdate} />
                    ))}
                </div>
            ) : (
                <h1>Be the first one to add a review!</h1>
            )}
        </div>
    );
};

export default Reviews;

