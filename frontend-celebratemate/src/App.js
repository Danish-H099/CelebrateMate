// import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Friends from "./components/Friends"
import Reminder from "./components/Reminder"
import SetReminder from "./components/SetReminder"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/friends" element={<Friends/>}/>
          <Route path="/reminders" element={<Reminder/>}/>
          <Route path="/setreminder" element={<SetReminder/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
