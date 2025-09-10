import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// This is a simplified version - you'll need to implement actual API calls
const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  // Sample responses - replace with actual API calls to your chatbot service
  const getBotResponse = async (message) => {
    // This would be replaced with actual API call to Dialogflow or similar service
    const responses = [
      "I can help with pet care questions! What would you like to know?",
      "For appointment booking, please visit our booking section.",
      "You can add medical records in your pet's profile page.",
      "Our support team is available 9AM-6PM weekdays.",
      "I'm still learning about pet care. Could you ask our human experts for detailed questions?"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage = { text: inputMessage, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    
    // Get and add bot response
    const botResponse = await getBotResponse(inputMessage);
    setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
  };

  return (
    <>
      {/* Chatbot toggle button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed z-50 flex items-center justify-center w-16 h-16 text-white rounded-full shadow-lg bottom-6 right-6 bg-primary-600"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </motion.button>

      {/* Chatbot window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed z-50 flex flex-col bg-white border rounded-lg shadow-xl bottom-24 right-6 w-80 h-96 border-neutral-200"
          >
            {/* Header */}
            <div className="flex items-center p-4 text-white rounded-t-lg bg-primary-600">
              <div className="w-3 h-3 mr-2 bg-green-400 rounded-full"></div>
              <h3 className="font-medium">Pet Care Assistant</h3>
              <button 
                className="ml-auto text-white"
                onClick={() => setIsOpen(false)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto">
              {messages.length === 0 ? (
                <div className="my-8 text-center text-neutral-500">
                  <p>Hello! I'm here to help with your pet care questions.</p>
                </div>
              ) : (
                messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-4 ${msg.sender === 'user' ? 'text-right' : ''}`}
                  >
                    <div
                      className={`inline-block px-4 py-2 rounded-lg ${
                        msg.sender === 'user'
                          ? 'bg-primary-600 text-white'
                          : 'bg-neutral-100 text-neutral-800'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-neutral-200">
              <div className="flex">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your question..."
                  className="flex-1 px-4 py-2 border rounded-l-lg border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2 text-white rounded-r-lg bg-primary-600 hover:bg-primary-700"
                >
                  Send
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;