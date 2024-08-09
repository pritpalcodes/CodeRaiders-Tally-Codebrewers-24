import { GoSun } from 'react-icons/go';
import { Link } from 'react-router-dom';

const Navbar_NotLoggedIn = () => {
  return (
    <div className="w-full bg-[#282828] text-white h-[7vh] px-16 flex flex-row justify-between align-center items-center">
        <div className="w-1/2">Product Logo</div>
        <div className="w-1/2 flex flex-row gap-5 justify-end align-center items-center">
            <div className="rounded-[50%] p-1 bg-white text-black text-xl border-white">
                <GoSun />
            </div>
            <div>Signup</div>
            <Link to="/login" className="px-10 py-2 bg-white text-black rounded-md poppins-medium">
              Login
            </Link>
        </div>
    </div>
  );
};

export default Navbar_NotLoggedIn;
