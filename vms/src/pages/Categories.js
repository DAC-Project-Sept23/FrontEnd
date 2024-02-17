import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/EbookList.css';
import '../styles/bootstrap.min.css';
import { createUrl, log } from '../utils/utils';
import { toast } from 'react-toastify';
import EbookCard from '../components/UI/EbookCard';
import CommonSection from '../components/UI/CommonSection';
import { getAuthorizationHeader } from '../utils/jwtUtil';
const Categories = () => {
  const [ebooks, setEbooks] = useState([]);
  const [filteredEbooks, setFilteredEbooks] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    category: '',
    author: '',
  });
  const [wishlist, setWishlist] = useState([]);
  const [boughtBooks, setBoughtBooks] = useState([]);
  const userId = sessionStorage.getItem('userId');
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');
  const [sortBy, setSortBy] = useState('price'); // Default sort by price
  const [sortOrder, setSortOrder] = useState('ascending'); // Default sort order
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4); // Default number of items per page
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
          setFilteredEbooks(data); // Initially set filteredEbooks to all ebooks
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
    if(isLoggedIn)
    fetchWishlist();
  }, []);

  useEffect(() => {
    const fetchBoughtBooks = async () => {
      try {
        const url = createUrl(`/transaction/${userId}`);
        // const url = createUrl(`/transaction/${parseInt(userId, 10)}`);
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
    if(isLoggedIn)
    fetchBoughtBooks();
  }, []);

  // Array of categories
  const categories = ['CHILDERNS', 'ROMANCE', 'YOUNG_ADULT', 'NON_FICTION', 'SCIENCE_FICTION', 'HORROR', 'BIOGRAPHIES'];
  // Function to filter ebooks based on category and author
const filterEbooks = () => {
  let filtered = [...ebooks];

  if (filterOptions.category) {
    filtered = filtered.filter(ebook => ebook.genre === filterOptions.category);
  }

  if (filterOptions.author) {
    const normalizedAuthor = filterOptions.author.toLowerCase(); // Normalize author name to lowercase for case-insensitive comparison
    filtered = filtered.filter(ebook => {
      const authorName = `${ebook.firstName} ${ebook.lastName}`.toLowerCase();
      return authorName.includes(normalizedAuthor);
    });
  }

  setFilteredEbooks(filtered);
};


  // Function to sort ebooks based on selected sort criteria
  const sortEbooks = () => {
    const sorted = [...filteredEbooks].sort((a, b) => {
      if (sortOrder === 'ascending') {
        return a[sortBy] - b[sortBy];
      } else {
        return b[sortBy] - a[sortBy];
      }
    });

    setFilteredEbooks(sorted);
  };

  useEffect(() => {
    filterEbooks();
  }, [filterOptions]);

  useEffect(() => {
    sortEbooks();
  }, [sortBy, sortOrder]);

  const handleCategoryChange = (e) => {
    setFilterOptions({ ...filterOptions, category: e.target.value });
  };

  const handleAuthorChange = (e) => {
    setFilterOptions({ ...filterOptions, author: e.target.value });
  };

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEbooks = filteredEbooks.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <CommonSection title="Search for your favourite books" />
      <div className="container-fluid fruite py-3 mt-3 container">
        <div className="row g-4">
          <div className="col-md-3">
            <select value={filterOptions.category} onChange={handleCategoryChange}>
              <option value="">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <input type="text" placeholder="Search by Author" value={filterOptions.author} onChange={handleAuthorChange} />
          </div>
          <div className="col-md-3">
            <select value={sortBy} onChange={handleSortByChange}>
              <option value="price">Sort by Price</option>
              <option value="rating">Sort by Rating</option>
              {/* Add more sorting options as needed */}
            </select>
          </div>
          <div className="col-md-3">
            <select value={sortOrder} onChange={handleSortOrderChange}>
              <option value="ascending">Ascending</option>
              <option value="descending">Descending</option>
            </select>
          </div>
        </div>
        {currentEbooks.length > 0 ? (
          <div className="tab-class text-center">
            <div className="tab-content">
              <div id="tab-1" className="tab-pane fade show p-0 active">
                <div className="row g-4">
                  {currentEbooks.map((ebook) => (
                    <EbookCard key={ebook.id} {...ebook} wish={wishlist.includes(ebook.id)} bought={boughtBooks.includes(ebook.id)} />
                  ))}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
                  <option value="4">4 per page</option>
                  <option value="8">8 per page</option>
                  <option value="12">12 per page</option>
                </select>
              </div>
              <div className="col">
                <nav>
                  <ul className="pagination">
                    {Array.from({ length: Math.ceil(filteredEbooks.length / itemsPerPage) }, (_, index) => (
                      <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                          {index + 1}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        ) : (
          <div className='container' style={{ minHeight: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <h4>No books found.</h4>
          </div>
        )}
      </div>
    </>
  );
  
}
export default Categories;