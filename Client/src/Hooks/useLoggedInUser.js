import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import auth from '../firebase.init'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';

// We are using hooks as this component/function will be used in many pages where we would be required to show the details of a particular user.
const useLoggedInUser = () => {
    const [user] = useAuthState(auth) 
    const email = user?.email;
    const [loggedInUser, setLoggedInUser] = useState({});

    useEffect(() => {
        fetch(`http://localhost:5000/loggedInUser?email=${email}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                setLoggedInUser(data);
            })
    },[email, loggedInUser]);

    // const userData = {
    //     name: user?.displayName,
    //     email: user?.email,
    //     photoURL: user?.photoURL,
    // };
      
    // Send user data to backend
    // console.log("hi",userData);
    useEffect(() => {
        if (user) {
            const userData = {
                uid: uuidv4(),
                name: user?.displayName,
                email: user?.email,
                photoURL: user?.photoURL,
            };
      
            sessionStorage.setItem('userUUID', userData.uid);

            axios.post('http://localhost:5000/users', userData)
                .then(response => console.log('User data saved:', response.data))
                .catch(err => console.error('Error saving user data:', err));


        }
    }, [user]); // Only run when `user` changes

  return [loggedInUser, setLoggedInUser];
}

export default useLoggedInUser