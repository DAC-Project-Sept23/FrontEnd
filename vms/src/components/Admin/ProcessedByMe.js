import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation
import { createUrl } from '../../utils/utils';
import { toast } from 'react-toastify';
import { getAuthorizationHeader } from '../../utils/jwtUtil'; 

const ProcessedByMe = () => {
  // State to store the array of processed books
  const [books, setBooks] = useState([]);
  // State to store the selected status filter
  const [statusFilter, setStatusFilter] = useState('approved');

  // Function to fetch all processed books by admin from the backend
  const fetchProcessedBooks = async () => {
    try {
      const adminId = sessionStorage.getItem('userId');
      let url;
      if (statusFilter === 'approved') {
        url = createUrl(`/admin/approved/${adminId}`);
      } else if (statusFilter === 'rejected') {
        url = createUrl(`/admin/rejected/${adminId}`);
      }
      const response = await axios.get(url, {
        headers: {
          Authorization: getAuthorizationHeader(),
        },
      });
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching processed books:', error);
      setBooks([]);
    }
  };

  // useEffect hook to fetch processed books when the component mounts or when status filter changes
  useEffect(() => {
    fetchProcessedBooks();
  }, [statusFilter]);

  // Function to handle status filter change
  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).replace(/,/g, '');
  };

  return (
    <div className="container">
      <h1 className="my-4">Books Processed By Me</h1>
      {/* Dropdown for status filter */}
      <div className="mb-3">
        <label htmlFor="statusFilter" className="form-label">Filter by Status:</label>
        <select id="statusFilter" className="form-select" value={statusFilter} onChange={handleStatusFilterChange}>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected/Removed</option>
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
              <th scope="col">Author Name</th>
              {/* <th scope="col">Author ID</th> */}
              <th scope="col">Processed On</th>
              <th scope="col">Status</th>
              {statusFilter === 'rejected' ? <th scope="col">Comment</th> : null}
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Map through the array of books and render a row for each book */}
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.genre}</td>
                <td>{book.price}</td>
                <td>{formatTimestamp(book.addedOn)}</td>
                <td>{book.firstName + " " + book.lastName}</td>
                {/* <td>{book.authorId}</td> */}
                <td>{formatTimestamp(book.processedOn)}</td>
                <td>{book.status}</td>
                {statusFilter === 'rejected' && <td>{book.comment}</td>}
                <td>
                  {/* Link to navigate to EbookDetail component with the book ID as a prop */}
                  <Link to={`/read/${book.id}`} className="btn btn-primary btn-sm">View Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProcessedByMe;
