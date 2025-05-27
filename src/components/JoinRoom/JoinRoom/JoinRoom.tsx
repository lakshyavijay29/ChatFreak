import { useState, type FormEvent, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import "./JoinRoom.css";
import { useDispatch } from "react-redux";
// import { setClient } from "../../../redux/telepartyClientSlice";
import { addMessage } from '../../../redux/chatSlice';
import { TelepartyClient, type SocketEventHandler, SocketMessageTypes} from 'teleparty-websocket-lib';
import { useEffect, useRef } from "react";
import { useTelepartyClient } from "../../../context/telepartyClient";

export default function JoinRoom() {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [userIcon, setUserIcon] = useState<string>("");
  
  const { client: clientRef } = useTelepartyClient();
  const dispatch = useDispatch();

  useEffect(() => {
    if (clientRef.current === null) {
      const eventHandler: SocketEventHandler = {
        onConnectionReady: () => {
          console.log("Connection has been established");
          toast.success("Connected to server");
        },
        onClose: () => {
          console.log("Socket has been closed");
          toast.error("Connection lost");
          alert("Connection lost...refresh page")
        },
        onMessage: (message) => {
          console.log("Received message:", JSON.stringify(message));
          console.log("Received message:", message);
        if (message.type === SocketMessageTypes.SEND_MESSAGE) {
          dispatch(addMessage(message.data));
        } else {
          console.log("Unhandled message type:", message.type);
        }
        },
      };

      clientRef.current = new TelepartyClient(eventHandler);
    }

    return () => {};
  }, []); 

  async function handleRoomSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    if (!clientRef.current) {
      toast.error("Connection not ready");
      return;
    }
    
    if (!username) {
      toast.error("Please enter a nickname");
      return;
    }
    
    if (!roomId) {
      toast.error("Please enter a room ID");
      return;
    }

    try {
      const messages = await clientRef.current.joinChatRoom(username, roomId, userIcon);
      toast.success("Successfully joined room!");
      navigate('/chat',{ state: { roomId } });
    } catch (error) {
      console.error("Error joining room:", error);
      toast.error("Failed to join room");
    }
  }

  async function createRoomId() {
    console.log("entering creating room");
    if (!clientRef.current) {
      toast.error("Connection not ready");
      return;
    }
    
    if (!username) {
      toast.error("Enter nickname");
      return;
    }

    try {
      const roomId = await clientRef.current.createChatRoom(username, userIcon);
      console.log("Room ID is:", roomId);
      setRoomId(roomId);
      navigate('/chat', {state: {roomId}});
      toast.success("Room created successfully!");
      
    } catch (error) {
      console.error("Error creating room:", error);
      toast.error("Failed to create room");
    }
  }

  return (
    <div className="join-room-container">
      <h1 className="join-room-title">CHATFREAK!!!</h1>

      <form className="join-room-form" onSubmit={handleRoomSubmit}>
        <p>Paste your invitation code down below</p>

        <div>
          <input
            className="join-room-input"
            id="roomIdInput"
            type="text"
            placeholder="Enter room ID"
            required
            value={roomId}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setRoomId(e.target.value)}
            autoSave="off"
            autoComplete="off"
          />
          <input
            className="join-room-input"
            id="roomIdInput"
            type="text"
            placeholder="Enter Nickname"
            required
            value={username}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
            autoSave="off"
            autoComplete="off"
          />
        </div>

        <button type="submit" className="join-room-button" >
          Join
        </button>
        {/* {error && <p style={{ color: "red" }}>{error}</p>} */}

        <p className="join-room-footer" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <span>Don't have an invite code?</span>
        <button
          type="button"
          onClick={createRoomId}
          className="join-room-footer-room-creator"
          style={{
            textDecoration: "underline",
            color: "blue",
            cursor: "pointer",
            background: "none",
            border: "none",
            padding: 0,
            font: "inherit",
          }}
        >
          Create your own room
        </button>
      </p>
      </form>

      <Toaster />
    </div>
  );
}
