import { useSelector } from 'react-redux';
import { type RootState } from '../../store';
import { toast } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import './ChatPage.css'
import { SocketMessageTypes } from 'teleparty-websocket-lib';
import { useTelepartyClient } from '../../context/telepartyClient';

interface ChatPageProps {
  chatRoomId: string,
}

const ChatPage: React.FC<ChatPageProps> = ({chatRoomId}) => {
const [input, setInput] = useState('');

// const client = useSelector((state: RootState) => state.telepartyClient);
const messages = useSelector((state: RootState) => state.chat.messages);
const { client: clientRef } = useTelepartyClient();

const handleSend = () => {
  //  console.log('Redux client:', client);
  // console.log('Client instance:', client.client);
    if (input.trim()) {
      clientRef.current?.sendMessage(SocketMessageTypes.SEND_MESSAGE,{body:input})
      console.log('Send:', input);
      setInput('');
    }
  };

useEffect(() => {
    messages.forEach((msg) => {
      if (msg.body.trim().toLowerCase() === 'joined the party🎉') {
        toast.success(`${msg.userNickname} joined the party🎉`);
      }
    });
  }, [messages]);

  const filteredMessages = messages.filter(
    (msg) => msg.body.trim().toLowerCase() !== 'joined the party🎉'
  );

return (
    <div className="master">
      {/* Top-right chat room ID */}
      {chatRoomId && (
        <div className="chat-room-id">
          Room ID: {chatRoomId}
        </div>
      )}

      <div className="message-container">
        <h2 style={{ color: 'white' }}>Messages</h2>
        {filteredMessages.length > 0 ? (
          <ul className="message-list">
            {filteredMessages.map((msg, idx) => (
              <li key={idx} className="message-bubble">
                <strong>{msg.userNickname}:</strong> {msg.body}
                <div className="timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</div>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: 'white' }}>No messages available.</p>
        )}
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          className="chat-input"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSend();
          }}
        />
        <button className="send-button" onClick={handleSend}>Send ➤</button>
      </div>
    </div>
  );
};

export default ChatPage;
