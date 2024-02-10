import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation
import { createUrl } from '../../utils/utils';
import { toast } from 'react-toastify';

const ProcessedByMe = () => {
  // State to store the array of processed books
  const [books, setBooks] = useState([]);
  // State to store the selected status filter
  const [statusFilter, setStatusFilter] = useState('all');

  // Function to fetch all processed books by admin from the backend
  const fetchProcessedBooks = async () => {
    try {
      // Fetch admin ID from session storage
      const adminId = sessionStorage.getItem('userId');
      // Make a GET request to fetch all processed books from the backend based on admin ID
      const url = createUrl(`/admin/processed/${adminId}`);
      const response = await axios.get(url);
      // Update state with the fetched processed books
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching processed books:', error);
      // Handle error by setting books to an empty array
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

  return (
    <div className="container">
      <h1 className="my-4">Books Processed By Me</h1>
      {/* Dropdown for status filter */}
      <div className="mb-3">
        <label htmlFor="statusFilter" className="form-label">Filter by Status:</label>
        <select id="statusFilter" className="form-select" value={statusFilter} onChange={handleStatusFilterChange}>
          <option value="all">All</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
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
            <th scope="col">Author ID</th>
            <th scope="col">Processed On</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through the array of books and render a row for each book */}
          {books.map((book) => (
            <tr key={book.bookId}>
              <td>{book.bookId}</td>
              <td>{book.title}</td>
              <td>{book.genre}</td>
              <td>{book.price}</td>
              <td>{book.addedOn}</td>
              <td>{book.authorName}</td>
              <td>{book.authorId}</td>
              <td>{book.processedOn}</td>
              <td>{book.status}</td>
              <td>
                {/* Link to navigate to EbookDetail component with the book ID as a prop */}
                <Link to={`/ebook-detail/${book.bookId}`} className="btn btn-primary btn-sm">View Details</Link>
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
