import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/PostReview.css';
import { createUrl } from "../../utils/utils";
const PostReview = () => {
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0); // Initialize rating state to 0

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Validate if review or rating is empty
        if (!review.trim() || rating === 0) {
            toast.error('Please provide a review and rating.');
            return;
        }
        
        // Make an API call to submit the review
        try {
            const url = createUrl('/reviews');
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ review, rating })
            });
            
            if (response.ok) {
                toast.success('Review submitted successfully!');
                // Reset form fields or perform any other necessary actions
                handleReset();
            } else {
                throw new Error('Failed to submit review.');
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            toast.error('Failed to submit review. Please try again later.');
        }
    };

    const handleReset = () => {
        setReview("");
        setRating(0);
    };

    // Function to update rating
    const updateRating = (n) => {
        setRating(n);
    };
    const handleReviewChange = (event) => {
        const text = event.target.value;
        if (text.length > 500) {
            toast.warn('Maximum review length exceeded (500 characters).');
        }
        else
        {
            setReview(text);
        }
    };

    return (
        <div className="upload-form-container">
            <h2 className="form-heading">Post Review</h2>
            <Form className="change-password-form" onSubmit={handleSubmit}>
                <Form.Group controlId="review">
                    <Form.Label>Review:</Form.Label>
                    <Form.Control as="textarea" value={review} onChange={handleReviewChange}/>
                </Form.Group>

                <div>
                    <Form.Label>Rating:</Form.Label>
                    <div>
                        {[1, 2, 3, 4, 5].map((value) => (
                            <span key={value} className="star" onClick={() => updateRating(value)}>
                                {value <= rating ? "★" : "☆"}
                            </span>
                        ))}
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    <Button variant="secondary" onClick={handleReset}>
                        Reset
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default PostReview;
