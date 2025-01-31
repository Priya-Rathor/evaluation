import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./component/signup";
import Signin from "./component/login";
import Dashboard from "./component/Dashboard";
import "./App.css";
import EssayWriting from "./component/essayWrittingPage";
import FeedbackApp from "./component/box";
import LearnerList from "./component/addComponent";
import AssessmentsList from "./component/Assessment"
import AssessmentUI from "./component/showAssessment"
function App() {
  return (
    <Router>
      <Routes>
        {/* Define routes for components */}
        <Route path="/" element={<AssessmentUI/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/writing" element={<EssayWriting />} />
      </Routes>
    </Router>
  );
}

export default App;
