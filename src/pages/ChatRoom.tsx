import { useLocation } from "react-router-dom";
import ChatPage from "../components/ChatPage/ChatPage";

const ChatRoom = () => {
  const location = useLocation();
  const roomId = location.state?.roomId; 
  return (
    <div
          style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
          margin: 0,
          padding: 0,
          backgroundImage: "url('/utils/ChatPage.png')", 
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
        }}>
          <ChatPage chatRoomId={roomId} />
      </div>
  )
}

export default ChatRoom