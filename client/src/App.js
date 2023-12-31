import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Registration from './Pages/Registration/Registration';
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import StudentDashboard from './components/StudentDashboard/StudentDashboard'
import TutorDashboard from './components/TutorDashboard/TutorDashboard'
import StudentRegistration from './components/StudentRegistration/StudentRegistration';
import TutorRegistration from './components/TutorRegistration/TutorRegistration';
import DoubtCreation from './components/DoubtCreation/DoubtCreation';
import DoubtHistory from './components/DoubtHistory/DoubtHistory'
import Chat from './components/Chat/Chat';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/student" element={<StudentDashboard />} />
        <Route path="/dashboard/tutor" element={<TutorDashboard />} />
        <Route path="/register/student" element={<StudentRegistration />} />
        <Route path="/register/tutor" element={<TutorRegistration />} />
        <Route path="/doubt/create" element={<DoubtCreation />} />
        <Route path="/doubt/history" element={<DoubtHistory />} />
        <Route path="/chat" element={<Chat />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
