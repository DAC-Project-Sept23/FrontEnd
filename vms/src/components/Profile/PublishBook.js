import React, { useState, useRef, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { createUrl, log } from '../../utils/utils';
import { toast } from 'react-toastify';
import '../../styles/PublishBook.css'
import TermsModal from './TermsModel';
const PublishBook = () => {
  const epubFileInputRef = useRef(null);
  const coverImageInputRef = useRef(null);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);

  const handleTermsClick = () => {
    setShowTermsModal(true);
  };

  const handleCloseTermsModal = () => {
    setShowTermsModal(false);
  };

  const handleTermsCheck = () => {
    setTermsChecked(!termsChecked);
  };
  const onUpload = async (formData) => {
    try {
      const url = createUrl('/books/upload');
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (response.status === 200) {
        toast.success('Upload Successful');
      } else {
        toast.error('Upload failed');
      }
    } catch (error) {
      toast.error('Error during upload');
    }
  };

  const [bookName, setBookName] = useState('');
  const [genre, setGenre] = useState('');
  const [epubFile, setEpubFile] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    //change it const
    var userIdFromStorage = sessionStorage.getItem('userId');
    // delete this later
    userIdFromStorage = 1;
    if (userIdFromStorage) {
      setUserId(userIdFromStorage);
    }
  }, []);

  const handleFileChange = (event, setter) => {
    const file = event.target.files[0];
    setter(file);
  };

  const handleUpload = async () => {
    if (!bookName || !genre || !description || !price || !epubFile || !coverImage) {
      toast.error('Please fill all fields and select files.');
      return;
    }
    if (!termsChecked) {
      toast.error('Please agree to the terms and conditions.');
      return;
  }

    const formData = new FormData();
    formData.append('title', bookName);
    formData.append('genre', genre);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('userId', userId);
    formData.append('epubFile', epubFile);
    formData.append('coverImage', coverImage);

    await onUpload(formData);
    resetForm();
  };

  const resetForm = () => {
    setBookName('');
    setGenre('');
    setDescription('');
    setPrice('');
    if (epubFileInputRef.current) epubFileInputRef.current.value = '';
    if (coverImageInputRef.current) coverImageInputRef.current.value = '';
    setEpubFile(null);
    setCoverImage(null);
    setTermsChecked(false);
  };
  const genreOptions = ['CHILDERNS', 'ROMANCE', 'YOUNG_ADULT', 'NON_FICTION', 'SCIENCE_FICTION', 'HORROR', 'BIOGRAPHIES'];
  return (
    <div className="upload-form-container">
      <h2 className="form-heading">Upload Ebook</h2>
      <Form className="upload-form">
        <Form.Group controlId="bookName">
          <Form.Label>Book Name</Form.Label>
          <Form.Control type="text" value={bookName} onChange={(e) => setBookName(e.target.value)} />
        </Form.Group>

        {/* <Form.Group controlId="genre">
          <Form.Label>Genre</Form.Label>
          <Form.Control type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />
        </Form.Group> */}

        <Form.Group controlId="genre">
          <Form.Label>Genre</Form.Label>
          <Form.Control as="select" value={genre} onChange={(e) => setGenre(e.target.value)}>
            <option value="">Select Genre</option>
            {genreOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
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
          <Button variant="primary" onClick={handleUpload}>
            Upload
          </Button>
          <Button variant="secondary" onClick={resetForm}>
            Reset
          </Button>
        </div>
      </Form>
       <TermsModal show={showTermsModal} handleClose={handleCloseTermsModal} />
    </div>
  );
};

export default PublishBook;
