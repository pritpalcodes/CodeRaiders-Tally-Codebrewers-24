import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ContestDetails = () => {
  const { code } = useParams();
  const [contestDetails, setContestDetails] = useState(null);

  useEffect(() => {
    // Fetch the contest details based on the code
    // This should be replaced with an actual API call
    const contestData = {
      START147: { code: 'START147', name: 'Starters 147', date: '2024-08-14', time: '20:00', duration: '2 Hrs' },
      START148: { code: 'START148', name: 'Starters 148', date: '2024-08-15', time: '18:00', duration: '2 Hrs' },
      MEDIUM1: { code: 'MEDIUM1', name: 'Medium 1', date: '2024-08-16', time: '19:00', duration: '2 Hrs' }
      // Add more contest data here...
    };

    setContestDetails(contestData[code]);
  }, [code]);

  return (
    <div>
      {contestDetails ? (
        <div>
          <h2>{contestDetails.name}</h2>
          <p>Code: {contestDetails.code}</p>
          <p>Date: {contestDetails.date}</p>
          <p>Time: {contestDetails.time}</p>
          <p>Duration: {contestDetails.duration}</p>
          {/* Add more details as needed */}
        </div>
      ) : (
        <p>Loading contest details...</p>
      )}
    </div>
  );
};

export default ContestDetails;
