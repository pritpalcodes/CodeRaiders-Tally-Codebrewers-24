/* eslint-disable no-unused-vars */
import CodeEditor from "../Components/CodeEditorFrame/CodeEditorFrame";
import useLoggedInUser from '../Hooks/useLoggedInUser';

import Navbar_LoggedIn from "../Components/Navbar/Navbar_LoggedIn";
import Navbar_NotLoggedIn from "../Components/Navbar/Navbar_NotLoggedIn";
import Footer from "../Components/Footer";
import TypeWriterFont from "../Components/TypeWriterFont";
import DebugFeature from "../Components/DebugFeature";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";

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
        <div className="flex flex-col bg-[#1a1a1a] poppins-medium">
            {user ? (
                <Navbar_LoggedIn handleLogout={handleLogout} user={user} />
            ) : (
                <Navbar_NotLoggedIn />
            )}
            
            <div className="w-full poppins-bold text-white px-16 flex flex-col items-center gap-5">
                <h1 className="text-[90px] mt-10">
                Unleash the Coder Within!
                </h1>
                
                <div className="flex flex-row gap-5">
                    <button className="px-10 py-2 bg-white text-black rounded-md poppins-medium">Practice</button>
                    <button className="px-10 py-2 bg-white text-black rounded-md poppins-medium">Compete</button>
                </div>
                
                <div className="w-[80%] h-[1000px] bg-red-300 mt-10">
                    <CodeEditor />
                </div>
            </div>
            <TypeWriterFont />
            <DebugFeature />
            <Footer />
        </div>
    );
};

export default HomeLandingPage;
