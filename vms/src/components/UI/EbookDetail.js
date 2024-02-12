// import React, { useState, useEffect } from "react";
// import { useParams } from 'react-router-dom';
// import Reviews from './Reviews';
// import PostReview from './PostReview';
// import DisplayBook from './DisplayBook';
// import { createUrl } from "../../utils/utils";
// import { toast } from 'react-toastify';

// const EbookDetail = () => {
//   const { id } = useParams();
//   const [reviews, setReviews] = useState([]);

//     useEffect(() => {
//         const fetchReviews = async () => {
//             try {
//                 const url = createUrl(`/rating/${id}`);
//                 const response = await fetch(url);
//                 const data = await response.json();
//                 setReviews(data);
//             } catch (error) {
//                 toast.error("Error fetching reviews.");
//             }
//         };

//         fetchReviews();
//     }, [id]);
//   return (
//     <>
//     <DisplayBook id={id}/>
//     <PostReview bookId={id}/>
//     <Reviews reviews={reviews}/>
//     </>
//   );
// };

// export default EbookDetail;

import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Reviews from './Reviews';
import PostReview from './PostReview';
import DisplayBook from './DisplayBook';
import { createUrl } from "../../utils/utils";
import { toast } from 'react-toastify';

const EbookDetail = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  // const loggedInUserId = sessionStorage.getItem('userId');
  const loggedInUserId = 1;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const url = createUrl(`/rating/${id}`);
        const response = await fetch(url);
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
                'Content-Type': 'application/json'
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
                'Content-Type': 'application/json'
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

  const userHasPostedReview = reviews.some(review => review.userId === loggedInUserId);

  return (
    <>
      <DisplayBook id={id}/>
      {!userHasPostedReview && <PostReview bookId={id}/>}
      <Reviews reviews={reviews} userId={loggedInUserId} onDelete={handleDelete} onUpdate={handleUpdate}/>
    </>
  );
};

export default EbookDetail;







