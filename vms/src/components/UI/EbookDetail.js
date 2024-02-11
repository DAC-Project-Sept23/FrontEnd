import React from 'react';
import { useParams } from 'react-router-dom';
import Reviews from './Reviews';
import PostReview from './PostReview';
import DisplayBook from './DisplayBook';
const EbookDetail = () => {
  const { id } = useParams();
  return (
    <>
    <DisplayBook id={id}/>
    <PostReview bookId={id}/>
    <Reviews id={id}/>
    </>
  );
};

export default EbookDetail;






