import React from 'react';

const Message = ({ text, isUser }) => {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-2`}>
      <div className={`p-3 rounded-lg ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'}`}>
        {text}
      </div>
    </div>
  );
};

export default Message;
