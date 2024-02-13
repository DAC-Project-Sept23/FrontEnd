import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createUrl } from '../../utils/utils';
import { toast } from 'react-toastify';

const MyBookCollection = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch user ID from session storage
    const userId = sessionStorage.getItem('userId');
    // Fetch books bought by the user
    const fetchUserBooks = async () => {
      try {
        const url = createUrl(`/user/${userId}/books`);
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setBooks(data.books);
        } else {
          throw new Error('Error fetching user books');
        }
      } catch (error) {
        console.error('Error fetching user books:', error);
        toast.error('Error fetching user books. Please try again later.');
      }
    };

    fetchUserBooks();
  }, []);

  return (
    <div className="container">
      <h1 className="my-4">My Book Collection</h1>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              {/* <th scope="col">Book ID</th> */}
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Price</th>
              <th scope="col">Purchased on</th>
              <th scope="col">Author Name</th>
              {/* <th scope="col">Author ID</th> */}
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                {/* <td>{book.id}</td> */}
                <td>{book.title}</td>
                <td>{book.genre}</td>
                <td>{book.price}</td>
                <td>{book.purchasedOn}</td>
                <td>{book.author.firstName} {book.author.lastName}</td>
                {/* <td>{book.authorId}</td> */}
                <td>
                  {/* Link to navigate to ReadBook component with the book ID as a prop */}
                  <Link to={`/read/${book.id}`} className="btn btn-primary btn-sm">Read</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookCollection;

