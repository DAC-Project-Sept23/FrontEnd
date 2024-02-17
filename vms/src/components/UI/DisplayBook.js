import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ReactReader } from 'react-reader';
import { createUrl } from '../../utils/utils';
import { toast } from 'react-toastify';
import SignInPrompt from './SignInPrompt'; // Import the SignInPrompt component
import BuyEbook from './BuyEbook';
const DisplayBook = ({ id, bought }) => {
  const [epubUrl, setEpubUrl] = useState(null);
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
  
  // useEffect(() => {
  //   setIsLoggedIn(sessionStorage.getItem('isLoggedIn') === 'true');
  //   const fetchUserBooks = async () => {
  //     try {
  //       const url = createUrl(`/transaction/${userId}`);
  //       const response = await fetch(url);
  //       if (response.ok) {
  //         const data = await response.json();
  //         setUserBooks(data);
  //         // setHasBoughtBook(data.includes(parseInt(id, 10)));
  //         setHasBoughtBook(data.includes(id));
  //         console.log(data);
  //         console.log('id' + id);
  //         toast.info(hasBoughtBook);
  //         console.log(hasBoughtBook);
  //       } else {
  //         console.error('Error fetching user books:', response.statusText);
  //         toast.error('Error fetching user books:', response.statusText);
  //       }
  //     } catch (error) {
  //       console.error('Error during fetchUserBooks:', error);
  //       toast.error('Error during fetchUserBooks:', error);
  //     }
  //   };

  //   if (isLoggedIn) {
  //     fetchUserBooks();
  //   }
  // }, [isLoggedIn]);
  useEffect(() => {
    setIsLoggedIn(sessionStorage.getItem('isLoggedIn') === 'true');
    const fetchUserBooks = async () => {
      try {
        const url = createUrl(`/transaction/${userId}`);
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setUserBooks(data);
          console.log('Data array:', data);
          console.log('Book id:', id);
          const hasBought = data.some(item => item == parseInt(id, 10));
          setHasBoughtBook(hasBought);
          console.log(hasBoughtBook);
        } else {
          console.error('Error fetching user books:', response.statusText);
          toast.error('Error fetching user books:', response.statusText);
        }
      } catch (error) {
        console.error('Error during fetchUserBooks:', error);
        toast.error('Error during fetchUserBooks:', error);
      }
    };
  
    if (isLoggedIn) {
      fetchUserBooks();
    }
  }, [isLoggedIn, id]);
  
  
  
  useEffect(() => {
    const fetchEbookDetails = async () => {
      try {
        const url = createUrl(`/books/read/${id}`);
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          // toast.success('Success fetching ebook');
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
        const response = await fetch(url);
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
    if(isLoggedIn)
    fetchOwnBooks();
  }, [isLoggedIn]);

  const handleLocationChanged = (newLocation) => {
    setPageCount(prevCount => prevCount + 1);
  }
  if (!isLoggedIn) {
    if (pageCount >= 10) {
      return <SignInPrompt />;
    }
  }
  if (isLoggedIn && (sessionStorage.getItem('userRole') == 'ADMIN' || !(hasBoughtBook || ownBook))) {
    if (pageCount >= 10) {
    return <BuyEbook id={id} />;
    }
  }
  const goBackToHome = () => {
    navigate(-1);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100vh' }}>
      <h2>Ebook Detail</h2>
      <button onClick={goBackToHome} className="btn btn-outline-dark m-2">Close</button>
      <div style={{ height: '100vh', width: '75vh' }}>
        <ReactReader
          title="Ebook Title" // Pass your ebook title here
          location={location}
          locationChanged={handleLocationChanged} // Handle location change event
          url={epubUrl}
          getRendition={(rendition) => { readerRef.current = rendition; }} // Store reference to the reader
          showToc={sessionStorage.getItem('userRole') == 'ADMIN' || hasBoughtBook || ownBook}
        />
      </div>
    </div>
  );
};

export default DisplayBook;




