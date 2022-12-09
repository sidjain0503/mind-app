import './App.css';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import Dashboard from './Dashboard/Dashboard';
import Search from './Components/Navbar/Search/Search';
import Chat from './Components/Chat/Chat';
import Navbar from './Components/Navbar/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from './Components/Profile/Profile';
import './Components/AssignTask/AssignTask.css'
import Mentees from './Mentees/Mentees';
import { useEffect } from 'react';
import AllUsers from './Admin/AllUsers/AllUsers';
import Login from './Components/Login/Login';
import CheckTask from './Components/CheckTask/CheckTask';
import AssignedTask from './Mentor/AssignedTask';
import Plan from './Components/plan/Plan';
import Buy from './Components/plan/Buy/Buy';
import Contact from './Components/Contact/Contact';
import ShowProfile from './Components/Profile/ShowProfile';
import Pyq from './Components/StudyResources/data/Resources/Pyq';
import Dpp from './Components/StudyResources/data/Resources/Dpp';
import Maths12 from './Components/StudyResources/data/Resources/Maths12';
import Notes from './Components/StudyResources/data/Resources/Notes';
import StudyResources from './Components/StudyResources/data/Resources/StudyResources';
import Mentor from './Components/Navbar/DashboardTab/DashboardUser/Mentor';
import Mentors from './Mentor/Mentors';
import Mm from './Components/StudyResources/data/Resources/Mm';

function App() {

  const userid = localStorage.getItem('user');
	const navigate = useNavigate();

	useEffect(() => {
		if (!userid) {
			navigate("/")
		} else {
			navigate("/dashboard")
		}
	}, [])

  return (<>
    <div className='app'>
        <ToastContainer position='top-center' />
        <Routes>
          {/* common routes  */}
          <Route path='*' element={<><h1 style={{ textAlign: "center" }}>Page Not  Found </h1></>} />

          <Route path='/dashboard/studyresources/jee/dpps' element={<><Navbar /><Search /><Dpp /></>} />

          <Route path='/dashboard/studyresources/jee/notes' element={<><Navbar /><Search /><Notes /></>} />

          <Route path='/dashboard/studyresources/pyq' element={<><Navbar /><Search /><Pyq /></>} />

          <Route path='/dashboard/studyresources/mindmaps' element={<><Navbar /><Search /><Mm /></>} />

          <Route path='/dashboard/studyresources' element={<><Navbar /><Search /><StudyResources /></>} />
          <Route path='/dashboard/profile/:mtype/:id' element={<><Navbar /><Search /><ShowProfile /></>} />

          <Route path='/dashboard/profile' element={<><Navbar /><Search /><Profile /></>} />
          <Route path='/dashboard/contact' element={<><Navbar /><Search /><Contact /></>} />

          <Route path='/dashboard/buy' element={<><Navbar /><Search /><Buy /></>} />

          <Route path='/dashboard/planDetails' element={<><Navbar /><Search /><Plan /></>} />


          {/* admin */}
          <Route path='/dashboard/AssignMentor' element={<><Navbar /><Search /><AllUsers /></>} />
          <Route path='/dashboard/allMentors' element={<><Navbar /><Search /><Mentors task={false} /></>} />


          {/* mentor */}

          <Route path='/dashboard/AssignTask' element={<><Navbar /><Search /><Mentees task={true} /></>} />

          <Route path='/dashboard/assignedTask' element={<><Navbar /><Search /><AssignedTask /></>} />

          <Route path='/dashboard/Mymentees' element={<><Navbar /><Search /><Mentees task={false} /></>} />


          {/* chat */}
          <Route path='/dashboard/chat' element={<><Navbar /><Search /><Chat /></>} />


            {/* student */}

          <Route path='/dashboard/checkTask' element={<><Navbar /><Search /><CheckTask /></>} />

          {/* main routes */}

          <Route path='/dashboard' element={<><Dashboard /></>} />

          <Route path='/' element={<><Login /></>} />
        </Routes>

    </div>
  </>

  );
}

export default App;
