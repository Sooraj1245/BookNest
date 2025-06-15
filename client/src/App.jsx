
import Details from "./pages/Details.jsx";
import Homepage from "./pages/Homepage.jsx";
import Login from "./pages/Login.jsx";
import { Routes,Route } from "react-router-dom";
import { BookProvider } from "./components/BookContext.jsx";
export default function App(){
  return (
    <BookProvider>
      <Routes>
        <Route path="/" element={<Homepage />} />
          <Route path="/api/book/:id" element={<Details />} />
      </Routes>
    </BookProvider>
  )
}