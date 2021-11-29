import React from 'react';
import ReactDOM from 'react-dom';
import AccountDetail from './AccountDetail';
import Filtrate from './Filtrate';
import Post from './Post';
import Login from './Login';
import SetAccount from './SetAccount';
import SearchTaveler from './SearchTaveler';


function LoginState()
{



    const logout = () =>
    {
     var logout_confirm = confirm("Will you logout?")

     if (logout_confirm == true)
     {
         sessionStorage.removeItem("username")

         ReactDOM.render(<Filtrate state={null} area={null} restaurant={null} hash_value={null} />, document.getElementById('content1'));



     }




    }








    var returned_data = null



    if (sessionStorage.getItem("username") != null)
    {
        returned_data = <div className="dropdown right">
        <button className="btn dropdown-toggle fontsize5 username" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {"@" + sessionStorage.getItem("username")}
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <dd><button  onClick={ () =>  ReactDOM.render(<Filtrate state={null} area={null} restaurant={null} hash_value={null} />, document.getElementById('content1'))}   className="no_dec_button">HOME</button></dd> 
        <dd><button  onClick={ () =>  ReactDOM.render(<SearchTaveler />, document.getElementById('content1'))}   className="no_dec_button">SEARCH TAVELER</button></dd> 
      <dd><button  onClick={ () => ReactDOM.render(<AccountDetail username={sessionStorage.getItem('username')}/>, document.getElementById('content1'))}   className="no_dec_button">MY PAGE</button></dd>
       <dd> <button  onClick={ () => ReactDOM.render(<Post />, document.getElementById('content1'))}  className="no_dec_button">POST</button></dd>
     <dd>   <button  onClick={ () => {ReactDOM.render(<SetAccount />, document.getElementById('content1'))}}  className="no_dec_button">SETTING</button></dd>
     <dd><button  onClick={ () =>  ReactDOM.render(<Login />, document.getElementById('content1'))}  className="no_dec_button">SWITCH ACCOUNT</button></dd>
      <dd>  <button  onClick={logout}  className="no_dec_button">LOGOUT</button></dd>
        </div>
      </div>

    }
    else
    {

        returned_data =  <div className="dropdown right">
        <button className="btn dropdown-toggle fontsize5 username" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Guest
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <dd><button  onClick={ () =>  ReactDOM.render(<Filtrate state={null} area={null} restaurant={null} hash_value={null} />, document.getElementById('content1'))}   className="no_dec_button">HOME</button></dd> 
        <dd><button  onClick={ () =>  ReactDOM.render(<SearchTaveler />, document.getElementById('content1'))}   className="no_dec_button">SEARCH TAVELER</button></dd> 
        <dd><button  onClick={ () =>  ReactDOM.render(<Login />, document.getElementById('content1'))}  className="no_dec_button">LOGIN・SIGN UP</button></dd>
     
        </div>
      </div>






    }


    return returned_data






}

export default LoginState;