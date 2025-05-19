import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';

const Register = ({ setSelectedTab }) => {
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
      const body = mode === 'register'
        ? { email: formData.email, password: formData.password, username: formData.username }
        : { email: formData.email, password: formData.password };

      // Mock API call; replace with your endpoint
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Authentication failed');
      }

      const savedConversations = localStorage.getItem('conversations');
if (savedConversations) {
  try {
    dispatch({
      type: 'LOAD_CONVERSATIONS',
      payload: JSON.parse(savedConversations),
    });
  } catch (err) {
    console.error("Failed to parse conversations:", err);
    localStorage.removeItem('conversations'); // optional: clean corrupted data
  }
}
      const data = await response.json();
      setSuccess(mode === 'login' ? 'Logged in successfully!' : 'Registered successfully!');
      setTimeout(() => setSelectedTab('Home'), 1000);
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <Card style={{ minWidth: 350, background: '#18191a', color: '#fff', border: '1px solid #333' }}>
        <Card.Body>
          <h3 className="mb-4 text-center">{mode === 'login' ? 'Login to SocialApp' : 'Create your account'}</h3>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form onSubmit={handleSubmit} autoComplete="off">
            {mode === 'register' && (
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Choose a username"
                  className="bg-dark text-white"
                  required
                  autoFocus
                />
              </Form.Group>
            )}
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="bg-dark text-white"
                required
                autoFocus={mode === 'login'}
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="bg-dark text-white"
                required
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="w-100"
              disabled={loading}
              aria-label={mode === 'login' ? 'Log in' : 'Register'}
            >
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" /> {mode === 'login' ? 'Logging in...' : 'Registering...'}
                </>
              ) : (
                mode === 'login' ? 'Log In' : 'Register'
              )}
            </Button>
          </Form>
          <div className="text-center mt-3">
            {mode === 'login' ? (
              <>
                <span>Don't have an account? </span>
                <Button
                  variant="link"
                  className="text-primary p-0"
                  onClick={() => { setMode('register'); setError(''); setSuccess(''); }}
                  aria-label="Go to register"
                >
                  Register
                </Button>
              </>
            ) : (
              <>
                <span>Already have an account? </span>
                <Button
                  variant="link"
                  className="text-primary p-0"
                  onClick={() => { setMode('login'); setError(''); setSuccess(''); }}
                  aria-label="Go to login"
                >
                  Log In
                </Button>
              </>
            )}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;