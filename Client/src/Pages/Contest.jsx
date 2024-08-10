/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Contest.css';

const Contest = () => {
  const [ongoingContests, setOngoingContests] = useState([]);
  const [pastContests, setPastContests] = useState([]);
  const [selectedContest, setSelectedContest] = useState(null);
  const [past, setPast] = useState([
    { code: 'START146', name: 'Starters 146', date: '2024-07-15', time: '09:00', duration: '2 Hrs', startDate: '2024-07-15', endDate: '2024-07-15', instructions: `Rules and Regulations:
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
      ` },
    { code: 'MEDIUM3', name: 'Medium 3', date: '2024-07-16', time: '10:00', duration: '2 Hrs', startDate: '2024-07-16', endDate: '2024-07-16', instructions: `Rules and Regulations:
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
      ` }
  ]);
  const navigate = useNavigate();


  useEffect(() => {
    const ongoing = [
      { code: 'UPCOMING1', name: 'Upcoming 1', date: '2024-08-18', time: '23:35', duration: '2 Hrs', startDate: '2024-08-18', endDate: '2024-08-18', instructions: `Rules and Regulations:
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
        ` },
      { code: 'START147', name: 'Starters 147', date: '2024-08-14', time: '20:00', duration: '2 Hrs', startDate: '2024-08-14', endDate: '2024-08-14', instructions: 'Rules and Regulations: This is an IOI-style contest...' },
      { code: 'START148', name: 'Starters 148', date: '2024-08-15', time: '18:00', duration: '2 Hrs', startDate: '2024-08-15', endDate: '2024-08-15', instructions: 'Rules and Regulations: This is an IOI-style contest...' },
      { code: 'MEDIUM1', name: 'Medium 1', date: '2024-08-16', time: '19:00', duration: '2 Hrs', startDate: '2024-08-16', endDate: '2024-08-16', instructions: 'Rules and Regulations: This is an IOI-style contest...' }
    ];
    
    

    setOngoingContests(ongoing);
    setPastContests(past);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = new Date();
      
      const updatedOngoing = ongoingContests.filter(contest => {
        const contestEndTime = new Date(`${contest.date}T${contest.time}`);
        contestEndTime.setHours(contestEndTime.getHours() + parseInt(contest.duration.split(' ')[0]));
        return currentTime < contestEndTime;
      });

      const updatedPast = [
        ...pastContests,
        ...ongoingContests.filter(contest => {
          const contestEndTime = new Date(`${contest.date}T${contest.time}`);
          contestEndTime.setHours(contestEndTime.getHours() + parseInt(contest.duration.split(' ')[0]));
          return currentTime >= contestEndTime;
        })
      ];

      setOngoingContests(updatedOngoing);
      setPastContests(updatedPast);
    }, 1000); 

    return () => clearInterval(intervalId);
  }, [ongoingContests, pastContests]);

  const calculateTimeUntilStart = (contestDate, contestTime) => {
    const contestDateTime = new Date(`${contestDate}T${contestTime}`);
    const currentTime = new Date();
    const timeDifference = contestDateTime - currentTime;

    if (timeDifference > 0) {
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      return `${days} Days ${hours} Hrs`;
    } else {
      return "Started";
    }
  };

  const handleContestClick = (contest) => {
    const contestDateTime = new Date(`${contest.date}T${contest.time}`);
    const currentTime = new Date();

    if (currentTime >= contestDateTime) {
      navigate(`./${contest.code}`, { state: { past } });
    } else {
      const remainingTime = Math.abs(contestDateTime - currentTime);
      const hours = Math.floor(remainingTime / (1000 * 60 * 60));
      const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
      alert(`The contest will start in ${hours} hours and ${minutes} minutes`);
    }
  };

  return (
    <div>
      <h2>Upcoming Contests</h2>
      <table className="contest-table">
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Start</th>
            <th>Duration</th>
            <th>Starts in</th>
          </tr>
        </thead>
        <tbody>
          {ongoingContests.map((contest, index) => {
            const contestEndTime = new Date(`${contest.date}T${contest.time}`);
            contestEndTime.setHours(contestEndTime.getHours() + parseInt(contest.duration.split(' ')[0]));

            const isOngoing = new Date() >= new Date(`${contest.date}T${contest.time}`) && new Date() < contestEndTime;

            return (
              <tr 
                key={index} 
                onClick={() => handleContestClick(contest)} 
                className={isOngoing ? 'ongoing-contest' : ''}
              >
                <td>{contest.code}</td>
                <td>{contest.name}</td>
                <td>{`${contest.date} ${new Date(`${contest.date}T${contest.time}`).toLocaleString('en-US', { weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: true })}`}</td>
                <td>{contest.duration}</td>
                <td>{calculateTimeUntilStart(contest.date, contest.time)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h2>Past Contests</h2>
      <table className="contest-table">
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Start</th>
            <th>Duration</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {pastContests.map((contest, index) => (
            <tr key={index} onClick={() => handleContestClick(contest)}>
              <td>{contest.code}</td>
              <td>{contest.name}</td>
              <td>{`${contest.date} ${new Date(`${contest.date}T${contest.time}`).toLocaleString('en-US', { weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: true })}`}</td>
              <td>{contest.duration}</td>
              <td>Ended</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedContest && (
        <div className="contest-details">
          <h3>Contest Details</h3>
          <p>Code: {selectedContest.code}</p>
          <p>Name: {selectedContest.name}</p>
          <p>Date: {selectedContest.date}</p>
          <p>Time: {selectedContest.time}</p>
          <p>Duration: {selectedContest.duration}</p>
        </div>
      )}
    </div>
  );
};

export default Contest;
