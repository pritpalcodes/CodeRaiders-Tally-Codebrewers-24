/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Practice.css'; // We'll create this file for styling
import questions from '../../../Server/problems/problems.json'
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import useLoggedInUser from '../Hooks/useLoggedInUser';
import Navbar_LoggedIn from '../Components/Navbar/Navbar_LoggedIn';
import Navbar_NotLoggedIn from '../Components/Navbar/Navbar_NotLoggedIn';
import axios from 'axios'

const Practice = () => {

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

    const [problems, setProblems] = useState([]);
    console.log("problems", problems )
    
    
    useEffect(() => {
      const fetchProblems = async () => {
        try {
          const response = await axios.get('http://localhost:5000/getProblems') 
          const data = response.data
          const simplifiedProblems = data.map(({ id, title, difficulty, category }) => ({
            id, title, difficulty, category
          }));
          console.log("simplifiedProblems", simplifiedProblems )
          setProblems(simplifiedProblems);
        } catch (error) {
          console.error('There was a problem with the fetch operation:', error);
        }
      };
      fetchProblems();
    }, []);

  return (
  <div className='flex flex-col bg-[#181818] h-screen'>  
    {user ? (
          <Navbar_LoggedIn handleLogout={handleLogout} user={user} />
      ) : (
          <Navbar_NotLoggedIn />
      )}
    <div className="practice-container">
      
      <h1 className='text-white text-4xl text-center poppins-bold mb-5'>Practice Problems</h1>
      <table className="problems-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Difficulty</th>
            <th>Category</th>
            <th>Submission Status</th>
          </tr>
        </thead>
        <tbody>
          {
            problems.map((problem, idx) => (
                <>
                    <tr key={problem.id} className={idx % 2 === 0 ? 'even' : 'odd'}>
                        <td>{problem.id}</td>
                        <td>
                            <Link to={`/practice/${problem.id}`}>{problem.title}</Link>
                        </td>
                        <td>{problem.difficulty}</td>
                        <td>{problem.category}</td>
                    </tr>
                </>
            ))
          }
        </tbody>
      </table>
    </div>
  </div>
  );
};

export default Practice;