import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login';


function LoginCheck()
{


    if (sessionStorage.getItem("username") == null)
    {
   
      ReactDOM.render(<Login />, document.getElementById('content1'));

      return
    
    }
  
  


}

export default LoginCheck;