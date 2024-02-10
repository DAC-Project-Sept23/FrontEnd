import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import DisplayBook from '../UI/DisplayBook';
const ProcessEbook = () => {
  const { id } = useParams();
  // const navigate = useNavigate();
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState('approved');

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = () => {
    // Perform submission logic here
    console.log('Ebook ID:', id);
    console.log('Admin ID:', sessionStorage.getItem('adminId'));
    console.log('Status:', status);
    console.log('Comment:', comment);
    // Reset form fields
    setStatus('approved');
    setComment('');
    // You can add submission logic here (e.g., sending data to the server)
    // After submission, you can navigate to another page or perform any necessary action
  };

  return (
    <>
      <DisplayBook id={id}/>
      <div>
            <h3>Process Ebook</h3>
            <div className="upload-form-container">
              <Form className="change-password-form" onSubmit={handleSubmit}>
                <Form.Group controlId="ebookId">
                  <Form.Label>Ebook ID:</Form.Label>
                  <Form.Control type="text" value={id} disabled />
                </Form.Group>

                <Form.Group controlId="adminId">
                  <Form.Label>Admin ID:</Form.Label>
                  <Form.Control type="text" value={sessionStorage.getItem('adminId')} disabled />
                </Form.Group>

                <Form.Group controlId="status">
                  <Form.Label>Status:</Form.Label>
                  <Form.Control as="select" value={status} onChange={handleStatusChange}>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </Form.Control>
                </Form.Group>

                {status === 'rejected' && (
                  <Form.Group controlId="comment">
                    <Form.Label>Comment:</Form.Label>
                    <Form.Control as="textarea" value={comment} onChange={(e) => setComment(e.target.value)} />
                  </Form.Group>
                )}

                <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                  <Button variant="secondary" type="reset" onClick={() => { setStatus('approved'); setComment(''); }}>
                    Reset
                  </Button>
                </div>
              </Form>
            </div>
          </div>
    </>
  );
};

export default ProcessEbook;
