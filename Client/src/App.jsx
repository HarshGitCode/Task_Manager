import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import SingUp from './components/SingUp'
import SignIn from './components/SignIn'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import StatusBar from './components/sidebar/StatusBar'
import Tasks from './components/sidebar/Tasks'
import Complete from './components/sidebar/Complete'
import InPorgress from './components/sidebar/InProgress'
import Team from './components/sidebar/Team'
import PrivateRoute from './components/common/PrivateRoute'


function App() {
  return (
    <div className=" flex flex-col w-screen min-h-screen bg-black">
    <Navbar/>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/signup" element={<SingUp/>}/>
      <Route path="/signin" element={<SignIn/>}/>
      <Route element={
        <PrivateRoute>
          <Dashboard/>
          </PrivateRoute>
        }
        >
      <Route path="dashboard/status" element ={<StatusBar/>}/>
      <Route path="dashboard/tasks" element ={<Tasks/>}/>
      <Route path="dashboard/complete" element ={<Complete/>}/>
      <Route path="dashboard/inProgress" element ={<InPorgress/>}/>
      <Route path="dashboard/team" element ={<Team/>}/>
      </Route>
     </Routes>
     </div>
  )
}

export default App
