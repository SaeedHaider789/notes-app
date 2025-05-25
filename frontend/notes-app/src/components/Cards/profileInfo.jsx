import React from 'react'
import { getInitials } from '../../utils/helper'
import {Link} from "react-router"


const ProfileInfo = ({user, darkMode}) => {
    return (
        <div className='flex items-center justify-center sm:gap-4 max-sm:gap-2.5'>
            <div className='flex justify-between items-center'>
                <div className={`${darkMode ? 'bg-slate-800' : 'bg-slate-100 text-slate-950'} pIcon w-12 h-12 flex justify-center items-center rounded-[100%]`}>{getInitials(user)}</div>
            </div>

            <div className='sm:mr-3 max-sm:mr-0'>
                <p className="name text-sm font-medium">{user}</p>

                <Link to="/login" className={`${darkMode ? 'text-slate-300' :  'text-slate-700'} logout text-sm underline cursor-pointer`}>Logout</Link>
            </div>
        </div>
    )

}

export default ProfileInfo