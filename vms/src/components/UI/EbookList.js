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

  return (
    <div className="container-fluid fruite py-3 mt-3">
      <div className="tab-class text-center">
        <div className="tab-content">
          <div id="tab-1" className="tab-pane fade show p-0 active">
            <div className="row g-4">
              {ebooks.map((ebook) => (
                <EbookCard key={ebook.id} {...ebook} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EbookList;
