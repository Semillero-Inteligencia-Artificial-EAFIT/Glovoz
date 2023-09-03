import { Navigate, Route, Routes } from "react-router-dom";
import Room from "./features/room/Room";
import Home from "./features/room/Home";
import Layout from "./components/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="room/:roomId" element={<Room />} />
      </Route>
      {/* Catch call*/}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
