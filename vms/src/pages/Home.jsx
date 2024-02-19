import React, { useEffect, useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import EbookList from '../components/UI/EbookList';
import HeroSlider from "../components/UI/HeroSlider";
const Home = () => {
  return (
    <>
    <HeroSlider/>
    <div className="container">
    <Helmet title="Home"/>
    <EbookList/>
    </div>
    </>
  )
};

export default Home;
