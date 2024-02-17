import React, { useState, useEffect } from "react";
import { createUrl } from "../../utils/utils";
import { toast } from "react-toastify";
import { Modal, Button } from 'react-bootstrap'; // Import Modal and Button from react-bootstrap
import axios from 'axios';
import { getAuthorizationHeader } from '../../utils/jwtUtil';
const MyEarnings = () => {
  const [books, setBooks] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(true); // State to manage modal open/close

  useEffect(() => {
    const fetchEarnings = async () => {
        const userId = sessionStorage.getItem('userId');
        try {
          const url = createUrl(`/books/user/approved/${userId}`);
          const response = await axios.get(url, {
            headers: {
              Authorization: getAuthorizationHeader(),
            },
          });
          setBooks(response.data);
          const total = response.data.reduce((acc, curr) => acc + curr.revenue, 0);
          setTotalEarnings(total);
        } catch (error) {
          console.error('Error fetching books:', error);
        }
    };
    fetchEarnings();
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container">
      <h1>Your Earnings</h1>
      <h2>Total Earnings: ${totalEarnings}</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col">Book ID</th>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Price</th>
              <th scope="col">Earning</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={index}>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.genre}</td>
                <td>${book.price}</td>
                <td>${book.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Modal for additional message */}
      <Modal show={isModalOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Please note this!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p>Your earnings can vary due to various factors:</p>
          <ol>
            <li>We offer discounts on books to increase sales, which can affect your earnings.</li>
            <li>We take a 20% cut from each sale as our service fee.</li>
            <li>We also deduct taxes from your book sales earnings.</li>
          </ol>
          <p>If you have any questions or concerns about your earnings, please feel free to contact us.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MyEarnings;

