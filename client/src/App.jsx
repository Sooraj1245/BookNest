
import Details from "./pages/Details.jsx";
import Homepage from "./pages/Homepage.jsx";
import Login from "./pages/Login.jsx";
import { Routes,Route } from "react-router-dom";

export default function App(){
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/book/:id" element={<Details />} />
    </Routes>
  )
}