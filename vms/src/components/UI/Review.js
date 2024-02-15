import React, { useState } from "react";
import '../../styles/Review.css'
import deleteIcon from '../../assets/all-images/svgs/recycle-bin-icon.svg'
import { Link } from "react-router-dom";
const Review = ({ review, userId, onEdit, onDelete }) => {
    const [isDeleteHovered, setIsDeleteHovered] = useState(false);
    // Function to calculate the time difference in weeks
    const calculateWeeksAgo = (timestamp) => {
        const millisecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
        const currentTimestamp = Date.now();
        const diffInMilliseconds = currentTimestamp - new Date(timestamp).getTime(); // Convert ISO 8601 to milliseconds
        const diffInWeeks = Math.floor(diffInMilliseconds / millisecondsPerWeek);
        return `${diffInWeeks} weeks ago`;
    };
    return (
        <div className="right container" style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px' }}>
        <h4 style={{ display: 'flex', alignItems: 'center' }}>
        {review.firstName + " " + review.lastName}
        <span className="gig-rating text-body-2" style={{ marginRight: 'auto' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" width="15" height="15">
                <path
                    fill="currentColor"
                    d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"
                ></path>
            </svg>
            {review.rating}
        </span>
        {userId == review.userId && (
            <Link
                onMouseEnter={() => setIsDeleteHovered(true)}
                onMouseLeave={() => setIsDeleteHovered(false)}
                onClick={() => onDelete(review)}
                style={{
                    transform: isDeleteHovered ? 'scale(1.2)' : 'scale(1)',
                    transition: 'transform 0.2s ease-in-out'
                }}
            >
                <img
                    src={deleteIcon}
                    alt="Delete Icon"
                    height={18}
                    width={18}
                />
            </Link>
        )}
    </h4>
    <div className="review-description">
        <p>{review.comment}</p>
    </div>
    <span className="publish py-3 d-inline-block w-100">Published {calculateWeeksAgo(review.timestamp)}</span>
    </div>
    );
};

export default Review;


