import { useAuthState } from "react-firebase-hooks/auth";
import Navbar_LoggedIn from "../Components/Navbar/Navbar_LoggedIn"
import Navbar_NotLoggedIn from "../Components/Navbar/Navbar_NotLoggedIn"
import auth from "../firebase.init";
import useLoggedInUser from "../Hooks/useLoggedInUser";
import { Avatar } from '@mui/material';
import MainPage from "./MainPage";

const Profile = () => {
    const [user] = useAuthState(auth);
    // const [loggedInUser] = useLoggedInUser();
    // const result = user?.email?.split('@')[0];
    // console.log(loggedInUser)
    // console.log(result)
    const handleLogout = () => {
        auth.signOut().catch((error) => {
            console.error("Sign out error", error);
        });
    };

    console.log(user)

    const userProfilePic = user?.photoURL ? user?.photoURL : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"

  return (
    <div className="flex flex-col bg-[#181818] h-screen text-white p-5">
        {user ? (
                <Navbar_LoggedIn handleLogout={handleLogout} user={user} />
            ) : (
                <Navbar_NotLoggedIn />
        )}
    <div className='profilePage'>
        <MainPage user={user}/>
    </div>

        {/* <div className="w-1/2 border border-white rounded-lg p-3 h-full">
            <Avatar src={userProfilePic}></Avatar>
            <label htmlFor="username">
                Username:
                <input name="username" value={user?.email?.split('@')[0]} type="text" className="text-black bg-white/30 p-3 rounded-lg" disabled/>
            </label>
            {user?.email}
            {user?.displayName}
            {user}
        </div> */}
    </div>
  )
}

export default Profile