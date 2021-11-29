import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { animateScroll as scroll } from "react-scroll";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ArticlePhotoCheck from './ArticlePhotoCheck';
import Edit from './Edit';
import Filtrate from './Filtrate';
import LoginState from './loginState';
import Login from './Login';






function AccountDetail(props)
    {



      var check_page_state = "@" + props.username

    

      ReactDOM.render(check_page_state, document.getElementById('page_state'));


      const [account_info, setAccountInfo] = useState(null)


      const obtain_articles = () =>
      {

        axios.post('/get_account_info', 
        {
            username: props.username,
     
        },{ 
          xsrfHeaderName: "X-XSRF-TOKEN", 
          withCredentials: true
        })
        .then(res => {


setAccountInfo(res.data)

                        
     })
   
     
   .catch(error => {
    
  
       });



      }





 

      useEffect(() => {

        obtain_articles()
            
      }, [props.username])











      const star_check = (num, star_value) =>
      {


        
        if (num <= star_value)
        {
          return <label className="yellow_word fontsize7">★</label>
        }
        else
        {
          return <label className="fontsize7">☆</label>

        }

      
      }







      const output_stars = (star_value) =>
      {

      


      var star_num_array = [1, 2, 3, 4, 5];



      var stars = <div>{star_num_array.map((value, index) =>  
      
        <label key={index}>
       {star_check(value, star_value)}
        </label>
      
         )}</div>


         return stars;




      }




      const edit_delete_right = (article_id) =>
      {

        if (sessionStorage.getItem('username') != null && sessionStorage.getItem('username') == props.username)
        {

      
       return (

          <dd className={{marginBottom: "20px"}}>  
          
          <button style={{width: "70px", marginBottom: "3px"}} onClick={() => { ReactDOM.render(<Edit article_id = {article_id}/>, document.getElementById('content1'));}}
          className="orangebutton fontsize4">EDIT</button>
<br/>
<button style={{width: "70px"}} onClick={() => delete_article(article_id) }
          className="delete_button fontsize4">DELETE</button>
          
          </dd>
          
          )

      }
      else
      {
        return null;
      }

    }



const good_function = (article_id, type) =>
{

  axios.post('/good_manage', 
  {
    type: type,
    user: sessionStorage.getItem("username"),
    article_id: article_id


  },{ 
    xsrfHeaderName: "X-XSRF-TOKEN", 
    withCredentials: true
  })
  .then(res => {

 obtain_articles();
                  
})


.catch(error => {


 });




}




    const good_button = (good_str, article_id) =>
    {

       let good_array = [];

        if (good_str != null)
        {
          good_array = good_str.split(",");
        }


      if (sessionStorage.getItem("username") == null)
      {
        return <button onClick={() =>  ReactDOM.render(<Login />, document.getElementById('content1'))} className="fontsize4 add_good">{good_array.length} good!</button>
      }
      else
      {
      

        if (good_array.includes(sessionStorage.getItem("username")))
        {
          return <button onClick={() => good_function(article_id, "remove")} className="fontsize4 remove_good">❤️{good_array.length}</button>

        }
        else
        {
          return <button onClick={() => good_function(article_id, "add")} className="fontsize4 add_good">🤍{good_array.length}</button>
        }





      }


    }


























    const delete_article = (article_id) =>
    {

      var delete_confirm = confirm("Will you delete this article?")

      if (delete_confirm == false)
      {
        return
      }



      axios.post('/delete_article', 
      {
          got_article_id: article_id,
   
      },{ 
        xsrfHeaderName: "X-XSRF-TOKEN", 
        withCredentials: true
      })
      .then(res => {


        alert("Article was deleted.")

 obtain_articles()

    
                      
   })
 
   
 .catch(error => {
  
   
 
     
     });


    


    }



























           if (account_info === null)
           {
            return <dd className="fontsize4 center"><progress max="100"></progress></dd>
           }



                
                const returned_taveler = account_info[0]
                const all_articles_array = account_info[1];
                const all_follower = account_info[2];
                const all_following_array = account_info[3];


                




                var good_count = 0;
                
                for (let i=0; i<all_articles_array.length; i++)
                {

                  if (all_articles_array[i]["good"] != null && all_articles_array[i]["good"] != "")
                  {
                   
                  let each_good_ary = all_articles_array[i]["good"].split(',');
                  good_count += each_good_ary.length;
                  }


                }

                let all_follower_array = [];

                if (all_follower != null)
                {
                  all_follower_array = all_follower.split(',');
                  
                }


                


              

            

       
           

               
                
              
              
    
    
                var taveler_name = "No Taveler Name";
                if (returned_taveler != null)
                {
                  taveler_name = returned_taveler;
                }



                const follow_function = (type) =>
                {




                  axios.post('/follow_manage', 
                  {
                    type: type,
                    following_user: sessionStorage.getItem("username"),
                    followed_user: props.username

               
                  },{ 
                    xsrfHeaderName: "X-XSRF-TOKEN", 
                    withCredentials: true
                  })
                  .then(res => {

                 obtain_articles();
                                  
               })
             
               
             .catch(error => {
              
            
                 });
          

                  


                }










                let follow_button = null;

                if (sessionStorage.getItem("username") != null && sessionStorage.getItem("username") != props.username)
                {


                  if (all_follower_array.includes(sessionStorage.getItem("username")))
                  {
                   follow_button = <button className="follower_ing fontsize5" onClick={()=> follow_function("unfollow")}>FOLLOWING</button>;
                   
                    }
                  else
                  {
                        follow_button = 
                    <button className="follower_ing fontsize5" onClick={()=> follow_function("follow")}>FOLLOW</button>
              
                  }


                }









           return( <div style={{marginTop: "40px"}}>
             
            <dl className="center">

            {LoginState()}

       

              

                <dd><img src={"photo_output_account/" + props.username + "/" + new Date} className="normal_photo"/></dd>




<table className="fontsize6" align="center">
<tbody>

<tr align="left">

<td>Username:</td>
   <td className="username">{"@" + props.username}</td>



   </tr>





  <tr align="left">

 <td>Taveler Name:&nbsp;&nbsp;</td>
    <td className="orange_word">{taveler_name}</td>


    </tr>

    <tr align="left">

 <td>Total good:&nbsp;&nbsp;</td>
    <td align="right" className="orange_word">{good_count}</td>

 



    </tr>



    </tbody>


          </table>   
          
        
 

  <div className="right">{follow_button}</div>



             

                





            </dl>

            <Tabs>
<TabList className="center">
  <Tab>{"ARTICLES: " + all_articles_array.length}</Tab>
  <Tab>{"FOLLOWERS: " + all_follower_array.length}</Tab>
  <Tab>{"FOLLOWING: " + all_following_array.length}</Tab>
</TabList>

<TabPanel>

<div>{all_articles_array.map((value, index) =>  (<dl key={index}>
        <hr/>　




<img className="small_photo"
src={"photo_output_account/" + props.username + "/" + new Date}/>

<label style={{marginBottom: "20px"}} className="username fontsize6">@{value.username}</label>

{edit_delete_right(value.article_id)}





{ArticlePhotoCheck(value.article_id, value.photo_type1, value.photo_type2, value.photo_type3, value.photo_type4, value.photo_type5, value.photo_type6)}






<dd className="fontsize6"  style={{wordBreak: "break-word"}}>{value.note}</dd>

{
String(value.hash_value).split(",").map((item, index) => {

  if (value.hash_value == null)
  {
  return "";
  }
  else
  {
    return <span key={index}><button onClick={(event)=> 
      ReactDOM.render(<Filtrate state={null} area={null} restaurant={null} hash_value={event.target.value}  />, document.getElementById('content1'))}
      className="article_button fontsize6" value={item}>#{item}</button>&nbsp;</span>
  
  }

}
)}




<table align="center" className="fontsize6-5">

<tbody>

<tr>
  
  <td>
  State: 
  </td>
  
  <td>
  <input onClick={(event)=> 

ReactDOM.render(<Filtrate state={event.target.value} area={null} restaurant={null} hash_value={null}
/>, document.getElementById('content1'))

} className="article_button article_state_button" type="button"
value={value.state}/>
</td>

</tr>



<tr>
  
  <td>
  Area: 
  </td>
  
  <td>
  <input onClick={(event)=> 
ReactDOM.render(<Filtrate state={null} area={event.target.value} restaurant={null} hash_value={null}  />, document.getElementById('content1'))

} className="article_button article_state_button" type="button"
value={value.area}/>

</td>

</tr>


<tr>
  
<td　valign="top">
  Restaurant:&nbsp;&nbsp;
  </td>
  
  <td　valign="top">
  <input onClick={(event)=>

ReactDOM.render(<Filtrate state={null} area={null} restaurant={event.target.value} hash_value={null} />, document.getElementById('content1'))

}  className="article_button article_restaurant_button"
type="button" value={value.restaurant}/><br/>
</td>
</tr>


<tr>
<td　valign="top">Star:</td>

<td　valign="center">{output_stars(value.star)}</td>


</tr>

</tbody>

</table>


<dd className="right">{good_button(value.good, value.article_id)}</dd>



     
</dl> ))}</div>



</TabPanel>
<TabPanel>

<div>{all_follower_array.map((value, index) =>  

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


<TabPanel>

<div>{all_following_array.map((value, index) =>  

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





            </div>)
           







      
      
     
      }

      export default AccountDetail;

  
