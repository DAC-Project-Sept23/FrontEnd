// EbookCard.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import heartOutlineIcon from '../../assets/all-images/svgs/heart-outline-icon.svg';
import heartFlatIcon from '../../assets/all-images/svgs/heart-flat-icon.svg';
import buyIcon from '../../assets/all-images/svgs/buy-label-icon.svg';
import readIcon from '../../assets/all-images/svgs/open-book-icon.svg';
import star from '../../assets/all-images/svgs/star-icon.svg';
import { createUrl } from '../../utils/utils';
import '../../styles/EbookCard.css'
import { getAuthorizationHeader } from '../../utils/jwtUtil';
const EbookCard = ({ id, coverImageContent, title, genre, firstName, lastName, price, wish, bought, rating, own, free}) => {
  const imageUrl = coverImageContent ? `data:image/jpeg;base64,${coverImageContent}` : 'placeholder_image_url.jpg';
  const [isHeartHovered, setIsHeartHovered] = useState(false);
  const [isBookHovered, setIsBookHovered] = useState(false);
  const [isBuyHovered, setIsBuyHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(wish);
  const userId = sessionStorage.getItem('userId');
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');
  const toggleWishlist = async () => {
    try {
      if(isLoggedIn)
      {
        const url = createUrl('/wishlist');
        if (isWishlisted) {
          // Make a delete request to remove from wishlist
          await fetch(url, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Authorization: getAuthorizationHeader(),
            },
            body: JSON.stringify({
              userId: userId,
              bookId: id,
            }),
          });
        } else {
          // Make a post request to add to wishlist
          await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: getAuthorizationHeader(),
            },
            body: JSON.stringify({
              userId: userId,
              bookId: id,
            }),
          });
        }
        setIsWishlisted(!isWishlisted);
      }
      else
      {
        toast.info('Please log in to add a book to your wishlist.')
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
      toast.error('Failed to toggle wishlist. Please try again.');
    }
  };
  
  return (
    <div className="col-md-4 col-lg-2 col-xl-2 mb-4 col-6">
      <Link to={`/read/${id}`} className="text-decoration-none text-dark">
        <div className="rounded position-relative fruite-item d-flex flex-column">
          <div className="fruite-img flex-grow-1">
            <img
              src={imageUrl}
              className="img-fluid w-100 rounded-top"
              alt={`Cover for ${title}`}
            />
          </div>
          <div className="text-white bg-secondary px-3 py-1 rounded position-absolute">
          {genre} {" "}

          <img
                  src={star}
                  alt="star"
                  height={15}
                  width={15}
                />
            {rating} 
          
          </div>
          <div className="p-3 border border-secondary border-top-0 rounded-bottom">
            <h5>{title} </h5>
            
            <p>
              <div style={{ fontSize: '1em' }}>By {firstName + " " + lastName}</div>
            </p>
            <div className="d-flex justify-content-between flex-lg-wrap">
              <p className="text-dark fs-5 fw-bold mb-0">{price == 0 ? 'FREE' : price}</p>
              {!bought && !own && !(sessionStorage.getItem('userRole') === 'ROLE_ADMIN') &&(<Link
                onMouseEnter={() => setIsHeartHovered(true)}
                onMouseLeave={() => setIsHeartHovered(false)}
                onClick={toggleWishlist}
                style={{ transform: isHeartHovered ? 'scale(1.2)' : 'scale(1)' }}
              >
                <img
                  src={isWishlisted || isHeartHovered ? heartFlatIcon : heartOutlineIcon}
                  alt="Heart Icon"
                  height={25}
                  width={25}
                />
              </Link>)}
               {((free || bought || own || (sessionStorage.getItem('userRole') === 'ROLE_ADMIN')) ? 
               (
                <Link to={{
                  pathname: `/read/${id}`,
                  state: { bought: bought }
                }}
                  onMouseEnter={() => setIsBookHovered(true)}
                  onMouseLeave={() => setIsBookHovered(false)}
                  style={{ transform: isBookHovered ? 'scale(1.2)' : 'scale(1)' }}
                  
                >
                 <img
                  src={readIcon}
                  alt="Read Icon"
                  height={40}
                  width={40}
                />
              </Link>
               ) : 
               (<Link 
                  to={isLoggedIn ? `/buy/${id}` : `/login`}
                  onMouseEnter={() => setIsBuyHovered(true)}
                  onMouseLeave={() => setIsBuyHovered(false)}
                  style={{ transform: isBuyHovered ? 'scale(1.2)' : 'scale(1)' }}
               >
               <img
                  src={buyIcon}
                  alt="Buy Icon"
                  height={40}
                  width={40}
                />
               </Link>))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default EbookCard;



