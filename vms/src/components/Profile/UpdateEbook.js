import React, { useState, useEffect, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { createUrl } from '../../utils/utils';
import { toast } from 'react-toastify';
import TermsModal from './TermsModel';
import { getAuthorizationHeader } from '../../utils/jwtUtil';
const UpdateEbook = () => {
  const { id } = useParams();
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const navigate = useNavigate();
  const epubFileInputRef = useRef(null);
  const coverImageInputRef = useRef(null);
  const handleTermsClick = () => {
    setShowTermsModal(true);
  };

  const handleCloseTermsModal = () => {
    setShowTermsModal(false);
  };

  const handleTermsCheck = () => {
    setTermsChecked(!termsChecked);
  };

  const [bookData, setBookData] = useState({
    title: '',
    genre: '',
    description: '',
    price: '',
    userId: '',
    bookId: id
  });
  const [epubFile, setEpubFile] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  useEffect(() => {
    fetchBookData();
  }, []);

  const fetchBookData = async () => {
    try {
      const url = createUrl(`/books/read/${id}`);
      const response = await axios.get(url, {
        headers: {
          Authorization: getAuthorizationHeader(),
        },
      });
      setBookData(response.data);
      // toast.success("Fetched book successfully");
    } catch (error) {
      console.error('Error fetching ebook data:', error);
    }
  };

  const handleFileChange = (event, setter) => {
    const file = event.target.files[0];
    setter(file);
  };
  
  const handleUpdate = async () => {
    // Make PUT request to update the ebook
    try {
      const formData = new FormData();
      formData.append('title', bookData.title);
      formData.append('genre', bookData.genre);
      formData.append('description', bookData.description);
      formData.append('price', bookData.price);
      formData.append('userId', sessionStorage.getItem('userId'));
      formData.append('bookId', id);
      formData.append('epubFile', epubFile);
      formData.append('coverImage', coverImage);
  
      const url = createUrl(`/books/update`);
      const response = await axios.put(url, formData, {
        headers: {
          Authorization: getAuthorizationHeader(),
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        toast.success('Ebook updated successfully');
      } else {
        toast.error('Failed to update ebook');
      }
    } catch (error) {
      console.error('Error updating ebook:', error);
      toast.error('Error updating ebook');
    }
  };
  

  const resetForm = () => {
    if (epubFileInputRef.current) epubFileInputRef.current.value = '';
    if (coverImageInputRef.current) coverImageInputRef.current.value = '';
    setEpubFile(null);
    setCoverImage(null);
    setTermsChecked(false);
  };
  const goBackToHome = () =>
  {
    navigate(-1);
  }

  const genreOptions = ['CHILDERNS', 'ROMANCE', 'YOUNG_ADULT', 'NON_FICTION', 'SCIENCE_FICTION', 'HORROR', 'BIOGRAPHIES'];

  return (
    <div className="upload-form-container">
        <button onClick={goBackToHome} className="btn btn-outline-dark m-2">Close</button>
      <h2 className="form-heading">Update Ebook</h2>
      <Form className="upload-form">
        <Form.Group controlId="bookName">
          <Form.Label>Book Name</Form.Label>
          <Form.Control type="text" value={bookData.title} onChange={(e) => setBookData({ ...bookData, title: e.target.value })} />
        </Form.Group>

        <Form.Group controlId="genre">
          <Form.Label>Genre</Form.Label>
          <Form.Control as="select" value={bookData.genre} onChange={(e) => setBookData({ ...bookData, genre: e.target.value })}>
            <option value="">Select Genre</option>
            {genreOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} value={bookData.description} onChange={(e) => setBookData({ ...bookData, description: e.target.value })} />
        </Form.Group>

        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control type="text" value={bookData.price} onChange={(e) => setBookData({ ...bookData, price: e.target.value })} />
        </Form.Group>

        <Form.Group controlId="epubFile">
          <Form.Label>Ebook File</Form.Label>
          <Form.Control type="file" accept=".epub" ref={epubFileInputRef} onChange={(e) => handleFileChange(e, setEpubFile)} />
        </Form.Group>

        <Form.Group controlId="coverImage">
          <Form.Label>Cover Image</Form.Label>
          <Form.Control type="file" accept="image/*" ref={coverImageInputRef} onChange={(e) => handleFileChange(e, setCoverImage)} />
        </Form.Group>

        <Form.Group controlId="termsCheckbox">
          <Form.Check
            type="checkbox"
            label="I agree to the terms and conditions"
            checked={termsChecked}
            onChange={handleTermsCheck}
          />
        </Form.Group>
        <Button variant="info" onClick={handleTermsClick}>
          View terms and conditions
        </Button>

        
        <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
          <Button variant="primary" onClick={handleUpdate}>
            Update
          </Button>
          <Button variant="secondary" onClick={resetForm}>
            Cancel
          </Button>
        </div>
      </Form>
       <TermsModal show={showTermsModal} handleClose={handleCloseTermsModal} />
    </div>
  );
};

export default UpdateEbook;
