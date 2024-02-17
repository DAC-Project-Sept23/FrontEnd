import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createUrl } from '../../utils/utils';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap'; // Import modal components from React Bootstrap
import { getAuthorizationHeader } from '../../utils/jwtUtil';
const MyWork = () => {
  const [books, setBooks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('approved');
  const [showModal, setShowModal] = useState(false); // State to control the visibility of the modal
  const [bookToDelete, setBookToDelete] = useState(null); // State to store the book to be deleted

  useEffect(() => {
    fetchBooks();
  }, [statusFilter]);

  const fetchBooks = async () => {
    try {
      const userId = sessionStorage.getItem('userId');
      const url = createUrl(`/books/user/${statusFilter}/${userId}`);
      const response = await axios.get(url, {
        headers: {
          Authorization: getAuthorizationHeader(),
        },
      });
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).replace(/,/g, '');
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleDeleteClick = (bookId) => {
    // Set the book to be deleted and show the modal
    setBookToDelete(bookId);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const url = createUrl(`/books/delete/${bookToDelete}`);
      const response = await axios.delete(url, {
        headers: {
          Authorization: getAuthorizationHeader(),
        },
      });
      setShowModal(false);
      fetchBooks();
      toast.success('Book deleted successfully.');
    } catch (error) {
      console.error('Error deleting book:', error);
      toast.error('Error deleting book:', error);
    }
  };

  const handleCloseModal = () => {
    // Close the modal without performing deletion
    setShowModal(false);
  };

  return (
    <div className="container">
      <h1>Your Submitted Books</h1>
      <div className="mb-3">
        <select id="statusFilter" className="form-select" value={statusFilter} onChange={handleStatusFilterChange}>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="pending">Pending</option>
        </select>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col">Book ID</th>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Price</th>
              <th scope="col">Added On</th>
              {statusFilter === 'rejected' && <th scope="col">Comment</th>}
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.genre}</td>
                <td>{book.price}</td>
                <td>{formatTimestamp(book.addedOn)}</td>
                {statusFilter === 'rejected' && <td>{book.comment}</td>}
                <td>
                  <Link to={`/read/${book.id}`} className="btn btn-primary btn-sm">View Details</Link>
                  {"  "}
                  {(book.status === 'REJECTED') && (
                    <Link to={`/edit-book/${book.id}`} className="btn btn-secondary btn-sm">Edit</Link>
                  )}
                  {"  "}
                  {(book.status === 'APPROVED' || book.status === 'REJECTED' || book.status === "PENDING") && (
                    <button onClick={() => handleDeleteClick(book.id)} className="btn btn-danger btn-sm">Delete</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for confirmation */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p>Are you certain you wish to delete this book?</p>
        <p>Upon deletion, the book will be removed from the website for new users, though those who have already purchased it will retain access within their profiles.</p>
        <p>Once deleted, the book cannot be restored. Should you wish to reinstate it, a new request must be submitted.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MyWork;
