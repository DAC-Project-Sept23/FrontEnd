//EbookDetail
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ReactReader } from 'react-reader';
import { createUrl, log } from '../../utils/utils';
import { toast } from 'react-toastify';
const EbookDetail = () => {
  const { id } = useParams();
  const [ebook, setEbook] = useState(null);
  const readerRef = useRef();
  const [location, setLocation] = useState(null);
  const [pageNumber, setPageNumber] = useState(1); // State for page number
  const navigate = useNavigate();

  const locationChanged = (epubcifi) => {
    setLocation(epubcifi);
  };

  useEffect(() => {
    const fetchEbookDetails = async () => {
      try {
        // const url = createUrl(`/books/read/${id}`);
        const url = createUrl(`/books/read/6`);
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          toast.success('Success fetching ebook');
          setEbook(data);
        } else {
          console.error('Error fetching ebook details:', response.statusText);
          toast.error('Error fetching ebook');
        }
      } catch (error) {
        console.error('Error during fetchEbookDetails:', error);
        toast.error('Error fetching ebook');
      }
    };

    fetchEbookDetails();
  }, [id]);
  console.log(ebook);

  useEffect(() => {
    if (readerRef.current && ebook) {
      // Manually set the content of the iframe
      readerRef.current.set('url', ebook.epub_path);
    }
  }, [ebook]);

  const handleJumpToPage = () => {
    if (readerRef.current && pageNumber >= 1) {
      readerRef.current.navigate(pageNumber);
    }
  };

  if (!ebook) {
    return <div>Loading...</div>;
  }

  const goBackToHome = () => {
    // Use the navigate function to navigate back to the previous page
    navigate(-1);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100vh' }}>
      <h2>Ebook Detail</h2>
      {/* <p>Ebook ID: {id}</p> */}
      <button onClick={goBackToHome} className="btn btn-outline-dark m-2">Close</button>
      <div style={{ height: '100vh', width: '75vh' }}>
        <ReactReader
          location={location}
          title={ebook.book_name}
          locationChanged={locationChanged}
          url={ebook.epub_path}
          epubOptions={{
            allowPopups: true,
            allowScriptedContent: true,
          }}
        />
      </div>
      {/* <div>
        <h3>Cover Image</h3>
        <img
          src={ebook.cover_image_path}
          alt={`Cover for ${ebook.book_name}`}
          style={{ maxWidth: '300px' }}
        />
      </div> */}
       {/* <div style={{ marginTop: '20px' }}>
        <input type="number" value={pageNumber} onChange={(e) => setPageNumber(parseInt(e.target.value))} />
        <button onClick={handleJumpToPage}>Jump to Page</button>
      </div> */}
    </div>
    
  );
};

export default EbookDetail;
