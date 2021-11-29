import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import 'react-tabs/style/react-tabs.css';
import Filtrate from './Filtrate';
import LoginCheck from './LoginCheck';
import LoginState from './loginState';




function SetAccount()
{


  LoginCheck()



  ReactDOM.render("Account Setting Of @" + sessionStorage.getItem("username"), document.getElementById('page_state'));

  

    const [new_taveler, setNewTaveler] = useState(null)
    const [taveler_error, setTavelerError] = useState(null)
    const [taveler_available, setTavelerAvailable] = useState(null)



    const [account_photo, setAccountPhoto] = useState(null)

    const [taveler, setTaveler] = useState(null)


    const [date, setDate] = useState(null)


    const [delete_username, setDeleteUsername] = useState(null)
    const [delete_username_error, setDeleteUsernameError] = useState(null)




    const [delete_word, setDeleteWord] = useState(null)
    const [delete_word_error, setDeleteWordError] = useState(null)












    useEffect(() => {




    axios.post('/get_taveler', 
    {
        username: sessionStorage.getItem('username')
    
    },{ 
      xsrfHeaderName: "X-XSRF-TOKEN", 
      withCredentials: true
    }
     
    
    )
    .then(
      
    
      res => {
       
   

      setTaveler(res.data);

    })
         
            
    .catch(error => {
     
   
        
        });
        
        
        }, [])









        const change_photo = (e) =>
        {
          
     
    
       
        
    
          const file = e.target.files[0]
    
     
          
              var reader = new FileReader()
              reader.onload = (e) => {
    
               //photo_array.push([e.target.result, file.type])
      
                //  setPhotos(photo_ array)

                setAccountPhoto([e.target.result, file.type])

             
          
      
              };
              reader.readAsDataURL(file)
    
    
            
    
        
    
     
          }



          const send_changed_photo = () =>
          {

            var confirm_change_photo = confirm("Will you change your profile photo?")

            if (confirm_change_photo == false)
            {
              return
            }
            


            axios.post('/send_changed_profile_photo', 
            {
                username: sessionStorage.getItem('username'),
                changed_profile_photo: account_photo
            
            },{ 
              xsrfHeaderName: "X-XSRF-TOKEN", 
              withCredentials: true
            }
             
            
            )
            .then(
              
            
              res => {


                alert("Your profile photo was updated.")
               
        
           
        
            })
                 
                    
            .catch(error => {
             
       
                
                });

   

       

         
                

          }






            const  check_taveler = (event) => {


         
                let input_taveler = event.target.value;     
                if (input_taveler.length == 0)
                {
                    setTavelerAvailable(null)
                    setTavelerError("Please input taveler name.");
                  setNewTaveler(null);
                    
                }
                else if (input_taveler.trim().length == 0)
                {

                    setTavelerAvailable(null)
                    setTavelerError("Please input at least 1 letter besides space.");
                  setNewTaveler(null);
                    

                }
                else
                {
           

           
               
    
                    setTavelerAvailable("This taveler name is available.")
                    setTavelerError(null);
                    setNewTaveler(input_taveler);
    
                }
    
                
                
    
    
    
            }
                
    
    
              











              const change_taveler = () =>
              {

                var confirm_change_taveler = confirm('Will you change your taveler name to "' + new_taveler + "'?")

                if (confirm_change_taveler == false)
                {
                  return
                }




                axios.post('/change_taveler', 
                {
                    username: sessionStorage.getItem("username"),
                    new_taveler: new_taveler 
             
                },{ 
                  xsrfHeaderName: "X-XSRF-TOKEN", 
                  withCredentials: true
                })
                .then(res => {
           
           
                 
               alert("Your taveler name was updated.")
                                
             })
           
             
           .catch(error => {
            
          
           
               
               });










              }








              const  check_delete_username = (event) => {


         
                let input_delete_username = event.target.value;     
                if (input_delete_username != sessionStorage.getItem("username"))
                {
                    setDeleteUsername(false)
                    setDeleteUsernameError("Please input your username correctly.")
                  
            
                    
                }
        
                else
                {
           

                    setDeleteUsername(true)
                    setDeleteUsernameError(null)
               
                   
    
                }
    
                
                  
            }







            const  check_delete_word = (event) => {


         
                let input_delete_word = event.target.value;     
        
                if (input_delete_word != "delete account")
                {        
               

                    setDeleteWord(false)
                    setDeleteWordError('Please input "delete account".')

                    
                }
        
                else 
                {
           
                    setDeleteWord(true)
                    setDeleteWordError(null)
                    
       
    
                }
    
                
                  
            }




            const delete_account = () =>
            {

              var confirm_delete_account = confirm("Will you delete your account?")

              if (confirm_delete_account == false)
              {
                return
              }


                axios.post('/delete_account', 
                {
                    username: sessionStorage.getItem("username"),
             
                },{ 
                  xsrfHeaderName: "X-XSRF-TOKEN", 
                  withCredentials: true
                })
                .then(res => {


                    sessionStorage.removeItem("username")

                    ReactDOM.render(<Filtrate  state={null} area={null} restaurant={null} hash_value={null} />, document.getElementById('content1'));
           
           
                 
              
                                
             })
           
             
           .catch(error => {
            
            
           
               
               });









            }
                
    
    












































          var send_changed_photo_button =  <input className="change_profile_photo fontsize5" type="button" name="change_photo" value="No photo is input." disabled/>

var show_profile_photo = <img src={"photo_output_account/" + sessionStorage.getItem('username') + "/" + new Date} className="normal_photo" id="chosenImage1"/>



          if (account_photo != null)
          {
            send_changed_photo_button =  <input onClick={send_changed_photo} className="orangebutton change_profile_photo fontsize5" type="button" name="change_photo" value="CHANGE PROFILE PHOTO"/>
            show_profile_photo = <img src={account_photo[0]} className="normal_photo" id="chosenImage1"/>
          }






          var  send_changed_taveler_button = <input  type="button" value="Change Taveler Name" className="fontsize5" disabled/>;
          
          if (taveler_error == null && taveler_available != null)
          {
            send_changed_taveler_button = <input  onClick={change_taveler}  type="button" value="Change Taveler Name" className="orangebutton fontsize5"/>;

          }


          var delete_account_button = <input className="fontsize5" type="button" name="delete" value="DELETE ACCOUNT" disabled/> 

          if (delete_username == true && delete_username_error == null && delete_word == true && delete_word_error == null)
          {
            delete_account_button = <input onClick={delete_account} className="delete_button fontsize5" type="button" name="delete" value="DELETE ACCOUNT"/> 
          }

























          








        return( <dl className="center" style={{marginTop:"40px"}}>   


{LoginState()}
  

          

        
            <dt className="fontsize6">Taveler Name: </dt>
          

          
          <dd><input onChange={check_taveler} maxLength={20} defaultValue={taveler} className="textfield fontsize5" type="text" name="new_username"/></dd>
       
        


             <dd>{send_changed_taveler_button}</dd>

      

              <dd style={{marginBottom: "50px"}}><label className="red_word fontsize4">{taveler_error}</label><label className="green_word fontsize4">{taveler_available}</label></dd>

          



            
            
           
            
            <dt className="fontsize6">Click the photo to change</dt>
                    
                     <dd>
                     <label>
                     {show_profile_photo}
              <input accept="image/*"  id="target1" type="file" onChange={change_photo} name="new_profile_photo" className="filesend new_profile_photo"/>
              </label>
              </dd>
            
              <dd id="new_photo_error"></dd>

              {send_changed_photo_button}


       
       


       
              




         <dt style={{marginTop: "80px"}} className="fontsize6-5">Delete Your Account?</dt>



               <dt className="fontsize6">1. Input your username.</dt>
            <dd style={{marginRight: "12px"}}>{"@"}<input maxLength={20} onChange={check_delete_username} className="confirm_text_tf textfield fontsize5" type="text" name="confirm_text"/></dd>
            <dd style={{marginBottom: "10px"}}><label className="red_word fontsize4"> {delete_username_error}</label></dd>




               <dt className="fontsize6">2. Input "<label className="red">delete account</label>" </dt>
            <dd><input onChange={check_delete_word} maxLength={14}  className="confirm_text_tf textfield fontsize5" type="text" name="confirm_text"/></dd>
            <dd style={{marginBottom: "10px"}}><label className="red_word fontsize4"> {delete_word_error}</label></dd>
           
       
       <dd>{delete_account_button}</dd>

  
 
            
            
            
             
            
            
          

              </dl>)













}

export default SetAccount;
