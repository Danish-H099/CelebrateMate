// import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Contacts from "./components/Contacts"
import Reminder from "./components/Reminder"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/contacts" element={<Contacts/>}/>
          <Route path="/reminders" element={<Reminder/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
