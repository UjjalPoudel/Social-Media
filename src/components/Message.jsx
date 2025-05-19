// components/Message.js
import React, { useContext } from "react";
import { MessageContext } from "../store/MessageContext";

const Message = () => {
  const { state, sendMessage, setActiveConversation } = useContext(MessageContext);

  return (
    <div>
      <h2>Messages</h2>
      <p>Active Conversation: {state.activeConversation}</p>
      {/* Display a basic UI for now */}
    </div>
  );
};

export default Message;
