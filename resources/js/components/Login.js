import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import { animateScroll as scroll } from "react-scroll";
import GoogleLogin from 'react-google-login';
import CreateAccount from './CreateAccount';
import AccountDetail from './AccountDetail';
import LoginState from './loginState';
import {
  LoginSocialFacebook,
  // LoginSocialGoogle,
  // LoginSocialGithub,
  // LoginSocialAmazon,
  // LoginSocialLinkedin,
  // LoginSocialInstagram,
  // LoginSocialMicrosoft,
 } from "reactjs-social-login";




function Login() 
    {


      ReactDOM.render("Login・Sign up", document.getElementById('page_state'));





     const check_google_account = (response)=>{

      check_account(response.profileObj.googleId, "google")
        
      } 

   

      const check_account = (account_id, sort) =>
      {


        axios.post('/check_account', 
        {
            got_account_id: sort + account_id,
     
        },{ 
          xsrfHeaderName: "X-XSRF-TOKEN", 
          withCredentials: true
        })
        .then(res => {
   
         
   
         const check_account_result = res.data;
   
   
         
       if (check_account_result == false)
       {
         ReactDOM.render(<CreateAccount account_id = {sort+account_id} />, document.getElementById('content1'));
   
       return;
   
       }
       else
       {
        
              sessionStorage.setItem('username', check_account_result);
              ReactDOM.render(<AccountDetail username={sessionStorage.getItem('username')}/>, document.getElementById('content1'));
   
                   return;
   
   
       }
    
                        
     })
   
     
   .catch(error => {
  
   
     return;
       
       });
   








      }




      
      
      



    
      











          return(
<div className="center" style={{marginTop:"40px"}}>

{LoginState()}


  <GoogleLogin
  
  clientId={process.env.MIX_GOOGLE_LOGIN_APP_ID}
  buttonText="Login with google account"
  onSuccess={check_google_account}
  onFailure={check_google_account}
  cookiePolicy={"single_host_origin"}

/>






<div style={{marginTop: "30px"}}>

   <LoginSocialFacebook 
 
    appId={process.env.MIX_FACEBOOK_LOGIN_APP_ID}

    onResolve={({ data }) => {
     check_account(data.userID, "facebook");

    }}
    onReject=""
    className={'storybook-button storybook-button--primary'}
    
   >

     <span>Login with facebook account</span>
 
   </LoginSocialFacebook>
   </div>
   
   


   </div>)



        
      }

export default Login;
    
