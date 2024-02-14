import React, { useState, useEffect } from "react";
import { createUrl } from "../../utils/utils";
import { toast } from "react-toastify";
import { Modal, Button } from 'react-bootstrap'; // Import Modal and Button from react-bootstrap

const MyEarnings = () => {
  const [earnings, setEarnings] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(true); // State to manage modal open/close

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        // Make a fetch request to get earnings of the current logged-in user
        const userId = sessionStorage.getItem('userId');
        const url = createUrl(`/api/earnings/${userId}`)
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setEarnings(data.earnings);
          // Calculate total earnings
          const total = data.earnings.reduce((acc, curr) => acc + curr.earning, 0);
          setTotalEarnings(total);
        } else {
          throw new Error("Failed to fetch earnings");
        }
      } catch (error) {
        console.error("Error fetching earnings:", error);
        toast.error("Failed to fetch earnings. Please try again later.");
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
            {earnings.map((earning, index) => (
              <tr key={index}>
                <td>{earning.bookId}</td>
                <td>{earning.title}</td>
                <td>{earning.genre}</td>
                <td>${earning.price}</td>
                <td>${earning.earning}</td>
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

