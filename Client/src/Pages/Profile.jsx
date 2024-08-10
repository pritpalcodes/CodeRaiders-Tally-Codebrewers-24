import { useAuthState } from "react-firebase-hooks/auth";
import Navbar_LoggedIn from "../Components/Navbar/Navbar_LoggedIn"
import Navbar_NotLoggedIn from "../Components/Navbar/Navbar_NotLoggedIn"
import auth from "../firebase.init";
import useLoggedInUser from "../Hooks/useLoggedInUser";

const Profile = () => {
    const [user] = useAuthState(auth);
    const [loggedInUser] = useLoggedInUser();
    const result = user?.email?.split('@')[0];
    // console.log(loggedInUser)
    // console.log(result)
    const handleLogout = () => {
        auth.signOut().catch((error) => {
            console.error("Sign out error", error);
        });
    };
    console.log(user)
  return (
    <div className="flex flex-col bg-[#181818] text-white">
        {user ? (
                <Navbar_LoggedIn handleLogout={handleLogout} user={user} />
            ) : (
                <Navbar_NotLoggedIn />
        )}
        <div>
            {user?.email}
            {user?.displayName}
            {/* {user} */}
        </div>
    </div>
  )
}

export default Profile