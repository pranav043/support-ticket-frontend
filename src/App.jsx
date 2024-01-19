import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Agent from "./components/Agent";
import Ticket from "./components/Ticket";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <div className="grid-layout">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tickets" element={<Ticket />} />
            <Route path="/agents" element={<Agent />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
