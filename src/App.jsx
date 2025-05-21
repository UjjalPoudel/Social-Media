import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import CreatePost from './components/CreatePost';
import Footer from './components/Footer';
import PostList from './components/PostList';
import ProfilePage from './components/ProfilePage';
import Message from './components/Message';
import MessageProvider from './store/MessageContext';
import PostListProvider from './store/Post-List-Store';
import Setting from './Auth/Setting';
import Register from './Auth/Register';

function App() {
  const [selectedTab, setSelectedTab] = useState('Home');
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('token')
  );

  const handleAuthSuccess = () => setIsAuthenticated(true);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setSelectedTab('Home');
  };

  if (!isAuthenticated) {
    return (
      <Register setSelectedTab={setSelectedTab} onAuthSuccess={handleAuthSuccess} />
    );
  }

  const renderContent = () => {
    switch (selectedTab) {
      case 'Home':
        return <PostList />;
      case 'Profile':
        return (
          <Container className="py-4">
            <ProfilePage
              userId="current-user-id"
              isCurrentUser={true}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
          </Container>
        );
      case 'Messages':
        return (
          <Container className="py-4">
            <Message />
          </Container>
        );
      case 'Settings':
        return (
          <Container className="py-4">
            <Setting />
          </Container>
        );
      case 'Register':
        return (
          <Container className="py-4">
            <Register setSelectedTab={setSelectedTab} />
          </Container>
        );
      case 'Trending':
        return (
          <Container className="py-4">
            <h2>Trending Page</h2>
          </Container>
        );
      case 'Discover':
        return (
          <Container className="py-4">
            <h2>Discover Page</h2>
          </Container>
        );
      case 'Communities':
        return (
          <Container className="py-4">
            <h2>Communities Page</h2>
          </Container>
        );
      case 'Create Post':
        return <CreatePost />;
      default:
        return <PostList />;
    }
  };

  return (
    <PostListProvider>
      <MessageProvider>
        <div className="d-flex min-vh-100">
          <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
          <div className="d-flex flex-column flex-grow-1">
            <Header
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
              onLogout={handleLogout}
            />
            <div className="flex-grow-1">{renderContent()}</div>
            <Footer />
          </div>
        </div>
      </MessageProvider>
    </PostListProvider>
  );
}

export default App;