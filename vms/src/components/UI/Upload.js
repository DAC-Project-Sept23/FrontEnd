// UploadForm.js
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './UploadForm.css';

const Upload = ({ onUpload }) => {
  const [bookName, setBookName] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [genre, setGenre] = useState('');
  const [epubFile, setEpubFile] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  const handleFileChange = (event, setter) => {
    const file = event.target.files[0];
    setter(file);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('bookName', bookName);
    formData.append('authorName', authorName);
    formData.append('genre', genre);
    formData.append('epubFile', epubFile);
    formData.append('coverImage', coverImage);
    //for now userID is 1
    formData.append('userId', 1);

    
    // Call the onUpload function passed from the parent component
    await onUpload(formData);

    // Clear form fields after upload
    setBookName('');
    setAuthorName('');
    setGenre('');
    setEpubFile(null);
    setCoverImage(null);
  };

  return (
    <div className="upload-form-container">
      <h2 className="form-heading">Upload Ebook</h2>
      <Form className="upload-form">
        <Form.Group controlId="bookName">
          <Form.Label>Book Name</Form.Label>
          <Form.Control type="text" value={bookName} onChange={(e) => setBookName(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="authorName">
          <Form.Label>Author Name</Form.Label>
          <Form.Control type="text" value={authorName} onChange={(e) => setAuthorName(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="genre">
          <Form.Label>Genre</Form.Label>
          <Form.Control type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="epubFile">
          <Form.Label>Ebook File</Form.Label>
          <Form.Control type="file" accept=".epub" onChange={(e) => handleFileChange(e, setEpubFile)} />
        </Form.Group>

        <Form.Group controlId="coverImage">
          <Form.Label>Cover Image</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={(e) => handleFileChange(e, setCoverImage)} />
        </Form.Group>

        <Button variant="primary" onClick={handleUpload}>
          Upload
        </Button>
      </Form>
    </div>
  );
};

export default Upload;
