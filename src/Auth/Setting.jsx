import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

const Settings = () => {
  const [settings, setSettings] = useState({
    username: '',
    email: '',
    password: '',
    notifications: true,
    privacy: 'public',
    theme: 'light',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Settings submitted:', settings);
    // Typically, you'd send these settings to your backend here
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <h2 className="text-center mb-4">Account Settings</h2>
              <Form onSubmit={handleSubmit}>
                {/* Username */}
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={settings.username}
                    onChange={handleChange}
                    placeholder="Enter new username"
                  />
                </Form.Group>

                {/* Email */}
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={settings.email}
                    onChange={handleChange}
                    placeholder="Enter new email"
                  />
                </Form.Group>

                {/* Password */}
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={settings.password}
                    onChange={handleChange}
                    placeholder="Enter new password"
                  />
                </Form.Group>

                {/* Notifications */}
                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    id="notifications"
                    name="notifications"
                    label="Enable notifications"
                    checked={settings.notifications}
                    onChange={handleChange}
                  />
                </Form.Group>

                {/* Privacy */}
                <Form.Group className="mb-3">
                  <Form.Label>Privacy</Form.Label>
                  <Form.Select
                    name="privacy"
                    value={settings.privacy}
                    onChange={handleChange}
                  >
                    <option value="public">Public</option>
                    <option value="friends">Friends Only</option>
                    <option value="private">Private</option>
                  </Form.Select>
                </Form.Group>

                {/* Theme */}
                <Form.Group className="mb-3">
                  <Form.Label>Theme</Form.Label>
                  <Form.Select
                    name="theme"
                    value={settings.theme}
                    onChange={handleChange}
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                  </Form.Select>
                </Form.Group>

                {/* Submit Button */}
                <div className="d-grid">
                  <Button variant="primary" type="submit">
                    Save Changes
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Settings;
