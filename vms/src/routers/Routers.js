import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import CarListing from "../pages/CarListing";
import CarDetails from "../components/UI/CarDetails";
import NotFound from "../pages/NotFound";
import Contact from "../pages/Contact";
import FinancePage from "../pages/Finance";
import Services from "../pages/Services";
import TestDrivePage from "../pages/TestDrive";
import Login from "../Authentication/Login";
import RegisterUser from "../Authentication/Registration";
import BookService from "../components/UI/BookService";
import ProcessEbook from "../components/Admin/ProcessEbook";
//Import a toastify to use 
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Admin from "../pages/Admin";
import Salesperson from "../pages/Salesperson";
import AddCar from "../pages/AddCar";
import BookingPage from "../components/UI/BookingPage";

import EbookDetail from "../components/UI/EbookDetail";
import Profile from "../pages/Profile";
import Categories from "../pages/Categories";

const Routers = () => {
  return (
    <div>
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/cars" element={<CarListing />} />
      <Route path="/carDetails/:id" element={<CarDetails />} />
      <Route path="/finance" element={<FinancePage />}/>
      <Route path="/services" element={< Services/>}/>   
      <Route path="/test_drive" element={<TestDrivePage/>}/>
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterUser />} />
      <Route path="/booking/:id" element={<BookingPage />} />
      <Route path="/book_service/:id/:name" element={<BookService />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/salesperson" element={<Salesperson />} />
      <Route path="/addcar" element={<AddCar />} />
      <Route path="/read/:id" element={<EbookDetail />} />
      <Route path="/process/:id" element={<ProcessEbook />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/categories" element={<Categories />} />
    </Routes>

    <ToastContainer/>
    </div>
  );
};

export default Routers;
