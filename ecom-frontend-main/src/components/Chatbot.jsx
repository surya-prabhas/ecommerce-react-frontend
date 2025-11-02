import React, { useState } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Welcome to Surya Prabhas's Ecommerce! How can I help you today?", sender: "bot" }
  ]);
  const [inputValue, setInputValue] = useState('');

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = () => {
    if (inputValue.trim()) {
      const newMessages = [...messages, { text: inputValue, sender: "user" }];
      setMessages(newMessages);
      setInputValue('');
      
      // Simple bot response
      setTimeout(() => {
        const botResponse = getBotResponse(inputValue);
        setMessages(prev => [...prev, { text: botResponse, sender: "bot" }]);
      }, 1000);
    }
  };

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    if (message.includes('product') || message.includes('item')) {
      return "You can browse our products on the home page. Use the category filter to find specific items!";
    } else if (message.includes('cart')) {
      return "You can view your cart by clicking the cart icon in the navigation bar.";
    } else if (message.includes('order') || message.includes('buy')) {
      return "To place an order, add items to your cart and proceed to checkout.";
    } else if (message.includes('help')) {
      return "I can help you with product information, cart management, and ordering process.";
    } else {
      return "Thanks for your message! For specific assistance, you can ask about products, cart, or orders.";
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <div
        onClick={toggleChat}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          backgroundColor: '#007bff',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          zIndex: 1000,
          color: 'white',
          fontSize: '24px',
          border: '2px solid rgba(255,255,255,0.2)'
        }}
      >
        {isOpen ? '✕' : <i className="bi bi-github" style={{fontSize: '24px'}}></i>}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '90px',
            right: '20px',
            width: '300px',
            height: '400px',
            backgroundColor: 'white',
            borderRadius: '10px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Chat Header */}
          <div
            style={{
              backgroundColor: '#000000',
              color: 'white',
              padding: '15px',
              borderRadius: '10px 10px 0 0',
              fontWeight: 'bold'
            }}
          >
            Customer Support
          </div>

          {/* Messages Area */}
          <div
            style={{
              flex: 1,
              padding: '10px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                style={{
                  alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
                  backgroundColor: message.sender === 'user' ? '#000000' : '#f1f1f1',
                  color: message.sender === 'user' ? 'white' : 'black',
                  padding: '8px 12px',
                  borderRadius: '15px',
                  maxWidth: '80%',
                  fontSize: '14px'
                }}
              >
                {message.text}
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div
            style={{
              padding: '10px',
              borderTop: '1px solid #eee',
              display: 'flex',
              gap: '5px'
            }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type a message..."
              style={{
                flex: 1,
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '20px',
                outline: 'none'
              }}
            />
            <button
              onClick={sendMessage}
              style={{
                backgroundColor: '#000000',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '35px',
                height: '35px',
                cursor: 'pointer'
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;