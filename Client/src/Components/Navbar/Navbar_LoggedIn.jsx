/* eslint-disable react/prop-types */
import { useState } from 'react'
import { BsPerson } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";
import { NavLink, Link } from 'react-router-dom';
import { Avatar, Divider, IconButton, Menu, MenuItem } from '@mui/material';
import useLoggedInUser from "../../Hooks/useLoggedInUser";
import logo_compilex from '../../assets/logo-compilex.png'

const Navbar_LoggedIn = ({handleLogout, user}) => {

    const linkClass = ( {isActive} ) => (
        isActive 
        ? 
        'flex flex-row gap-2 items-center text-lg text-white text-[#4285F4] hover:text-[#4285F4] hover:text-white rounded-md px-4 py-2' 
        : 
        'flex flex-row gap-2 items-center text-lg text-[#D9D9D9] hover:text-white rounded-md px-4 py-2'
    )

    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);  
    const [loggedInUser] = useLoggedInUser();

    const userProfilePic = loggedInUser[0]?.profileImage ? loggedInUser[0]?.profileImage : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const result =  user?.email?.split('@')[0];
    
  return (
    <div className="w-full bg-[#181818] text-white h-[10vh] px-16 flex flex-row justify-between align-center items-center">
        
        <div className="w-1/2">
            <Link to='/'>
                <img src={logo_compilex} className='w-[170px]'/>
            </Link>
        </div>
        
        <div className='w-1/2 flex flex-row gap-5 justify-end align-center items-center'>
            {/* NavLinks */}
            <div className='flex flex-row justify-around gap-5'>
                <NavLink to='/profile' className={ linkClass }>
                    <BsPerson />
                    <h2>Profile</h2>
                </NavLink>
            </div>

            {/* Profile Icon */}
            <div className='mr-10'> 
                <div className="flex flex-row justify-center items-center gap-0 pl-2 rounded-[20px] bg-[#0f0e0e]">
                    <Avatar src={userProfilePic}></Avatar>
                        {/* <div className='user_info'>
                            <h4>
                                {
                                    loggedInUser[0]?.name ? loggedInUser[0]?.name : user && user[0]?.displayName
                                }
                            </h4>
                            <h5>@{result}</h5>
                        </div> */}
                    <IconButton size ='large' sx ={{ ml: 0}} aria-controls={openMenu ? "basic-menu" : undefined} aria-haspopup="true" aria-expanded={openMenu ? "true" : undefined} onClick={handleClick}>
                        <MdKeyboardArrowDown className='text-3xl text-[#D9D9D9]'/>
                    </IconButton>
                    <Menu id='basic-menu' anchorEl={anchorEl} open={openMenu} onClick={handleClose} onClose={handleClose}>
                        <MenuItem className='Profile_info1'>
                            <Avatar src={userProfilePic}></Avatar>
                            <div className='user_info subuser_info'>
                                <h4>
                                    {
                                        loggedInUser[0]?.name ? loggedInUser[0]?.name : user && user[0]?.displayName
                                    }
                                </h4>
                                <h5>@{result}</h5>
                            </div>
                        </MenuItem>
                        <Divider/>
                        <MenuItem onClick={handleClose}> View Profile </MenuItem>
                        <MenuItem onClick={handleLogout}> Log Out @{result} </MenuItem>
                    </Menu>
                </div>
            </div>

        </div>
        
        
        
        
        
        
        
        
        
        
        
        
        
        
       
       
       
       
       
       
       
       
       
       
       
       
       
       
        {/* <div>
        <NavLink to='/home/explore'>
            <SidebarOptions className={ linkClass } Icon={LuEye} text='Explore' />
        </NavLink>
        <NavLink to='/home/messages'>
            <SidebarOptions className={ linkClass } Icon={BiMessageSquareDetail} text='Messages' />
        </NavLink>
        <NavLink to='/home/profile'>
            <SidebarOptions className={ linkClass } Icon={BsPerson} text='Profile' />
        </NavLink>
        </div> */}
        
    </div>
  )
}

export default Navbar_LoggedIn