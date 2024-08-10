import React, { useEffect, useState } from 'react';
import { useParams, useLocation} from 'react-router-dom';
import './LeaderBoard.css';

const LeaderBoard = () => {
  const { code } = useParams();
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [contestDetails, setContestDetails] = useState({});
  const [questionDetails, setQuestionDetails] = useState([]);
  
  const location = useLocation();
  const { past } = location.state || {}; 
  
  useEffect(() => {
    // Simulate fetching contest details
    const contest = past.find(contest => contest.code === code);

    if (contest) {
      setContestDetails(contest);
    } else {
      // If no match is found, set default contest details or handle the error
      const defaultContest = {
        name: 'Contest Name',
        duration: '2 Hrs',
        startDate: '2024-08-15',
        endDate: '2024-08-15',
        instructions: `Rules and Regulations:
          This is an IOI-style contest. This means that the problems will be partially graded. You will get the score for passing certain test data.
          The details of the failed test cases will also be visible on your solution page.
          You can submit solutions as many times as you'd like, there are no penalties for incorrect submissions. Only your best correct submission will be considered.
          Those who achieve the score first will be placed higher in the ranklist in case of a tie.
          We have removed all the Institutions that we could not identify from our database. We request you to update your institutions once again by going to your profile page.
          You can also send in your queries in an email to help@codechef.com, during the contest.
          Please do not discuss strategy, suggestions, or tips in the comments during a live contest. Posting questions clarifying the problem statement is ok. If you are unsure, email us at feedback@codechef.com.
          Discussing CodeChef's problems or any aspect of a problem, on any other platform on the web, on identification, could lead to the disabling of the respective account and banning from the community.
          Note: You can now "Code, Compile, and Run" your codes on our Online IDE.
          However, if you are using any other online development environment, make sure that other contestants don't have access to your code. As a contestant, you are responsible for making sure others don't access the code that you submit. If you use Ideone, make sure to mark your submission "private" (not secret)".
        `
      };
      setContestDetails(defaultContest);
    }


    // Simulate fetching leaderboard data
    const leaderboard = [
      { user: 'User1', Q1: 'Correct', Q1Time: '10:05', Q2: 'Incorrect', Q2Time: '--' },
      { user: 'User2', Q1: 'Correct', Q1Time: '10:10', Q2: 'Correct', Q2Time: '10:30' },
      { user: 'User3', Q1: 'Incorrect', Q1Time: '--', Q2: 'Correct', Q2Time: '10:20' },
    ];

    // Simulate fetching question details with scores
    const questions = [
      { title: 'Question 1', difficulty: 'Easy', score: 4 },
      { title: 'Question 2', difficulty: 'Medium', score: 7 },
    ];

    // Sort leaderboard based on correctness, scores, and submission times
    leaderboard.sort((a, b) => {
      const aScore = (a.Q1 === 'Correct' ? questions[0].score : 0) + (a.Q2 === 'Correct' ? questions[1].score : 0);
      const bScore = (b.Q1 === 'Correct' ? questions[0].score : 0) + (b.Q2 === 'Correct' ? questions[1].score : 0);

      if (aScore !== bScore) return bScore - aScore;

      const aTotalTime = (a.Q1Time !== '--' ? new Date(`1970-01-01T${a.Q1Time}:00Z`).getTime() : 0)
        + (a.Q2Time !== '--' ? new Date(`1970-01-01T${a.Q2Time}:00Z`).getTime() : 0);
      const bTotalTime = (b.Q1Time !== '--' ? new Date(`1970-01-01T${b.Q1Time}:00Z`).getTime() : 0)
        + (b.Q2Time !== '--' ? new Date(`1970-01-01T${b.Q2Time}:00Z`).getTime() : 0);

      return aTotalTime - bTotalTime;
    });

    setLeaderboardData(leaderboard);
    setQuestionDetails(questions);
  }, [code]);

  const handleQuestionClick = (questionTitle) => {
    alert(`Navigating to the question: ${questionTitle}`);
    // Here you can implement navigation to the specific question's page if needed
  };

  return (
    <div>
      <h2>Contest: {code}</h2>
      <div className="contest-details">
        {Object.entries(contestDetails).map(([key, value], index) => (
          <p key={index}>
            <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {key === 'instructions' ? <pre>{value}</pre> : value}
          </p>
        ))}
      </div>

      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Q1</th>
            <th>Q1 Submission Time</th>
            <th>Q2</th>
            <th>Q2 Submission Time</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((entry, index) => (
            <tr key={index}>
              <td>{entry.user}</td>
              <td>{entry.Q1}</td>
              <td>{entry.Q1Time}</td>
              <td>{entry.Q2}</td>
              <td>{entry.Q2Time}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Questions</h2>
      <table className="question-table">
        <thead>
          <tr>
            <th>Question Title</th>
            <th>Difficulty</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {questionDetails.map((question, index) => (
            <tr key={index} onClick={() => handleQuestionClick(question.title)}>
              <td>{question.title}</td>
              <td>{question.difficulty}</td>
              <td>{question.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderBoard;
