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
    //  
    };
    useEffect( () => {
        if (token) {
        

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
       
      }, [token,dispatch]);


  
    const googleError = (error) =>{
        console.log(error)
        console.log("Google Sign In was unsuccessful. Try again later")
      
    }
  const login = useGoogleLogin({
    onSuccess: googleSuccess,
    onFailure: googleError,
    scope: 'profile email',
  });



  

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
