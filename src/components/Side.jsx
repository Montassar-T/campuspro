import user from '../assets/icons/user.svg'
import board from '../assets/icons/board.svg'
import logout from '../assets/icons/logout.svg'

import { Link } from 'react-router-dom';

const Side = ()=>{
    return(
        <div className="side min-h-screen bg-zinc-900 flex flex-col pb-0  ">
            <div className="text-white font-medium text-2xl p-8">
            Campus<span className="text-green-600">Pro</span>
            </div>
            <div className=' flex flex-col justify-between'>
                <ul className=' mt-24'>
                    <li to='/workers' className='flex content-center    ps-8 hover:bg-zinc-800 p-4'>
                        <img src={user} alt="user icon" />
                        <span className='ms-4 text-white text-'>Workers</span>
                        
                    </li>
                    <li to='/workers' className='flex content-center ps-8  hover:bg-zinc-800 p-4'>
                        <img src={board} alt="user icon" />
                        <span className='ms-4 text-white text-'>Absences</span>
                        
                    </li>

                    
                </ul>
                <ul className=' flex content-end justify-end'>
                    <li className='flex content-center h-fit ps-8 w-full hover:bg-zinc-800 p-4'>
                        <img src={logout} alt="" />
                        <span className='ms-4 text-white text-'>Logout</span>

                    </li>
                </ul>
            </div>
        </div>
    )
}



export default Side;