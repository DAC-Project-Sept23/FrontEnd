//EbookList
import React, { useState, useEffect } from 'react';
import EbookCard from './EbookCard';
import { useParams } from 'react-router-dom';
import '../../styles/EbookList.css';
import '../../styles/bootstrap.min.css';
import { createUrl, log } from '../../utils/utils';
import { toast } from 'react-toastify';

const EbookList = () => {
  const [ebooks, setEbooks] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [boughtBooks, setBoughtBooks] = useState([]);
  const userId = sessionStorage.getItem('userId');
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');
  useEffect(() => {
    const fetchEbooks = async () => {
      try {
        const url = createUrl('/books/approved');
        const response = await fetch(url);
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
        const response = await fetch(url);
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
        const response = await fetch(url);
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

  return (
    <div className="container-fluid fruite py-3 mt-3">
      <div className="tab-class text-center">
        <div className="tab-content">
          <div id="tab-1" className="tab-pane fade show p-0 active">
            <div className="row row-cols-1 g-4">
            {ebooks.map((ebook) => (
            <EbookCard key={ebook.id} {...ebook} wish={wishlist.includes(ebook.id)} bought={boughtBooks.includes(ebook.id)} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EbookList;
