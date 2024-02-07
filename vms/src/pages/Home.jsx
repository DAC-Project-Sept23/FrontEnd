import React, { useEffect, useState } from "react";

import HeroSlider from "../components/UI/HeroSlider";
import Helmet from "../components/Helmet/Helmet";

import { Container, Row, Col } from "reactstrap";
import AboutSection from "../components/UI/AboutSection";
import CarItem from "../components/UI/CarItem";
import axios from "axios";
import { createUrl, log } from '../utils/utils';

import EbookList from '../components/UI/EbookList';

const Home = () => {

  //delete this later
  sessionStorage.setItem("isLoggedIn", true);
  return (
    <>
    <Helmet title="Home"/>
    <EbookList/>
    </>
  )
};

export default Home;
