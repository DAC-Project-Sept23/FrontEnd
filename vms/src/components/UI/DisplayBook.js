import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ReactReader } from 'react-reader';
import { createUrl } from '../../utils/utils';
import { toast } from 'react-toastify';
import SignInPrompt from './SignInPrompt'; // Import the SignInPrompt component
import BuyEbook from './BuyEbook';
import { getAuthorizationHeader } from '../../utils/jwtUtil';
const DisplayBook = ({ id, bought }) => {
  const [epubUrl, setEpubUrl] = useState(null);
  const [ebook, setEbook] = useState([]);
  const readerRef = useRef();
  const [location, setLocation] = useState(null);
  const [pageCount, setPageCount] = useState(0); // Counter for page count
  const [userBooks, setUserBooks] = useState([]); // Array of book IDs bought by the user
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track if user is logged in
  const navigate = useNavigate();
  const [hasBoughtBook, setHasBoughtBook] = useState(false);
  const [ownBooks, setOwnBooks] = useState([]);
  const [ownBook, setOwnBook] = useState(false);
  const userId = sessionStorage.getItem('userId');
  const [coverImage, setCoverImage] = useState("");
  const [isFree, setIsFree] = useState(false);
  
  useEffect(() => {
    setIsLoggedIn(sessionStorage.getItem('isLoggedIn') === 'true');
    const fetchUserBooks = async () => {
      try {
        const url = createUrl(`/transaction/${userId}`);
        const response = await fetch(url, {
          headers: {
            Authorization: getAuthorizationHeader(),
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUserBooks(data);
          const hasBought = data.some(item => item == parseInt(id, 10));
          setHasBoughtBook(hasBought);
        } else {
          console.error('Error fetching user books:', response.statusText);
          toast.error('Error fetching user books:', response.statusText);
        }
      } catch (error) {
        console.error('Error during fetchUserBooks:', error);
        toast.error('Error during fetchUserBooks:', error);
      }
    };
  
    if (isLoggedIn && !(sessionStorage.getItem('userRole') === 'ROLE_ADMIN')) {
      fetchUserBooks();
    }
  }, [isLoggedIn, id]);
  
  
  
  useEffect(() => {
    const fetchEbookDetails = async () => {
      try {
        const url = createUrl(`/books/read/${id}`);
        const response = await fetch(url, {
          headers: {
            Authorization: getAuthorizationHeader(),
          },
        });
        if (response.ok) {
          const data = await response.json();
          // toast.success('Success fetching ebook');
          setEbook(data);
          if(data.price == 0)
          setIsFree(true);
          setCoverImage(data.coverImageContent ? `data:image/jpeg;base64,${data.coverImageContent}` : 'placeholder_image_url.jpg')
          const fullEpubUrl = data.filePath;
          const bookUrl = createUrl(`/books/${fullEpubUrl}`)
          // toast.error(bookUrl);
          setEpubUrl(bookUrl);
        } else {
          console.error('Error fetching ebook details:', response.statusText);
          // toast.error('Error fetching ebook details:', response.statusText);
        }
      } catch (error) {
        console.error('Error during fetchEbookDetails:', error);
        // toast.error('Error during fetchEbookDetails:', error);
      }
    };

    fetchEbookDetails();
  }, [id]); // Include id in dependency array

  useEffect(() => {
    const fetchOwnBooks = async () => {
      try {
        const url = createUrl(`/books/own/${userId}`);
        const response = await fetch(url, {
          headers: {
            Authorization: getAuthorizationHeader(),
          },
        });
        if (response.ok) {
          const data = await response.json();
          setOwnBooks(data);
          setOwnBook(data.includes(parseInt(id, 10)));
          console.log(data);
        } else {
          console.error('Error fetching own list:', response.statusText);
          toast.error('Error fetching own list');
        }
      } catch (error) {
        console.error('Error during fetch own list:', error);
        toast.error('Error fetching own list');
      }
    };
    if(isLoggedIn && !(sessionStorage.getItem('userRole') === 'ROLE_ADMIN'))
    fetchOwnBooks();
  }, [isLoggedIn]);

  const handleLocationChanged = (newLocation) => {
    setPageCount(prevCount => prevCount + 1);
    setLocation(newLocation);
  }
  if (!isFree && !isLoggedIn) {
    if (pageCount >= 5) {
      return <SignInPrompt />;
    }
  }
  if (isLoggedIn){
    if(!(sessionStorage.getItem('userRole') === 'ROLE_ADMIN'))
    {
      if(!(hasBoughtBook || ownBook || isFree))
      {
        if (pageCount >= 5) {
          return <BuyEbook id={id} />;
          }
      }
    }
  }
  const goBackToHome = () => {
    navigate(-1);
  };

  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100vh', marginTop: '50px' }}>
      {/* <h2>Ebook</h2> */}
      <button onClick={goBackToHome} className="btn btn-outline-dark m-2">Close</button>
      <div className="col-sm-12"
      style={{ height: '100vh', width: '100%' }}
      allow="fullscreen"
      allow-scripts>
        <ReactReader
          title={ebook.title}// Pass your ebook title here 
          location={location}
          locationChanged={handleLocationChanged} // Handle location change event
          url={epubUrl}
          getRendition={(rendition) => { readerRef.current = rendition; }} // Store reference to the reader
          showToc={sessionStorage.getItem('userRole') == 'ROLE_ADMIN' || hasBoughtBook || ownBook}
          epubOptions={{
            allowPopups: true,
            allowScriptedContent: true,
          }}
        />
      </div>
    </div>
    <div className='container' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
    <img
      src={coverImage}
      className="img-fluid rounded-top"
      alt={`Cover for ${ebook.title}`}
      height={250}
      width={'20%'}
    />
    {ebook.description}
  </div>
  </>
  );
};

export default DisplayBook;




