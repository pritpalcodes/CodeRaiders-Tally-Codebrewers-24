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
import { useNavigate } from "react-router-dom";

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

    const navigate= useNavigate();

    const competeClick= ()=>{
        navigate('/contest');
    };

    const practiceClick= ()=>{
        navigate('/practice');
    };

    return (
        <div className="flex flex-col bg-[#181818] poppins-medium">
            {user ? (
                <Navbar_LoggedIn handleLogout={handleLogout} user={user} />
            ) : (
                <Navbar_NotLoggedIn />
            )}
            
            {/* <img src={abstract} style={{position: "absolute", top:"10%", left:"85%", width:"300px", zIndex:"1"}} className="brightness-50"/> */}
            <div className="w-full poppins-semibold text-white px-16 flex flex-col items-center gap-5">
                <h1 className="text-[65px] mt-5 py-0">
                    Unleash the Coder Within!
                </h1>
                
                <div className="flex flex-row gap-5">
                    <button onClick={practiceClick} className="px-10 py-2 bg-white text-black rounded-md poppins-medium">Practice</button>
                    <button onClick={competeClick} className="px-10 py-2 bg-white text-black rounded-md poppins-medium">Compete</button>
                </div>
                
                <div className="w-[90%] p-5 rounded-3xl border border-white/30 bg-[#1e1e1e] my-10">
                    <CodeEditorFrame />
                </div>
            </div>
            {/* <DebugFeature /> */}
            <Footer />
        </div>
    );
};

export default HomeLandingPage;
