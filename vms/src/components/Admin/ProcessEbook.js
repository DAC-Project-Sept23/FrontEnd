import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import DisplayBook from '../UI/DisplayBook';
import { createUrl } from '../../utils/utils';
import { toast } from 'react-toastify';
import { getAuthorizationHeader } from '../../utils/jwtUtil'; 
const ProcessEbook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState('APPROVED');

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const adminId = sessionStorage.getItem('userId');
      const url = createUrl("/admin/process");
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: getAuthorizationHeader(),
        },
        body: JSON.stringify({
          bookId: id,
          adminId: adminId,
          status: status,
          comment: comment,
        }),
      });
  
      if (response.ok) {
        toast.success('Ebook processing successful');
        navigate(-1);

      } else {
        toast.error('Failed to process ebook');
      }
    } catch (error) {
      toast.error('Error processing ebook:', error);
      // Optionally, handle errors here (e.g., display an error message)
    }
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

                <Form.Group controlId="status">
                  <Form.Label>Status:</Form.Label>
                  <Form.Control as="select" value={status} onChange={handleStatusChange}>
                    <option value="APPROVED">Approved</option>
                    <option value="REJECTED">Rejected</option>
                  </Form.Control>
                </Form.Group>

                {status === 'REJECTED' && (
                  <Form.Group controlId="comment">
                    <Form.Label>Comment:</Form.Label>
                    <Form.Control as="textarea" value={comment} onChange={(e) => setComment(e.target.value)} />
                  </Form.Group>
                )}

                <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                  <Button variant="secondary" type="reset" onClick={() => { setStatus('APPROVED'); setComment(''); }}>
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
