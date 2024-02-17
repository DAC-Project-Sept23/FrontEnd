import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createUrl } from '../../utils/utils';
import { toast } from 'react-toastify';
import { getAuthorizationHeader } from '../../utils/jwtUtil'; 
const PendingForApproval = () => {
  // State to store the array of pending approval books
  const [books, setBooks] = useState([]);

  // Function to fetch pending approval books from the backend
  const fetchPendingBooks = async () => {
    try {
      // Make a GET request to fetch pending books from the backend
      const url = createUrl('/books/pending');
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: getAuthorizationHeader(),
        },
      });
      // Update state with the fetched pending books
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      // console.error('Error fetching pending books:', error);
      // toast.error('Error fetching pending books. Please try again later.');
    }
  };

  // useEffect hook to fetch pending books when the component mounts
  useEffect(() => {
    fetchPendingBooks();
  }, []);

  return (
    <div className="container">
      <h1 className="my-4">Pending Books For Approval</h1>
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
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Check if books is not undefined before mapping over it */}
          {books && books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.genre}</td>
              <td>{book.price}</td>
              <td>{book.addedOn}</td>
              <td>{book.firstName + " " + book.lastName}</td>
              <td>{book.authorId}</td>
              <td>
                {/* Link to navigate to ProcessEbook component with the book ID as a prop */}
                <Link to={`/process/${book.id}`} className="btn btn-primary btn-sm">Process</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div/>
    </div>
  );
};

export default PendingForApproval;

