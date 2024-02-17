import React, { useState } from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import Dashboard from '../components/Profile/Dashboard';
import AccountDetails from '../components/Profile/AccountDetails';
import ChangePassword from '../components/Profile/ChangePassword';
import PublishBook from '../components/Profile/PublishBook';
import Settings from '../components/Profile/Settings';
import ProfileContent from '../components/Profile/ProfileContent';
import '../styles/Profile.css';
import Helmet from '../components/Helmet/Helmet';
import PendingForApproval from '../components/Admin/PendingForApproval';
import ProcessedByMe from '../components/Admin/ProcessedByMe';

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
      case 'Settings':
        return <Settings />;
      case 'PendingForApproval':
        return <PendingForApproval />;
      case 'ProcessedByMe':
        return <ProcessedByMe />;
      default:
        return null;
    }
  };

  return (
    <Container fluid>
      <Helmet title="Profile"/>
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
            {/* <Nav.Link
              className={selectedComponent === 'Settings' ? 'active' : ''}
              onClick={() => setSelectedComponent('Settings')}
            >
              Settings
            </Nav.Link> */}
            <Nav.Link
              className={selectedComponent === 'PendingForApproval' ? 'active' : ''}
              onClick={() => setSelectedComponent('PendingForApproval')}
            >
              Pending for approval
            </Nav.Link>
            <Nav.Link
              className={selectedComponent === 'ProcessedByMe' ? 'active' : ''}
              onClick={() => setSelectedComponent('ProcessedByMe')}
            >
              Processed by me
            </Nav.Link>
          </Nav>
        </Col>
        <Col sm={9}>
          <div className="p-3">{renderComponent()}</div>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
