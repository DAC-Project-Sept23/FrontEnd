import React, { useState, useEffect } from "react";
import Review from "./Review"; // Assuming Review component is in a separate file
import { createUrl } from "../../utils/utils";
import { toast } from 'react-toastify';

const Reviews = ({ id }) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const url = createUrl(`/reviews/${id}`);
                const response = await fetch(url);
                const data = await response.json();
                setReviews(data);
            } catch (error) {
                toast.error("Error fetching reviews.");
            }
        };

        fetchReviews();
    }, [id]);

    return (
        <div>
            {reviews && reviews.length > 0 ? (
                <div>
                    <h1>Reviews</h1>
                    {reviews.map((review, index) => (
                        <Review key={index} review={review} />
                    ))}
                </div>
            ) : (
                <h1>Be the first one to add a review!</h1>
            )}
        </div>
    );
    
    
};

export default Reviews;
