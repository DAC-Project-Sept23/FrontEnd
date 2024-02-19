import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../../styles/header.css";
import Logo from "../../assets/all-images/Logo.jpg";

const navLinks = [
  {
    path: "/home",
    display: "Home",
  },

  {
    path: "/categories",
    display: "Categories",
  },

  {
    path: "/about",
    display: "About",
  },

  {
    path: "/contact",
    display: "Contact",
  },
];

const Header = () => {
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleMenu = () => menuRef.current.classList.toggle("menu__active");

  const handleLogin = () => {
    window.location.reload();
  };

  const handleLogout = () => {
    // Perform logout actions
    setIsLoggedIn(false);
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("userRole")
    navigate('/')
  };

  setTimeout(()=>{
    if(sessionStorage.getItem('isLoggedIn') === 'true') {
      setIsLoggedIn(true);
    }
  }, 1000);
  

  useEffect(() => {
    const sessionStatus = sessionStorage.getItem("isLoggedIn");
    if (sessionStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);


  return (
    <header className="header">
      {/* ============ header top ============ */}
      <div className="header__top">
        <Container className="pt-1 pb-1">
          <Row>
            <Col lg="6" md="6" sm="6">
              <div className="header__top__left">
                <h4 className="header__location-content"><span>Your virtual bookshelf awaits, fill it with endless possibilities.</span></h4>
                <span className="header__top__help">
                  {/* <i class="ri-phone-fill"></i> +917057816893 */}
                </span>
              </div>
            </Col>

            <Col lg="6" md="6" sm="6">
              <div className="header__top__right d-flex align-items-center justify-content-end gap-3">
                {isLoggedIn ? (
                  <button className="btn btn-outline-primary" onClick={handleLogout}>
                    <i className="ri-login-circle-line"></i> Logout
                  </button>
                ) : (
                  <Link to="/login" className="btn btn-outline-primary">
                    <i className="ri-login-circle-line" onClick={handleLogin}></i> Login
                  </Link>
                )}
                <Link to="/register" className="btn btn-outline-primary" >
                  <i class="ri-user-line"></i> Register
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* =============== header middle =========== */}
      <div className="header__middle">
        <Container>
          <Row>
            <Col lg="4" md="3" sm="4">
              <div className="logo">
                <h1>
                  <Link to="/home" className=" d-flex align-items-center gap-2">
                    <img src={Logo} alt="logo" height="120px" width="120px"/>
                    <span>Page Palette <br/></span>
                  </Link>
                </h1>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i class="ri-earth-line"></i>
                </span>
                <div className="header__location-content">
                  <h4>India</h4>
                  <h6>Pune, Hinjewadi</h6>
                </div>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                <i class="ri-book-line"></i>
                </span>
                <div className="header__location-content">
                  <h4>Read on your terms, anytime, anywhere.</h4>
                </div>
              </div>
            </Col>

            <Col lg="2" md="3" sm="0" className=" d-flex align-items-center justify-content-end ">
              <button className="header__btn btn ">
                <Link to="/contact">
                <i class="ri-mail-line"></i> Get in touch
                </Link>
              </button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* ========== main navigation =========== */}

      <div className="main__navbar">
        <Container className="pt-1 pb-1">
          <div className="navigation__wrapper d-flex align-items-center justify-content-between">
            <span className="mobile__menu">
              <i class="ri-menu-line" onClick={toggleMenu}></i>
            </span>

            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <div className="menu">
                {navLinks.map((item, index) => (
                  <NavLink
                    to={item.path}
                    className={(navClass) =>
                      navClass.isActive ? "nav__active nav__item" : "nav__item"
                    }
                    key={index}
                  >
                    {item.display}
                  </NavLink>
                ))}
                {isLoggedIn && sessionStorage.getItem('userRole') === 'ROLE_USER' && (
                <NavLink to="/profile" className={(navClass) =>
                  navClass.isActive ? "nav__active nav__item" : "nav__item"
                }>
                  Profile
                </NavLink>
                  )}
                  {isLoggedIn && sessionStorage.getItem('userRole') === 'ROLE_ADMIN' && (
                <NavLink to="/admin" className={(navClass) =>
                  navClass.isActive ? "nav__active nav__item" : "nav__item"
                }>
                  Profile
                </NavLink>
                  )}
              </div>
            </div>
            <div className="nav__right">
              <div className="search__box">
                <input type="text" placeholder="Search" />
                <span>
                  <i class="ri-search-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;
