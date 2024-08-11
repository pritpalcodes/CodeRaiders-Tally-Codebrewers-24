import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate} from 'react-router-dom';
import './LeaderBoard.css';
import questions from '../../../Server/problems/problems.json';

const LeaderBoard = () => {
  const { code } = useParams();
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [contestDetails, setContestDetails] = useState({});
  const [questionDetails, setQuestionDetails] = useState([]);
  
  const location = useLocation();
  const { past } = location.state || {}; 
  const navigate = useNavigate();
  
  

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

    const selectRandomProblems = (questions) => {
      const easyQuestions = questions.filter(q => q.difficulty === 'Easy');
      const mediumQuestions = questions.filter(q => q.difficulty === 'Medium');

      const randomEasy = easyQuestions[Math.floor(Math.random() * easyQuestions.length)];
      const randomMedium = mediumQuestions[Math.floor(Math.random() * mediumQuestions.length)];

      return [randomEasy, randomMedium];
    };

    // Check localStorage for previously saved questions
    const storedQuestions = localStorage.getItem(`contestQuestions_${code}`);
    let selectedQuestions;

    if (storedQuestions) {
      selectedQuestions = JSON.parse(storedQuestions);
    } else {
      selectedQuestions = selectRandomProblems(questions);
      localStorage.setItem(`contestQuestions_${code}`, JSON.stringify(selectedQuestions));
    }

    const questionsWithDetails = selectedQuestions.map(question => ({
      id: question.id,
      title: question.title,
      difficulty: question.difficulty,
      score: question.difficulty === 'Easy' ? 4 : 7
    }));

    // Simulate fetching leaderboard data
    const leaderboard = [
      { user: 'User1', Q1: selectedQuestions[0].title, Q1Time: '10:05', Q2: selectedQuestions[1].title, Q2Time: '--', score: 0 },
      { user: 'User2', Q1: selectedQuestions[0].title, Q1Time: '10:07', Q2: selectedQuestions[1].title, Q2Time: '10:30', score: 0 },
      { user: 'User3', Q1: selectedQuestions[0].title, Q1Time: '--', Q2: selectedQuestions[1].title, Q2Time: '10:20', score: 0 },
      { user: 'User4', Q1: selectedQuestions[0].title, Q1Time: '10:10', Q2: selectedQuestions[1].title, Q2Time: '10:27', score: 0 },
      { user: 'User5', Q1: selectedQuestions[0].title, Q1Time: '10:10', Q2: selectedQuestions[1].title, Q2Time: '10:30', score: 0 },
    ];

    // Calculate final score
    const updatedLeaderboard = leaderboard.map(entry => {
      const Q1Details = selectedQuestions.find(q => q.title === entry.Q1);
      const Q2Details = selectedQuestions.find(q => q.title === entry.Q2);
  
      const Q1Score = entry.Q1Time !== '--' ? (Q1Details ? (Q1Details.difficulty === 'Easy' ? 4 : 7) : 0) : 0;
      const Q2Score = entry.Q2Time!== '--' ? (Q2Details ? (Q2Details.difficulty === 'Easy' ? 4 : 7) : 0) : 0;
      
      const totalScore = Q1Score + Q2Score;
  
      const Q1Time = entry.Q1Time !== '--' ? new Date(`1970-01-01T${entry.Q1Time}:00Z`).getTime() : Infinity;
      const Q2Time = entry.Q2Time !== '--' ? new Date(`1970-01-01T${entry.Q2Time}:00Z`).getTime() : Infinity;
  
      const totalTime = Q1Time + Q2Time;
  
      return { ...entry, score: totalScore, totalTime };
    });

    // Sort leaderboard by score and time
    const sortedLeaderboard = updatedLeaderboard.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.totalTime - b.totalTime;
    });

    setLeaderboardData(sortedLeaderboard);
    setQuestionDetails(questionsWithDetails);
  }, [code]);

  console.log(questionDetails);
  const handleQuestionClick = (questionId) => {
    navigate(`/practice/${questionId}`);
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
            <th>Rank</th>
            <th>User</th>
            <th>Q1</th>
            <th>Q1 Submission Time</th>
            <th>Q2</th>
            <th>Q2 Submission Time</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((entry, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{entry.user}</td>
              <td>{entry.Q1}</td>
              <td>{entry.Q1Time}</td>
              <td>{entry.Q2}</td>
              <td>{entry.Q2Time}</td>
              <td>{entry.score}</td>
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
            <tr key={index} onClick={() => handleQuestionClick(question.id)}>
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
