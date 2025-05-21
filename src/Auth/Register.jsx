import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';

const Register = ({ setSelectedTab, onAuthSuccess }) => {
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Helper to generate a unique user ID
  const generateUserId = () => 'user_' + Date.now() + Math.floor(Math.random() * 1000);

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
      if (mode === 'register') {
        // Simple validation
        if (!formData.username || !formData.email || !formData.password) {
          setError('All fields are required.');
          setLoading(false);
          return;
        }

        // Simulate API call or save to localStorage
        const userId = generateUserId();
        const user = {
          id: userId,
          username: formData.username,
          email: formData.email,
          password: formData.password, // In real apps, never store plain passwords!
        };

        // Save user to localStorage (for demo)
        let users = JSON.parse(localStorage.getItem('users') || '[]');
        // Check if email already exists
        if (users.some(u => u.email === user.email)) {
          setError('Email already registered.');
          setLoading(false);
          return;
        }
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));

        setSuccess('Registration successful! You can now log in.');
        setMode('login');
        setFormData({ email: '', password: '', username: '' }); // Clear form
      } else {
        // LOGIN
        let users = JSON.parse(localStorage.getItem('users') || '[]');
        const found = users.find(
          u => u.email === formData.email && u.password === formData.password
        );
        if (!found) {
          setError('Invalid email or password.');
          setLoading(false);
          return;
        }
        // Save token (simulate login)
        localStorage.setItem('token', found.id);
        setSuccess('Login successful! Redirecting...');
        setTimeout(() => {
          if (onAuthSuccess) onAuthSuccess();
          setSelectedTab('Home');
        }, 1000);
      }
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
                  onClick={() => { setMode('register'); setError(''); setSuccess(''); setFormData({ email: '', password: '', username: '' }); }}
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
                  onClick={() => { setMode('login'); setError(''); setSuccess(''); setFormData({ email: '', password: '', username: '' }); }}
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