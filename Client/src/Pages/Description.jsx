import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
//import './Description.css'; // Create this file for styling
import questions from '../../../Server/problems/problems.json'


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

  if (!problem) return <p>Loading...</p>;

  return (
    <div className="problem-detail-container">
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
    </div>
  );
};

export default Description;