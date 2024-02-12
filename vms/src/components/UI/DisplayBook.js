import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ReactReader } from 'react-reader';
import { createUrl } from '../../utils/utils';
import { toast } from 'react-toastify';

const DisplayBook = ({id}) => {
  const [epubUrl, setEpubUrl] = useState(null);
  const readerRef = useRef();
  const [location, setLocation] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const navigate = useNavigate();

  const locationChanged = (epubcifi) => {
    setLocation(epubcifi);
  };

  useEffect(() => {
    const fetchEbookDetails = async () => {
      try {
        const url = createUrl(`/books/read/${id}`);
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          toast.success('Success fetching ebook');
          const epubUrl = data.epubPath;
          // setEpubUrl(epubUrl);
          setEpubUrl('http://localhost:8080/books/epub_1707551478215.epub');
        } else {
          console.error('Error fetching ebook details:', response.statusText);
          toast.error('Error fetching ebook details:', response.statusText);
        }
      } catch (error) {
        console.error('Error during fetchEbookDetails:', error);
        toast.error('Error during fetchEbookDetails:', error);
      }
    };

    fetchEbookDetails();
  }, [id]);

  // useEffect(() => {
  //   if (readerRef.current && epubUrl) {
  //     readerRef.current.set('url', epubUrl);
  //   }
  // }, [epubUrl]);

  const handleJumpToPage = () => {
    if (readerRef.current && pageNumber >= 1) {
      readerRef.current.navigate(pageNumber);
    }
  };

  if (!epubUrl) {
    return <div>Loading...</div>;
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
          location={location}
          title="Ebook Title" // Pass your ebook title here
          locationChanged={locationChanged}
          url={epubUrl}
          epubOptions={{
            allowPopups: true,
            allowScriptedContent: true,
          }}
          ref={readerRef}
        />
      </div>
      <div style={{ marginTop: '20px' }}>
        <input type="number" value={pageNumber} onChange={(e) => setPageNumber(parseInt(e.target.value))} />
        <button onClick={handleJumpToPage}>Jump to Page</button>
      </div>
    </div>
  );
};

export default DisplayBook;