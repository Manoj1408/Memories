import React, { useEffect, useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { Button } from '@material-ui/core';
import useStyles from "./styles";
import { useDispatch } from 'react-redux';
import { AUTH } from '../../constants/actionTypes';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GoogleLoginButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const classes = useStyles();
    const [token,setToken] = useState();
    const [profile,setProfile] = useState([]);


    const googleSuccess = async (res) => {
        console.log(res)
    //   const result = res?.scope; //optional chaining
      setToken(res?.access_token);      
    //   try {
    //     dispatch({ type: AUTH, data: { result, token } });
  
    //     // history.push("/");
    //   } catch (error) {
    //     console.log(error);
    //   }
    };
    useEffect( () => {
        if (token) {
        //   fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //     },
        //   })
        //     .then(response => response.json())
        //     .then(data => {
        //       setProfile(data); 
        //     console.log(typeof(data));
        //     try {
        //         dispatch({ type: AUTH, data: {  profile: profile, token } });
          
        //         // history.push("/");
        //       } catch (error) {
        //         console.log(error);
        //       }
        //     })
        //     .catch(error => {
        //       console.error('Failed to fetch user profile:', error);
        //     });

        const fetchData = async () => {
            const response = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      });
            const data = await response.data;
            console.log(data);
            setProfile(data);
            dispatch({ type: AUTH, data: { result: data, token } });
            navigate('/');
        }
        fetchData();
        }
        // if (token) {
        //     try {
        //       const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        //         headers: {
        //           Authorization: `Bearer ${token}`,
        //         },
        //       });
        
        //       const data = await response.json();
        //       console.log(typeof data);
        //       setProfile(data);
        //       console.log(data);
        
        //     //   dispatch({ type: AUTH, data: { profile: data, token } });
        //     try {
        //                 dispatch({ type: AUTH, data: {  profile: profile, token } });
                  
        //                 // history.push("/");
        //               } catch (error) {
        //                 console.log(error);
        //               }
        
        //       // history.push("/");
        //     } catch (error) {
        //       console.error('Error:', error);
        //     }
        //   }
      }, [token,dispatch]);


  
    const googleError = (error) =>{
        console.log(error)
        console.log("Google Sign In was unsuccessful. Try again later")
      // alert("Google Sign In was unsuccessful. Try again later");
    }
  const login = useGoogleLogin({
    onSuccess: googleSuccess,
    onFailure: googleError,
    scope: 'profile email',
  });

//   const handleButtonClick = () => {
//     signIn();
//   };

  

  return (
    <Button
      className={classes.googleButton}
      color="primary"
      fullWidth
      onClick={() => login()}
      variant="contained"
    >
      Google Sign In
    </Button>
  );
};

export default GoogleLoginButton;
