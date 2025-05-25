import NavigationBar from "../users/components/navigation";
import SideBar from "../users/components/sidebar";
import React, { useState } from "react";

function Chat() {
  const [messages, setMessages] = useState([
      { sender: "freelancer", text: "Hi! How can I help you today?" },
    ]);
    const [input, setInput] = useState("");
  
    const updateSend = () => {
      if (!input.trim()) return;
      setMessages([...messages, { sender: "client", text: input }]);
      setInput("");
    };
  
    const handleKeyPress = (e) => {
      if (e.key === "Enter") updateSend();
    };


  return (
    <div
      style={{
        fontFamily: "Poppins, sans-serif",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >

    <NavigationBar />
    
    <div style={{ display: "flex", flex: 1 }}>
        <SideBar />

    <main
          style={{
            flex: 1,
            padding: "40px 30px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
    >
    
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          height: "80vh",
          backgroundColor: "white",
          borderRadius: "12px",
          boxShadow: "0 4px 12px #6f6f70",
          display: "flex",
          flexDirection: "column",
        }}>

        {/* Chat Support */}
        <div
          style={{
            padding: "20px",
            borderfreelancertom: "1px solid #ddd",
            fontWeight: "bold",
            fontSize: "18px",
            backgroundColor: "#858b90",
            color: "white",
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
          }}>
            Chat Support
        </div>

        {/* Freelancer */}
        <div
          style={{
            flex: 1,
            padding: "20px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}>

          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                alignSelf: msg.sender === "client" ? "flex-end" : "flex-start",
                backgroundColor: msg.sender === "client" ? "#bababa" : "#eee",
                padding: "10px 15px",
                borderRadius: "20px",
                maxWidth: "70%",
                wordBreak: "break-word",
              }}>
                {msg.text}
            </div>
          ))}
        </div>

        {/* Client */}
        <div
          style={{
            padding: "10px 20px",
            borderTop: "1px solid #ccc",
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}>

          <input
            type="text"
            value={input}
            placeholder="Type your message..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            style={{
              flex: 1,
              padding: "10px 15px",
              borderRadius: "20px",
              border: "1px solid #ccc",
              outline: "none",
            }}/>
            
          <button type="button"
            onClick={updateSend}
            style={{
              backgroundColor: "#858b90",
              color: "white",
              padding: "10px 15px",
              borderRadius: "20px",
              border: "none",
              cursor: "pointer",
            }}>
              Send
          </button>
        </div>
      </div>
      </main>
    </div>
    </div>
    
  );
}

export default Chat;