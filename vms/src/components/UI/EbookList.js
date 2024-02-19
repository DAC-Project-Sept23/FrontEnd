import React, { useState, useEffect } from 'react';
import EbookCard from './EbookCard';
import { useParams } from 'react-router-dom';
import '../../styles/EbookList.css';
import '../../styles/bootstrap.min.css';
import { createUrl, log } from '../../utils/utils';
import { toast } from 'react-toastify';
import { getAuthorizationHeader } from '../../utils/jwtUtil';
const EbookList = () => {
  const [ebooks, setEbooks] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [boughtBooks, setBoughtBooks] = useState([]);
  const [ownBooks, setOwnBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4); // Display 4 items per page
  const [numBooksPerPageInput, setNumBooksPerPageInput] = useState(''); // State for input value
  const userId = sessionStorage.getItem('userId');
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');

  useEffect(() => {
    const fetchEbooks = async () => {
      try {
        const url = createUrl('/books/approved');
        const response = await fetch(url, {
          headers: {
            Authorization: getAuthorizationHeader(),
          },
        });
        if (response.ok) {
          const data = await response.json();
          setEbooks(data);
          console.log(data);
        } else {
          console.error('Error fetching ebooks:', response.statusText);
          toast.error('Error fetching ebooks:');
        }
      } catch (error) {
        console.error('Error during fetchEbooks:', error);
        toast.error('Error fetching ebooks:');
      }
    };

    fetchEbooks();
  }, []);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const url = createUrl(`/wishlist/books/${userId}`);
        const response = await fetch(url, {
          headers: {
            Authorization: getAuthorizationHeader(),
          },
        });
        if (response.ok) {
          const data = await response.json();
          setWishlist(data)
        } else {
          console.error('Error fetching wishlist:', response.statusText);
          toast.error('Error fetching wishlist:');
        }
      } catch (error) {
        console.error('Error during fetch wishlist:', error);
        toast.error('Error fetching wishlist:');
      }
    };
    if(isLoggedIn && !(sessionStorage.getItem('userRole') === 'ROLE_ADMIN'))
    fetchWishlist();
  }, []);

  useEffect(() => {
    const fetchBoughtBooks = async () => {
      try {
        const url = createUrl(`/transaction/${userId}`);
        const response = await fetch(url, {
          headers: {
            Authorization: getAuthorizationHeader(),
          },
        });
        if (response.ok) {
          const data = await response.json();
          setBoughtBooks(data);
        } else {
          console.error('Error fetching bought list:', response.statusText);
          toast.error('Error fetching bought list');
        }
      } catch (error) {
        console.error('Error during fetch bought list:', error);
        toast.error('Error fetching bought list');
      }
    };
    if(isLoggedIn && !(sessionStorage.getItem('userRole') === 'ROLE_ADMIN'))
    fetchBoughtBooks();
  }, []);

  useEffect(() => {
    const fetchOwnBooks = async () => {
      try {
        const url = createUrl(`/books/own/${userId}`);
        const response = await fetch(url, {
          headers: {
            Authorization: getAuthorizationHeader(),
          },
        });
        if (response.ok) {
          const data = await response.json();
          setOwnBooks(data);
        } else {
          console.error('Error fetching own list:', response.statusText);
          toast.error('Error fetching own list');
        }
      } catch (error) {
        console.error('Error during fetch own list:', error);
        toast.error('Error fetching own list');
      }
    };
    if(isLoggedIn && !(sessionStorage.getItem('userRole') === 'ROLE_ADMIN'))
    fetchOwnBooks();
  }, []);

  // Calculate index of the first and last item of the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Get current items for the current page
  const currentEbooks = ebooks.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle input change
  const handleInputChange = (event) => {
    setNumBooksPerPageInput(event.target.value);
  };

  // Handle form submit
  const handleFormSubmit = (event) => {
    event.preventDefault();
    setItemsPerPage(parseInt(numBooksPerPageInput));
    setCurrentPage(1); // Reset current page to 1 when changing items per page
  };

  return (
    <div className="container-fluid fruite py-3 mt-3">
      <div className="tab-class text-center">
        <div className="tab-content">
          <div id="tab-1" className="tab-pane fade show p-0 active">
            <div className="row row-cols-2 g-4">
            {currentEbooks.map((ebook) => (
            <EbookCard key={ebook.id} {...ebook} wish={wishlist.includes(ebook.id)} bought={boughtBooks.includes(ebook.id)} own={ownBooks.includes(ebook.id)} free={ebook.price==0}/>
              ))}
            </div>
            {/* Pagination */}
            <nav>
              <ul className='pagination'>
                {ebooks.map((ebook, index) => (
                  <li key={index} className='page-item'>
                    <a onClick={() => paginate(index + 1)} href='#' className='page-link'>
                      {index + 1}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            {/* Items per page form */}
            <form onSubmit={handleFormSubmit} className="mt-3">
              <div className="input-group">
                <label htmlFor="itemsPerPageInput" className="input-group-text">Number of books per page:</label>
                &nbsp;&nbsp;
                <input
                  id="itemsPerPageInput"
                  type="number"
                  min="1"
                  value={numBooksPerPageInput}
                  onChange={handleInputChange}
                />
                &nbsp;&nbsp;
                <button type="submit" className="btn btn-primary">Apply</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EbookList;
