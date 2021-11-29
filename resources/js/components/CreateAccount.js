import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Filtrate from './Filtrate';
import AccountDetail from './AccountDetail';






function CreateAccount(props)


    { 
      
      ReactDOM.render("Create New Tavel Account", document.getElementById('page_state'));
  

      const [new_account_id, setNewAccountId] = useState(null)
      const [new_username, setNewUsername] = useState(null)
      const [username_error, setUsernameError] = useState(null)
      const [username_available, setUsernameAvailable] = useState(null)


    





        const  check_username = (event) => {


         
            let new_username = event.target.value;     
            if (new_username.length < 7)
            {
                setUsernameAvailable(null)
                setUsernameError("User name must be more than 7 letters.");
              setNewUsername(null);
                
            }
            else if (new_username.match(/\W/))
            {

              setUsernameAvailable(null)
              setUsernameError("You can use a ~ z, 0 ~ 9 and Underscore(_).");
              setNewUsername(null);

                

            }
            else
            {
                axios.post('/check_username', 
                {
                    new_username: new_username 
             
                },{ 
                  xsrfHeaderName: "X-XSRF-TOKEN", 
                  withCredentials: true
                })
                .then(res => {
           
                 const check_username_result = res.data;
           
                 
               if (check_username_result == true)
               {
                setUsernameAvailable(null)
                setUsernameError("This username has been taken already.");
                setNewUsername(null);
        

           
               }
               else
               {
           

                setUsernameAvailable("This user name is available.")
                setUsernameError(null);
                setNewUsername(new_username);


               

               }

            
                                
             })
           
             
           .catch(error => {
            
   
           
               
               });
           

            



        }
            


          }




       const create_account = () =>
        {

          var confirm_create_account = confirm("Username is @" + new_username + "." + "\r\n"
          + "Will you create your tavel account?")

          if (confirm_create_account == false)
          {
            return
          }
          else
          {



            axios.post('/create_account', 
            {
                new_account_id: props.account_id,
                new_username: new_username
         
            },{ 
              xsrfHeaderName: "X-XSRF-TOKEN", 
              withCredentials: true
            })
            .then(res => {



                sessionStorage.setItem('username', new_username);
                ReactDOM.render(<AccountDetail username={sessionStorage.getItem('username')}/>, document.getElementById('content1'));
                
          
             
        
                            
         })
       
         
       .catch(error => {
        
       
  
       
           
           });

          }

        }








 
          var  send_button = <input  type="button" value="Create Account" className="orangebutton fontsize5" disabled/>;
          
            if (username_error == null && username_available != null)
            {
                 send_button = <input  onClick={create_account}  type="button" value="Create Account" className="orangebutton fontsize5"/>;

            }
         
               
            
         
           
              
            return (

                <dl className="center" style={{marginTop: "40px"}}>

<dd className="right"><button onClick={() =>  ReactDOM.render(<Filtrate state={null} area={null} restaurant={null} hash_value={null}/>, document.getElementById('content1'))} className="delete_button fontsize5">CANCEL</button></dd>

                    <dt className="fontsize6">Decide Your Username:</dt>
        <dd>{"@"}<input onChange={check_username} maxLength={20} className="textfield fontsize5" type="text" name="new_username"/></dd>
       
        <dd style={{marginBottom: "50px"}}><label className="red_word fontsize4">{username_error}</label><label className="green_word fontsize4">{username_available}</label></dd>

       
               <dd>{send_button}</dd>
               
               
                </dl>





            )

        
      }

      export default CreateAccount;

     






