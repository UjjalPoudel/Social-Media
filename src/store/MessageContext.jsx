import React, { createContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  conversations: {},
  activeConversation: null,
};

// Create context
export const MessageContext = createContext(initialState);

// Reducer function
const messageReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_CONVERSATIONS':
      return { ...state, conversations: action.payload };
    case 'SET_ACTIVE_CONVERSATION':
      return { ...state, activeConversation: action.payload };
    case 'SEND_MESSAGE':
      return {
        ...state,
        conversations: {
          ...state.conversations,
          [action.payload.recipientId]: [
            ...(state.conversations[action.payload.recipientId] || []),
            action.payload.message,
          ],
        },
      };
    case 'RECEIVE_MESSAGE':
      return {
        ...state,
        conversations: {
          ...state.conversations,
          [action.payload.senderId]: [
            ...(state.conversations[action.payload.senderId] || []),
            action.payload.message,
          ],
        },
      };
    default:
      return state;
  }
};

// Provider component
export const MessageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(messageReducer, initialState);

  // Load from localStorage
  useEffect(() => {
    const savedConversations = localStorage.getItem('conversations');
    if (savedConversations) {
      dispatch({
        type: 'LOAD_CONVERSATIONS',
        payload: JSON.parse(savedConversations),
      });
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(
      'conversations',
      JSON.stringify(state.conversations)
    );
  }, [state.conversations]);

  // Send message function
  const sendMessage = (recipientId, message) => {
    const newMessage = {
      id: Date.now(),
      text: message,
      timestamp: new Date().toISOString(),
      sender: 'currentUser', // Replace with actual user ID
      status: 'sent',
    };

    dispatch({
      type: 'SEND_MESSAGE',
      payload: { recipientId, message: newMessage },
    });
  };

  // Receive message function
  const receiveMessage = (senderId, message) => {
    const newMessage = {
      id: Date.now(),
      text: message,
      timestamp: new Date().toISOString(),
      sender: senderId,
      status: 'received',
    };

    dispatch({
      type: 'RECEIVE_MESSAGE',
      payload: { senderId, message: newMessage },
    });
  };

  // Set active conversation
  const setActiveConversation = (userId) => {
    dispatch({ type: 'SET_ACTIVE_CONVERSATION', payload: userId });
  };

  return (
    <MessageContext.Provider
      value={{
        state,
        sendMessage,
        receiveMessage,
        setActiveConversation,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export default MessageProvider;
