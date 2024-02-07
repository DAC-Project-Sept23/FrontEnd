// import React, { useState } from 'react';
// import { Form, Button } from 'react-bootstrap';
// import { createUrl, log } from '../../utils/utils';
// import { toast } from 'react-toastify';
// const PublishBook = () => {
//   const onUpload = async (formData) => {
//     try {
//       const url = createUrl('/books/upload');
//       const response = await fetch(url, {
//         method: 'POST',
//         body: formData,
//       });

//       if (response.status === 200) {
//         // console.log('Upload successful');
//         toast.success('Upload Successful')
//       } else {
//         // console.error('Upload failed');
//         toast.error('Upload failed');
//       }
//     } catch (error) {
//       // console.error('Error during upload:', error);
//       toast.error('Error during upload');
//     }
//   };
//   const [bookName, setBookName] = useState('');
//   const [genre, setGenre] = useState('');
//   const [epubFile, setEpubFile] = useState(null);
//   const [coverImage, setCoverImage] = useState(null);
//   const [description, setDescription] = useState('');
//   const [price, setPrice] = useState('');


//   // const handleFileChange = (event, setter) => {
//   //   const file = event.target.files[0];
//   //   setter(file);
//   // };

//   const handleFileChange = (event, setter) => {
//     const file = event.target.files[0];
//     setter(prevFile => file); // Use functional update to ensure the latest state value is used
//   };
  

//   const handleUpload = async () => {
//     if (bookName === '') {
//       toast.error('Please enter book title.');
//       return;
//     }
//     if (genre === '') {
//       toast.error('Please enter genre.');
//       return;
//     }
//     if (description === '') {
//       toast.error('Please enter description.');
//       return;
//     }
//     if (price === '') {
//       toast.error('Please enter price.');
//       return;
//     }
//     if (epubFile === null) {
//       toast.error('Please select epub file of your eBook.');
//       return;
//     }
//     if (coverImage === null) {
//       toast.error('Please select cover imager of your eBook.');
//       return;
//     }
//     const formData = new FormData();
//     formData.append('title', bookName);
//     formData.append('genre', genre);
//     formData.append('description', description);
//     formData.append('price', price);
//     //for now userId is 1
//     formData.append('userId', 1);
//     formData.append('epubFile', epubFile);
//     formData.append('coverImage', coverImage);

//     // Call the onUpload function passed from the parent component
//     await onUpload(formData);

//     // Clear form fields after upload
//     resetForm();
//   };

//   const resetForm = () => {
//     setBookName('');
//     setGenre('');
//     setDescription('');
//     setPrice('');
//     setEpubFile(null);
//     setCoverImage(null);
//   };

//   return (
//     <div className="upload-form-container">
//       <h2 className="form-heading">Upload Ebook</h2>
//       <Form className="upload-form">
//         <Form.Group controlId="bookName">
//           <Form.Label>Book Name</Form.Label>
//           <Form.Control type="text" value={bookName} onChange={(e) => setBookName(e.target.value)} />
//         </Form.Group>

//         <Form.Group controlId="genre">
//           <Form.Label>Genre</Form.Label>
//           <Form.Control type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />
//         </Form.Group>

//         <Form.Group controlId="description">
//           <Form.Label>Description</Form.Label>
//           <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
//         </Form.Group>

//         <Form.Group controlId="price">
//           <Form.Label>Price</Form.Label>
//           <Form.Control type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
//         </Form.Group>

//         <Form.Group controlId="epubFile">
//           <Form.Label>Ebook File</Form.Label>
//           <Form.Control type="file" accept=".epub" onChange={(e) => handleFileChange(e, setEpubFile)} />
//         </Form.Group>

//         <Form.Group controlId="coverImage">
//           <Form.Label>Cover Image</Form.Label>
//           <Form.Control type="file" accept="image/*" onChange={(e) => handleFileChange(e, setCoverImage)} />
//         </Form.Group>
//         <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
//         <Button variant="primary" onClick={handleUpload}>
//           Upload
//         </Button>
//         <Button variant="secondary" onClick={resetForm}>
//           Reset
//         </Button>
//         </div>
//       </Form>
//     </div>
//   );
// };
// export default PublishBook;

import React, { useState, useRef, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { createUrl, log } from '../../utils/utils';
import { toast } from 'react-toastify';

const PublishBook = () => {
  const epubFileInputRef = useRef(null);
  const coverImageInputRef = useRef(null);

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
        
        <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
          <Button variant="primary" onClick={handleUpload}>
            Upload
          </Button>
          <Button variant="secondary" onClick={resetForm}>
            Reset
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default PublishBook;
