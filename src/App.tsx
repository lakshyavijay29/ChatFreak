import {createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import ChatRoom from './pages/ChatRoom';

  const router = createBrowserRouter([
    {path: "/", element: <Home />},
    {path: "/chat", element: <ChatRoom />}
  ])

  const App: React.FC = () => {
  return <RouterProvider router={router} />;
};


export default App
