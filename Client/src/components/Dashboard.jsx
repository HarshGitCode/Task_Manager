import { Outlet } from 'react-router-dom'
import SideBar from './SideBar'
function Dashboard() {
  return (
    <div className='flex flex-row overflow-hidden min-h-[calc(100vh-56px)]'><SideBar/>
    <div className='flex min-w-[calc(100vw-200px)] h-[calc(100vh-56px)] bg-white overflow-auto'><Outlet/></div>
    </div>
  )
}

export default Dashboard