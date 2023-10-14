import React, { useState, useEffect } from 'react';
import './styles/ChatBot.css';

const Chatbot = () => {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    if (window.innerWidth <= 768) {
      const timeoutId = setTimeout(() => {
        setShowPopup(false);
      }, 6000);
      return () => clearTimeout(timeoutId);
    } else {
      setShowPopup(true);
    }
  }, [window.innerWidth]);

  const e_commerceCategories = ['Men\'s Wear', 'Women\'s Wear', 'Kid\'s Wear'];
  const clothingTypes = ['Summer Wear', 'Sweaters', 'Raincoats','Suits',"Frocks","Chudidars"];

  useEffect(() => {
    if (showChat) {
      setMessages([
        { text: 'Hello! How can I assist you today?', sender: 'chatbot' },
      ]);
    }
  }, [showChat]);

  const Reply = (message, sender = 'chatbot') => {
    setMessages([...messages, { text: message, sender }]);
  };

  const handleProductCategories = () => {
    const categoriesList = e_commerceCategories.join(', ');
    Reply(`We offer a wide range of product categories, including: ${categoriesList}`);
  };

  const handleClothingTypes = () => {
    const typesList = clothingTypes.join(', ');
    Reply(`Our clothing section includes: ${typesList}`);
  };

  return (
    <>
      <div className="chatbot-icon" onClick={() => setShowChat(!showChat)}>
        <img src="https://media.istockphoto.com/id/1010001882/vector/%C3%B0%C3%B0%C2%B5%C3%B1%C3%B0%C3%B1%C3%B1.jpg?s=612x612&w=0&k=20&c=1jeAr9KSx3sG7SKxUPR_j8WPSZq_NIKL0P-MA4F1xRw=" alt="Chatbot Icon" className='chatboticon'/>
      </div>
      {showChat ? (
        <div className="chat-window">
          <div className="chat-header">
            <h2>E-commerce Assistant</h2>
            <button onClick={() => setShowChat(false)}>X</button>
          </div>
          <div className="chat-body">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender}`}>
                <div className="icon"><img src="https://media.istockphoto.com/id/1010001882/vector/%C3%B0%C3%B0%C2%B5%C3%B1%C3%B0%C3%B1%C3%B1.jpg?s=612x612&w=0&k=20&c=1jeAr9KSx3sG7SKxUPR_j8WPSZq_NIKL0P-MA4F1xRw=" alt="Chatbot Icon" width={"100%"} style={{borderRadius:"50%"}}/></div>
                <div className="message-content">{message.text}</div>
              </div>
            ))}
          </div>
          <div className="options">
            <button onClick={handleProductCategories}>Tell me about product categories</button>
            <button onClick={handleClothingTypes}>What types of clothing do you have?</button>
            {/* <button onClick={() => Reply('How can I track my order?')}>How can I track my order?</button>
            <button onClick={() => Reply('What\'s your return policy?')}>What's your return policy?</button>
            <button onClick={() => Reply('Tell me about ongoing promotions.')}>Tell me about ongoing promotions.</button> */}
          </div>
        </div>
      ) : (
        showPopup && (
          <div className="popup">
            {/* <p><b>E-commerce Assistant</b></p> */}
          </div>
        )
      )}
    </>
  );
};

export default Chatbot;
