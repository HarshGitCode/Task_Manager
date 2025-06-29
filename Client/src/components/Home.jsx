import { Link } from 'react-router-dom'
const loading = false;
function Home() {
  return (
    <>
    {!loading ? (<div className='text-white text-center items-center m-20 '>
        <Link to="/signin">Please Login</Link></div>)
        :(<div>wlecome to taks manager
        </div>)}
    </>
  )
}

export default Home