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
import UpdateEbook from "../components/Profile/UpdateEbook";
import CheckoutForm from "../components/Payment/CheckoutForm";
import Success from "../components/Payment/Success";
import Cancel from "../components/Payment/Cancel";
import ProtectedRoute from "./ProtectedRoute";

const Routers = () => {

  return (
    <div>
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterUser />} />
      <Route path="/read/:id" element={<EbookDetail />} />
      <Route path="/categories" element={<Categories />} />
      <Route
        path="/process/:id"
        element={
        <ProtectedRoute role={'ROLE_ADMIN'}>
          <ProcessEbook />
        </ProtectedRoute>}
        />
      <Route
        path="/edit-book/:id"
        element={
        <ProtectedRoute role={'ROLE_USER'}>
          <UpdateEbook />
        </ProtectedRoute>}
        />
      <Route
        path="/buy/:id"
        element={
        <ProtectedRoute role={'ROLE_USER'}>
          <CheckoutForm />
        </ProtectedRoute>}
        />
      <Route
        path="/success"
        element={
        <ProtectedRoute role={'ROLE_USER'}>
          <Success />
        </ProtectedRoute>}
        />
      <Route
        path="/cancel"
        element={
        <ProtectedRoute role={'ROLE_USER'}>
          <Cancel />
        </ProtectedRoute>}
        />
      <Route
        path="/profile"
        element={
        <ProtectedRoute role={'ROLE_USER'}>
          <Profile />
        </ProtectedRoute>}
        />
        <Route
        path="/admin"
        element={
        <ProtectedRoute role={'ROLE_ADMIN'}>
          <Admin />
        </ProtectedRoute>}
        />
        </Routes>
    <ToastContainer/>
    </div>
  );
};

export default Routers;
