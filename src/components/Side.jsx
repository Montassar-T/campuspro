import user from '../assets/icons/user.svg'
import board from '../assets/icons/board.svg'
import logoutIcon from '../assets/icons/logout.svg'
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../features/auth/authApiSlice';

const Side = ()=>{


    const [logout]= useLogoutMutation()
    const navigate =useNavigate()

    const handleLogout = async ()=>{
        await logout();
        Cookies.remove('accessToken');
        navigate('/login')

    }
    return(
        <div className="side min-h-screen bg-zinc-900 flex justify-between  flex-col pb-0  ">
            <div className="text-white font-medium text-2xl p-8 px-8">
            Campus<span className="text-green-600">Pro</span>
            </div>
                <ul className=' flex-1 mt-24'>
                    <Link to='/workers' className='flex content-center cursor-pointer   ps-8 hover:bg-zinc-800 p-4'>
                        <img src={user} alt="user icon" />
                        <span className='ms-4 text-white text-'>Workers</span>
                        
                    </Link>
                    <Link to='/absences' className='flex content-center ps-8 cursor-pointer hover:bg-zinc-800 p-4'>
                        <img src={board} alt="user icon" />

                        
                        <span className='ms-4 text-white text-'>Absences</span>
                        
                    </Link>

                    
                </ul>
               
      
            <ul className=' flex content-end mb-12 justify-end'>
                    <li className='flex content-center h-fit ps-8 w-full cursor-pointer hover:bg-zinc-800 p-4' onClick={handleLogout}>
                        <img src={logoutIcon} alt="" />
                        <span className='ms-4 text-white text-'>Logout</span>

                    </li>
                </ul>
            
           
        </div>
    )
}



export default Side;