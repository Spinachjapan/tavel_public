import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import 'react-tabs/style/react-tabs.css';
import Filtrate from './Filtrate';
import LoginCheck from './LoginCheck';
import LoginState from './loginState';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import AccountDetail from './AccountDetail';




function SearchTaveler()
{



  ReactDOM.render("Search Taveler", document.getElementById('page_state'));



  const [username, setUsername] = useState(null);

  const [result, setResult] = useState(null);


  const search_taveler = () =>
  {
    axios.post('/search_username', 
    {
       username: username
      
    },{ 
                    xsrfHeaderName: "X-XSRF-TOKEN", 
                    withCredentials: true
                  }
    
    )
    .then(
      
    
      res => {

      setResult(res.data);
      

    })
         
            
    .catch(error => {

        
        });

  }

  let found_usernames = null;

  if (result != null)
  {  

    let match = "No Matching User";

  if (result[1].includes(result[0]))
  {
      match = (<button className="no_dec_button" name="someone_username"

      onClick={
        () =>{   
        ReactDOM.render( <AccountDetail username={result[0]}  />, document.getElementById('content1'));       
        }
      }  
      >
      
      <img className="small_photo" src={"photo_output_account/" + result[0] + "/" + new Date}/>
      
      <label className="username fontsize6">@{result[0]}</label>
      </button>)
  }




      found_usernames = (

        <div style={{marginTop: "30px"}}>
            <dd className="fontsize6">USERNAME: <span className="orange_word">{result[0]}</span></dd>

        <Tabs>
        <TabList className="center">
          <Tab>MATCH</Tab>
          <Tab>{"INCLUDE: " + result[1].length}</Tab>
          
        </TabList>
        
        <TabPanel>

            {match}
            </TabPanel>

            <TabPanel>

            <div>{result[1].map((value, index) =>  

<dd key={index}>
<button className="no_dec_button" name="someone_username" value={value}

onClick={
  () =>{ 
  
  
  ReactDOM.render( <AccountDetail username={value}  />, document.getElementById('content1'));
  
  
  }
}

>

<img className="small_photo" src={"photo_output_account/" + value + "/" + new Date}/>

<label className="username fontsize6">@{value}</label>
</button>
</dd>


)}
</div>

</TabPanel>

</Tabs>

</div>




      )

  }











        return( 



<div className="center">

{LoginState()}


<table align="center" style={{marginTop: "40px"}}>
    <tbody>
        <tr>
        <td>

<dt className="fontsize5">Username: </dt>
</td>

<td align="right">

@<input maxLength={35}  name="username" className="textfield fontsize4" type="text" onChange={(e) => setUsername(e.target.value)}/>
<input  type="button" value="SEARCH" className="orangebutton fontsize4" onClick={() => search_taveler()}/>
</td>

        </tr>


    </tbody>



</table>


{found_usernames}





</div>



        )













}

export default SearchTaveler;
