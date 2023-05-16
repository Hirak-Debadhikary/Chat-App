import React, { useEffect, useState } from "react";
import axios from "axios";

function ChatComponent() {
  // Define state variable for storing chats
  const [chats, setChats] = useState([]);

  // Fetches chats from API
  const fetchChats = async () => {
    try {
      const { data } = await axios.get("/api/chat");
      // Set state variable with fetched chats
    //   console.log(data)
      setChats(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Runs once when component mounts to fetch chats
  useEffect(() => {
    fetchChats();
  }, []);

  return (
    // JSX code for rendering the chat component
    <div>
      {chats.map((Chat) => (
        <div key={Chat._id}> {Chat.chatName}</div>
      ))}
      <h1>This is chat page</h1>
    </div>
  );
}

export default ChatComponent;
