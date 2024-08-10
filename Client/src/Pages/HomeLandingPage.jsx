/* eslint-disable no-unused-vars */
import CodeEditorFrame from "../Components/CodeEditorFrame/CodeEditorFrame";
import useLoggedInUser from '../Hooks/useLoggedInUser';
import { Link } from 'react-router-dom';
import Navbar_LoggedIn from "../Components/Navbar/Navbar_LoggedIn";
import Navbar_NotLoggedIn from "../Components/Navbar/Navbar_NotLoggedIn";
import Footer from "../Components/Footer";
import TypeWriterFont from "../Components/TypeWriterFont";
import DebugFeature from "../Components/DebugFeature";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import abstract from '../assets/abstract.png'

const HomeLandingPage = () => {
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

    return (
        <div className="flex flex-col bg-[#181818] poppins-medium">
            {user ? (
                <Navbar_LoggedIn handleLogout={handleLogout} user={user} />
            ) : (
                <Navbar_NotLoggedIn />
            )}
            
            <img src={abstract} style={{position: "fixed", top:"10%", left:"85%", width:"300px", zIndex:"1"}} className="brightness-50"/>
            <div className="w-full poppins-semibold text-white px-16 flex flex-col items-center gap-5">
                <h1 className="text-[65px] mt-5 py-0">
                    Unleash the Coder Within!
                </h1>
                
                <div className="poppins-light text-3xl pb-5">
                    <TypeWriterFont />
                </div>
                
                <div className="flex flex-row gap-5 text-2xl">
                    <Link to="/practice">
                        <button className="px-10 py-3 text-white border border-white rounded-3xl poppins-light hover:bg-white hover:text-black ">Practice</button>
                    </Link>
                    <button className="px-10 py-3 text-white border border-white rounded-3xl poppins-light hover:bg-white hover:text-black">Compete</button>
                </div>
                
                <div className="w-[90%] p-5 rounded-3xl border border-white/30 bg-[#1e1e1e] mt-10">
                    <CodeEditorFrame />
                </div>
            </div>
            <DebugFeature />
            <Footer />
        </div>
    );
};

export default HomeLandingPage;
