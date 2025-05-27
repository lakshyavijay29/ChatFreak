import { useSelector } from 'react-redux';
import { type RootState } from '../../store';
import { toast, Toaster} from 'react-hot-toast';
import { useEffect, useState, useRef } from 'react';
import './ChatPage.css'
import { SocketMessageTypes } from 'teleparty-websocket-lib';
import { useTelepartyClient } from '../../context/telepartyClient';
import { type SessionChatMessage } from 'teleparty-websocket-lib';
import { FaUserCircle } from 'react-icons/fa';

interface ChatPageProps {
  chatRoomId: string,
}

const ChatPage: React.FC<ChatPageProps> = ({chatRoomId}) => {
const [input, setInput] = useState('');
const bottomRef = useRef<HTMLDivElement>(null);
const base64Img = localStorage.getItem('profilePic');

const messages = useSelector((state: RootState) => state.chat.messages);
const isSomeoneTyping = useSelector((state: RootState) => state.chat.isSomeoneTyping);
// const messages: SessionChatMessage[] = [
//   {
//     userNickname: 'Alice',
//     body: 'Hey everyone!',
//     timestamp: 1,
//     permId: 'u1',
//     isSystemMessage: false,
//   },
//   {
//     userNickname: 'Bob',
//     body: 'joined the party🎉',
//     timestamp: 2,
//     permId: 'u2',
//     isSystemMessage: false,
//   },
//   {
//     userNickname: 'Charlie',
//     body: 'Let’s start watching!',
//     timestamp: 3,
//     permId: 'u3',
//     isSystemMessage: false,
//   },
//   {
//     userNickname: 'Alice',
//     body: 'Sure, ready when you are.',
//     timestamp: 4,
//     permId: 'u1',
//     isSystemMessage: false,
//   },
//   {
//     userNickname: 'Alice',
//     body: 'Hey everyone!',
//     timestamp: 1,
//     permId: 'u1',
//     isSystemMessage: false,
//   },
//   {
//     userNickname: 'Bob',
//     body: 'joined the party🎉',
//     timestamp: 2,
//     permId: 'u2',
//     isSystemMessage: false,
//   },
//   {
//     userNickname: 'Charlie',
//     body: 'Let’s start watching!',
//     timestamp: 3,
//     permId: 'u3',
//     isSystemMessage: false,
//   },
//   {
//     userNickname: 'Alice',
//     body: 'Sure, ready when you are.',
//     timestamp: 4,
//     permId: 'u1',
//     isSystemMessage: false,
//   },
// ];
const { client: clientRef } = useTelepartyClient();

const handleSend = () => {
    if (input) {
      clientRef.current?.sendMessage(SocketMessageTypes.SEND_MESSAGE,{body:input})
      console.log('Send:', input);
      setInput('');
    }
  };

    const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    clientRef.current?.sendMessage(SocketMessageTypes.SET_TYPING_PRESENCE,{typing:true})
  };

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];

    if (lastMessage?.body === 'joined the party🎉') {
      console.log('Joineddddd');
      toast.success(`${lastMessage.userNickname} joined the party🎉`);
    }

    if (lastMessage?.body === 'left') {
      toast.error(`${lastMessage.userNickname} left the party`);
    }
  }, [messages]);

    const filteredMessages = messages.filter((msg) =>
      msg.body &&
      msg.body.trim().toLowerCase() !== 'joined the party🎉' &&
      msg.body.trim().toLowerCase() !== 'left' &&
      msg.userNickname &&
      msg.userNickname.trim() !== '' &&
      typeof msg.timestamp === 'number' &&
      !isNaN(msg.timestamp)
    );

  useEffect(() => {
  bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
}, [filteredMessages]);

return (
    <div className="master">
      {base64Img ? (
        <img src={base64Img} alt="Profile" className="profile-pic" />
      ) : (
        <FaUserCircle size={60} color="#aaa" />
      )}
      <div className="chat-header">
        {chatRoomId && (
          <div className="chat-room-id">Room ID: {chatRoomId}</div>
        )}
        {isSomeoneTyping && (
          <div className="global-typing-indicator">Someone is typing…</div>
        )}
      </div>

      <h2 style={{ color: 'white' }}>Messages</h2>
      <div className="message-container">
        {filteredMessages.length > 0 ? (
          <ul className="message-list">
              {filteredMessages.map((msg, idx) => {
                const isLeftMessage = msg.body === 'left';
                return (
                 <li
                  key={idx}
                  className={`message-bubble ${isLeftMessage ? 'left-message' : ''}`}
                >
                  <strong>{msg.userNickname}:</strong> {msg.body}
                  <div className="timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</div>
                </li>
                )})}
            <div ref={bottomRef}/>
          </ul>
        ) : (
          <p style={{ color: 'white' }}>No messages available.</p>
        )}
      </div>
      <div className="chat-footer">
        <div className="chat-input-container">
          <input
            type="text"
            className="chat-input"
            placeholder="Type a message..."
            value={input}
            onChange={handleTyping}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
          />
          <button className="send-button" onClick={handleSend}>Send ➤</button>
        </div>
      </div>

      <Toaster/>
    </div>
  );
};

export default ChatPage;
