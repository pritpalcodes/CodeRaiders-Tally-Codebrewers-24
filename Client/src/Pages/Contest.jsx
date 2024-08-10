import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Contest.css';

const Contest = () => {
  const [ongoingContests, setOngoingContests] = useState([]);
  const [pastContests, setPastContests] = useState([]);
  const [selectedContest, setSelectedContest] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ongoing = [
      { code: 'UPCOMING1', name: 'Upcoming 1', date: '2024-08-10', time: '03:10', duration: '2 Hrs' },
      { code: 'START147', name: 'Starters 147', date: '2024-08-14', time: '20:00', duration: '2 Hrs' },
      { code: 'START148', name: 'Starters 148', date: '2024-08-15', time: '18:00', duration: '2 Hrs' },
      { code: 'MEDIUM1', name: 'Medium 1', date: '2024-08-16', time: '19:00', duration: '2 Hrs' }
    ];
    
    const past = [
      { code: 'START146', name: 'Starters 146', date: '2024-07-15', time: '09:00', duration: '2 Hrs' },
      { code: 'MEDIUM3', name: 'Medium 3', date: '2024-07-16', time: '10:00', duration: '2 Hrs' }
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
    }, 1000); // Update every 10 seconds

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
      navigate(`./${contest.code}`);
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
