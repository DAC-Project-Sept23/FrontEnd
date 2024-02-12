import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createUrl } from '../../utils/utils';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
const Wishlist = () => {
  const [books, setBooks] = useState([]);
//   const userId = sessionStorage.getItem('userId');
  const userId = 2;
  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const url = createUrl(`/wishlist/${userId}`);
      const response = await axios.get(url);
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  const removeBookFromWishlist = async (bookId) => {
    try {
      const url = createUrl('/wishlist');
      await axios.delete(url, { data: { bookId : bookId, userId : userId } });
      // After removing the book from wishlist, refetch the wishlist
      fetchWishlist();
      toast.success("Removed from wishlist.")
    } catch (error) {
      toast.error('Error removing book from wishlist:', error);
    }
  };

  return (
    <div className="container">
      <h1>This is your Wishlist</h1>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col">Book ID</th>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Author</th>
              <th scope="col">Price</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.genre}</td>
                <td>{book.firstName + " " + book.lastName}</td>
                <td>{book.price}</td>
                <td>
                  <Link to={`/buy-book/${book.id}`} className="btn btn-secondary btn-sm">Buy</Link>
                  {" "}
                  <button className="btn btn-danger btn-sm" onClick={() => removeBookFromWishlist(book.id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Wishlist;
