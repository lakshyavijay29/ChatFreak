import JoinRoom from "../components/JoinRoom/JoinRoom/JoinRoom";

export default function Home() {
  return (
    <div
      style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width: "100vw",
      margin: 0,
      padding:0,
      backgroundImage: "url('/utils/HomePage.png')", 
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      backgroundSize: "cover",
    }}>
        <JoinRoom />
    </div>
  );
}