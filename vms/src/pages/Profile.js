import React, { useState } from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import Dashboard from '../components/Profile/Dashboard';
import AccountDetails from '../components/Profile/AccountDetails';
import ChangePassword from '../components/Profile/ChangePassword';
import PublishBook from '../components/Profile/PublishBook';
import Settings from '../components/Profile/Settings';
import MyBookCollection from '../components/Profile/MyBookCollection';
import ProfileContent from '../components/Profile/ProfileContent';
import '../styles/Profile.css';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import MyWork from '../components/Profile/MyWork';
import Wishlist from '../components/Profile/Wishlist';
import MyEarnings from '../components/Profile/MyEarnings';
const Profile = () => {
  const [selectedComponent, setSelectedComponent] = useState('Dashboard');

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'Dashboard':
        return <Dashboard />;
      case 'AccountDetails':
        return <AccountDetails />;
      case 'ChangePassword':
        return <ChangePassword />;
      case 'PublishBook':
        return <PublishBook />;
      case 'Settings':
        return <Settings />;
      case 'MyBookCollection':
        return <MyBookCollection />;
      case 'MyWork':
        return <MyWork />;
      case 'Wishlist':
        return <Wishlist />;
      case 'MyEarnings':
        return <MyEarnings/>;
      default:
        return null;
    }
  };

  return (
    <>
    <Helmet title="Profile"/>
    <CommonSection title="My Profile" />
    <Container fluid>
      <Row>
        <Col sm={3} className="bg-light sidebar">
          <Nav className="flex-column">
            <Nav.Link
              className={selectedComponent === 'Dashboard' ? 'active' : ''}
              onClick={() => setSelectedComponent('Dashboard')}
            >
              Dashboard
            </Nav.Link>
            <Nav.Link
              className={selectedComponent === 'AccountDetails' ? 'active' : ''}
              onClick={() => setSelectedComponent('AccountDetails')}
            >
              Account Details
            </Nav.Link>
            <Nav.Link
              className={selectedComponent === 'ChangePassword' ? 'active' : ''}
              onClick={() => setSelectedComponent('ChangePassword')}
            >
              Change Password
            </Nav.Link>
            <Nav.Link
              className={selectedComponent === 'MyBookCollection' ? 'active' : ''}
              onClick={() => setSelectedComponent('MyBookCollection')}
            >
              My Book Collection
            </Nav.Link>
            <Nav.Link
              className={selectedComponent === 'PublishBook' ? 'active' : ''}
              onClick={() => setSelectedComponent('PublishBook')}
            >
              Publish Book
            </Nav.Link>
            <Nav.Link
              className={selectedComponent === 'MyWork' ? 'active' : ''}
              onClick={() => setSelectedComponent('MyWork')}
            >
              My Work
            </Nav.Link>
            <Nav.Link
              className={selectedComponent === 'MyEarnings' ? 'active' : ''}
              onClick={() => setSelectedComponent('MyEarnings')}
            >
              My Earnings
            </Nav.Link>
            {/* <Nav.Link
              className={selectedComponent === 'Settings' ? 'active' : ''}
              onClick={() => setSelectedComponent('Settings')}
            >
              Settings
            </Nav.Link> */}
            <Nav.Link
              className={selectedComponent === 'Wishlist' ? 'active' : ''}
              onClick={() => setSelectedComponent('Wishlist')}
            >
              Wishlist
            </Nav.Link>
          </Nav>
        </Col>
        <Col sm={9}>
          <div className="p-3">{renderComponent()}</div>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default Profile;
