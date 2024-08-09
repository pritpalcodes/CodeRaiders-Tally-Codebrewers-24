import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Practice.css'; // We'll create this file for styling

const Practice = () => {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    const fetchProblems = async () => {
      const response = await fetch('/problems/problems.json'); // Assuming problems.json is in the /problems directory
      const data = await response.json();
      setProblems(data);
    };

    fetchProblems();
  }, []);

  return (
    <div className="practice-container">
      <h1>Practice Problems</h1>
      <table className="problems-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Difficulty</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((problem, idx) => (
            <tr key={problem.id} className={idx % 2 === 0 ? 'even' : 'odd'}>
              <td>{problem.id}</td>
              <td>
                <Link to={`/problems/${problem.id}`}>{problem.title}</Link>
              </td>
              <td>{problem.difficulty}</td>
              <td>{problem.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Practice;
