/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import questions from '../../../Server/problems/problems.json'
import Navbar_LoggedIn from '../Components/Navbar/Navbar_LoggedIn';
import Navbar_NotLoggedIn from '../Components/Navbar/Navbar_NotLoggedIn';
import useLoggedInUser from '../Hooks/useLoggedInUser';
import auth from '../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import './Description.css'
import CodeEditorFrame from '../Components/Problem_Compiler/CodeEditorFrame';
import TabsRender from '../Components/Problem_Compiler/Tabs';

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

      <div className='w-full h-[90vh] p-1 pb-5 text-white bg-[#181818] px-10 flex flex-row gap-5 justify-between'>
        
        {/* Problem Description */}
        <div className='no-scrollbar bg-white/10 border border-white/30 w-1/2 rounded-2xl p-2 overflow-scroll overflow-x-hidden'>
            <div className="p-5">
              <h1 className='text-2xl poppins-semibold'>{problem.title}</h1>
              <div className={problem.difficulty}>{problem.difficulty}</div>
              <h2 className='text-white text-md normal-case poppins-bold text-left my-5'>Description:</h2>
              <div className="problem-statement" dangerouslySetInnerHTML={{ __html: problem.problemStatement }} />
              <h2 className='text-white text-md normal-case poppins-bold text-left my-5'>Examples:</h2>
              <ul className='font-mono ml-5'>
                {problem.examples.map(ex => (
                  <li key={ex.id} className='pb-5'>
                    <p><strong>Input:</strong> {ex.inputText}</p>
                    <p><strong>Output:</strong> {ex.outputText}</p>
                    {ex.explanation && <p><strong>Explanation:</strong> {ex.explanation}</p>}
                  </li>
                ))}
              </ul>
              <h2 className='text-white text-md normal-case poppins-bold text-left my-5'>Constraints:</h2>
              <ul dangerouslySetInnerHTML={{ __html: problem.constraints }} />
            </div>
        </div>
        
        <div className='w-1/2 flex flex-col gap-5'>
          
            {/* Compiler */}
            <div className=' bg-[#1e1e1e]  border border-white/30 w-full h-full rounded-2xl p-5'>
              <CodeEditorFrame problem={problem}/>
            </div>
            
            {/* Test Cases */}
            {/* <div className='bg-white/10 border border-white/30 w-full h-1/3 rounded-2xl px-5'>
              <TabsRender problem={problem} color='#000'/>
            </div> */}
        </div>
      
      </div>

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