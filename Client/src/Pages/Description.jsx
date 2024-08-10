/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import questions from '../../../Server/problems/problems.json'
import Navbar_LoggedIn from '../Components/Navbar/Navbar_LoggedIn';
import Navbar_NotLoggedIn from '../Components/Navbar/Navbar_NotLoggedIn';
import useLoggedInUser from '../Hooks/useLoggedInUser';
import auth from '../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';

const Description = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);

  useEffect(() => {
    const fetchProblemDetail = async () => {
      try {
        const simplifiedProblems = questions.map(({ ...question }) => ({
            ...question
        }));
        
        console.log(simplifiedProblems);
        const foundProblem = simplifiedProblems.find(p => p.id === id);
        setProblem(foundProblem);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchProblemDetail();
  }, [id]);

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

  if (!problem) return <p>Loading...</p>;

  return (
    <>
    {user ? (
          <Navbar_LoggedIn handleLogout={handleLogout} user={user} />
      ) : (
          <Navbar_NotLoggedIn />
      )}

      

    {/* <div className="mx-10 p-5">
      <h1>{problem.title}</h1>
      <div className="problem-statement" dangerouslySetInnerHTML={{ __html: problem.problemStatement }} />
      <h2>Examples</h2>
      <ul>
        {problem.examples.map(ex => (
          <li key={ex.id}>
            <p><strong>Input:</strong> {ex.inputText}</p>
            <p><strong>Output:</strong> {ex.outputText}</p>
            {ex.explanation && <p><strong>Explanation:</strong> {ex.explanation}</p>}
          </li>
        ))}
      </ul>
      <h2>Constraints</h2>
      <ul dangerouslySetInnerHTML={{ __html: problem.constraints }} />
      <h2>Starter Code</h2>
      <pre><code>{problem.starterCode}</code></pre>
    </div> */}
    </>
  );
};

export default Description;