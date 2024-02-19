import React, { useEffect, useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import EbookList from '../components/UI/EbookList';
import CommonSection from "../components/UI/CommonSection";
const Home = () => {
  return (
    <>
    <CommonSection title="Home for All Your Reading Adventures!" />
    <div className="container">
    <Helmet title="Home"/>
    <EbookList/>
    </div>
    </>
  )
};

export default Home;
