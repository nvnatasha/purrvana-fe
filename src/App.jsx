import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Signup from './components/Signup'
import Dashboard from './components/Dashboard';
import Session from './components/Session'
import Home from './components/Home'
import MeetTheCats from "./components/MeetTheCats";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/session" element={<Session />} />
        <Route path="/home" element={<Home />} />
        <Route path="/meet-the-cats" element={<MeetTheCats />} />
        {/* You can add a Dashboard or Home component next */}
      </Routes>
    </Router>
  );
}

export default App;
