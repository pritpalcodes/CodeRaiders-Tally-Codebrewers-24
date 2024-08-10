import { GoSun } from 'react-icons/go';
import { Link } from 'react-router-dom';
import logo_compilex from '../../assets/logo-compilex.png'

const Navbar_NotLoggedIn = () => {
  return (
    <div className="w-full bg-[#181818] text-white h-[10vh] px-16 flex flex-row justify-between align-center items-center">
        
        <div className="w-1/2">
              <Link to='/'>
                <img src={logo_compilex} className='w-[170px]'/>
            </Link>
        </div>
        
        <div className="w-1/2 flex flex-row gap-5 justify-end align-center items-center">
            <div className="rounded-[50%] p-1 bg-white text-black text-xl border-white">
                <GoSun />
            </div>
            <Link to="/signup" className="px-5 py-2 text-white poppins-medium">
              Signup
            </Link>
            <Link to="/login" className="px-10 py-2 bg-white text-black rounded-md poppins-medium">
              Login
            </Link>
        </div>
    </div>
  );
};

export default Navbar_NotLoggedIn;
