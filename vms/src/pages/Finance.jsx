import React, { useState } from 'react';
import '../styles/finance.css';

const FinancePage = () => {
  const [loanAmount, setLoanAmount] = useState(10000);
  const [interestRate, setInterestRate] = useState(5);
  const [loanTenure, setLoanTenure] = useState(12);
  const [emi, setEmi] = useState(0);

  const calculateEmi = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12;
    const tenure = parseFloat(loanTenure);

    const emiValue = (principal * rate * Math.pow(1 + rate, tenure)) / (Math.pow(1 + rate, tenure) - 1);
    setEmi(emiValue.toFixed(2));
  };

  return (
    <div className="finance-container">
    </div>
  );
};

export default FinancePage;