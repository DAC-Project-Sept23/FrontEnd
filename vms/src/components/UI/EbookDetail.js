import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Reviews from './Reviews';
import PostReview from './PostReview';
import DisplayBook from './DisplayBook';
import { createUrl } from "../../utils/utils";
import { toast } from 'react-toastify';
import { getAuthorizationHeader } from "../../utils/jwtUtil";
const EbookDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  const userId = sessionStorage.getItem('userId');
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const url = createUrl(`/rating/${id}`);
        const response = await fetch(url, {
          headers: {
            Authorization: getAuthorizationHeader(),
          },
        });
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        toast.error("Error fetching reviews.");
      }
    };

    fetchReviews();
  }, [id]);

  const handleDelete = async (reviewToDelete) => {
    try {
        // Perform API call to delete review
        const url = createUrl('/rating');
        reviewToDelete.bookId = id;
        await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: getAuthorizationHeader(),
            },
            body: JSON.stringify(reviewToDelete)
        });
        
        const updatedReviews = reviews.filter(review => review !== reviewToDelete);
        setReviews(updatedReviews);
        toast.success("Review deleted successfully.");
    } catch (error) {
        console.error("Error deleting review:", error);
        toast.error("Error deleting review.");
    }
};


const handleUpdate = async (updatedReview) => {
    try {
        // Perform API call to update review
        const url = createUrl('/rating');
        updatedReview.bookId = id;
        await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: getAuthorizationHeader(),
            },
            body: JSON.stringify(updatedReview)
        });

        // Update state
        const updatedReviews = reviews.map(review =>
            review.id === updatedReview.id ? updatedReview : review
        );
        setReviews(updatedReviews);
        toast.success("Review updated successfully.");
    } catch (error) {
        console.error("Error updating review:", error);
        toast.error("Error updating review.");
    }
   };
  const userHasPostedReview = reviews.some(review => review.userId == userId);
  const goBackToHome = () => {
    navigate(-1);
  };
  return (
    <div>
    {/* <button onClick={goBackToHome} className="btn btn-outline-dark m-2">Close</button> */}
    <DisplayBook id={id}/>
    {isLoggedIn && !userHasPostedReview && !(sessionStorage.getItem('userRole') === 'ROLE_ADMIN') && <PostReview bookId={id}/>}
    <Reviews reviews={reviews} userId={userId} onDelete={handleDelete} onUpdate={handleUpdate}/>
  </div>
  );
};

export default EbookDetail;







