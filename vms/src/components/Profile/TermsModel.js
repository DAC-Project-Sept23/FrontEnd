import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../../styles/TermsModel.css'
const TermsModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Terms and Conditions</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ol>
          <li>We reserve the right to determine which books are approved for publication on our platform. This includes the discretion to reject any submissions that do not meet our guidelines or standards.</li>
          <li>As part of our service, we retain 20% of the revenue generated from sales of your book on our platform. This percentage is subject to change and will be outlined in the agreement between you and us.</li>
          <li>Your book must adhere to our content guidelines, ensuring it does not contain any objectionable content or images. This includes but is not limited to explicit language, graphic violence, hate speech, or illegal material.</li>
          <li>By submitting your book for publication, you certify that it is your original work and does not infringe upon the intellectual property rights of others. Plagiarism or unauthorized use of copyrighted material is strictly prohibited.</li>
          <li>We maintain high standards for the quality of content published on our platform. Your book must meet these standards to be considered for publication.</li>
          <li>You retain the copyright to your work. However, by publishing on our platform, you grant us a non-exclusive license to distribute and sell your book.</li>
          <li>You agree to indemnify and hold us harmless from any claims, damages, or liabilities arising from your breach of these terms and conditions or any violation of third-party rights.</li>
          <li>We reserve the right to modify these terms and conditions at any time. Any changes will be communicated to you and will become effective immediately upon posting.</li>
        </ol>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TermsModal;
