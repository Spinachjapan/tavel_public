import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import { animateScroll as scroll } from "react-scroll";
import AccountDetail from './AccountDetail';
import ArticlePhotoCheck from './ArticlePhotoCheck';
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import LoginState from './loginState';
import 'react-tabs/style/react-tabs.css';
import Login from './Login';
import SearchFromMap from './SearchFromMap';



function Filtrate(props)
    {



      ReactDOM.render("Home", document.getElementById('page_state'));


      const [article_list, setArticle] = useState(null);

      const [state, setState] = useState(null);
      const [area, setArea] = useState(null);
      const [restaurant, setRestaurant] = useState(null);
      const [hash_value, setHashValue] = useState(null);


  const [condition, setCondition] = useState(null)

  const [chosenLocation, setChosenLocation] = useState(null)

 

    useEffect(() => {

    
 
     obtain_articles(props.state, props.area, props.restaurant, props.hash_value)
 
 
 
    }, [])
 




  const obtain_articles = (y_state, y_area, y_restaurant, y_hash_value) =>
  {

    
  

    axios.post('/get_articles', 
    {
        state: y_state,
        area: y_area,
        restaurant: y_restaurant,
        hash_value: y_hash_value
      
    },
    { 
      xsrfHeaderName: "X-XSRF-TOKEN", 
      withCredentials: true
    }
  
    
    
    )
    .then(
      
    
      res => {

       

      setArticle(res.data);

    })
         
            
    .catch(error => {

        
        });



        if ((y_state != "" && y_state != null) || (y_area  != "" && y_area  !=null) || (y_restaurant  != "" && y_restaurant  !=null) || (y_hash_value != "" && y_hash_value  !=null))
        {



        var state_condition = null;
        var area_condition = null;
        var restaurant_condition = null;   
        var hash_value_condition = null;   
        
   
            
             if (y_state != null && y_state != "")
             {
                 

                 state_condition = <tr><td>State or Territory:&nbsp;&nbsp;</td><td className="orange_word">{y_state}</td></tr>

             }

             if (y_area != null && y_area != "")
             {
                 
                 area_condition = <tr><td>Area:</td><td className="orange_word">{y_area}</td></tr>

             }

             if (y_restaurant != null && y_restaurant != "")
             {
                 
                 restaurant_condition = <tr><td>Restaurant:</td><td className="orange_word">{y_restaurant}</td></tr>

             }
             if (y_hash_value != null && y_hash_value != "")
             {
                 
                 hash_value_condition = <tr><td>#:</td><td className="orange_word">{y_hash_value}</td></tr>

             }
           
         setCondition(


<table  className="fontsize5" align="left">
  <tbody>

           <tr>
           <td>
             SEARCH:
             </td>
             <td></td>
             </tr>
          
          {state_condition}
         { area_condition }
         {restaurant_condition}
         { hash_value_condition}

         </tbody>

         </table>)







         }



  }

     




     const target_article_button = () => {

        if ((state != "" && state != null) || (area != "" && area !=null) || (restaurant != "" && restaurant !=null) || (hash_value != "" && hash_value !=null))
        {

 
       obtain_articles(state, area, restaurant, hash_value)
      
        scroll.scrollToTop({duration: 500});
      }
      }


   const  all_article_button = () => {

        setCondition(null)
    obtain_articles(null, null, null, null)
        
      
        scroll.scrollToTop({duration: 500});

      }



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



      var stars = <label>{star_num_array.map((value, index) =>  
      
        <label key={index}>
       {star_check(value, star_value)}
        </label>
      
         )}</label>


         return stars;


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

 obtain_articles(null, null, null, null);
                  
})


.catch(error => {


 });




}














 const a_shown_article = (chosen_article) =>
 {

  

  let check_location = null;


  if (chosen_article.lat != null && chosen_article.lng != null)
  {

    check_location = <button className="no_dec_button fontsize5 orange_word" onClick={() => {setChosenLocation([chosen_article.lat, chosen_article.lng]),  scroll.scrollToTop({duration: 500})}}>Check Location</button>

  }


  let good_button = null;
  let good_array = [];

  if (chosen_article.good != null)
  {
    good_array = chosen_article.good.split(",");
  }


if (sessionStorage.getItem("username") == null)
{
  good_button = <button onClick={() =>  ReactDOM.render(<Login />, document.getElementById('content1'))} className="fontsize4 add_good">🤍{good_array.length}</button>
}

  

  if (sessionStorage.getItem("username") != null)
  {
    if (!good_array.includes(sessionStorage.getItem("username")))
{    
    good_button = <button onClick={() => good_function(chosen_article.article_id, "add")} className="fontsize4 add_good">🤍{good_array.length}</button>
}
else
{
  good_button = <button onClick={() => good_function(chosen_article.article_id, "remove")} className="fontsize4 remove_good">❤️{good_array.length}</button>

}


  }


  




 
 
 
 
 return (<dl>
  <hr/>　

  

<button style={{marginBottom: "20px"}} className="no_dec_button" name="someone_username" onClick={
() =>{ 


ReactDOM.render( <AccountDetail username={chosen_article.username}  />, document.getElementById('content1'));


}


}>

<img className="small_photo"
src={"photo_output_account/" + chosen_article.username + "/" + new Date}/>
<label className="username fontsize6">@{chosen_article.username}</label>
</button>


{ArticlePhotoCheck(chosen_article.article_id, chosen_article.photo_type1, chosen_article.photo_type2, chosen_article.photo_type3, chosen_article.photo_type4, chosen_article.photo_type5, chosen_article.photo_type6)}


<dd className="fontsize6"  style={{wordBreak: "break-word"}}>{chosen_article.note}</dd>

{
String(chosen_article.hash_value).split(",").map((value, index) => {

  if (chosen_article.hash_value == null)
  {
  return "";
  }
  else
  {
    return <span key={index}><button onClick={(event)=> {
      scroll.scrollToTop({duration: 500}),
      obtain_articles(null, null, null, event.target.value)}}   
      className="article_button fontsize6" value={value}>#{value}</button>&nbsp;</span>
  
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
<input onClick={(event)=> {

obtain_articles(event.target.value, null, null, null),
scroll.scrollToTop({duration: 500})
}}

className="article_button article_state_button" type="button"
value={chosen_article.state}/>
</td>

</tr>



<tr>

<td>
Area: 
</td>

<td>
<input onClick={(event)=> {
scroll.scrollToTop({duration: 500}),
obtain_articles(null, event.target.value, null, null)}}

className="article_button article_region_button" type="button"
value={chosen_article.area}/>

</td>

</tr>


<tr>

<td　valign="top">
Restaurant:&nbsp;&nbsp;
</td>

<td　valign="top">
<input onClick={(event)=> {
scroll.scrollToTop({duration: 500}),
obtain_articles(null, null, event.target.value, null)}}


className="article_button article_restaurant_button"
type="button" value={chosen_article.restaurant}/><br/>


</td>
</tr>


<tr>
<td　valign="top">Star:</td>

<td　valign="center">{output_stars(chosen_article.star)}</td>

</tr>



<tr>

<td　colSpan="2" align="center">
{check_location}

</td>

</tr>

</tbody>

</table>

<dd className="right">{good_button}</dd>



</dl>)



}




let map_for_location = null

if (chosenLocation != null)
{
  map_for_location =  <dl><LoadScript googleMapsApiKey={process.env.MIX_GOOGLE_MAP_API_KEY}>
  <GoogleMap
    mapContainerStyle={{
      width: "100%",
      height: "60vh",
    }}
    center={{lat: chosenLocation[0], lng: chosenLocation[1]}}
    zoom={13}   
  > 
  <Marker
     position={{lat: chosenLocation[0], lng: chosenLocation[1]}}
  >
  </Marker>


  </GoogleMap>
  
</LoadScript>
<dd className="right"><button onClick={()=>setChosenLocation(null)} className="delete_button fontsize4">CLOSE</button></dd>
</dl>

}





         if (article_list === null)
         {
           return <dd className="fontsize4 center"><progress max="100"></progress></dd>
         }

        

          

          return (


            <div> 



{LoginState()}



<table className="fontsize5" align="right">


<tbody>


<tr height="30px">

<td className="fontsize5">
State or Territory:&nbsp;&nbsp;
</td>

<td align="right">

<select name="state"  onChange={(e) => setState(e.target.value)}>

  <option value="">-</option>
  <option value="NSW">NSW</option>
  <option value="VIC">VIC</option>
  <option value="QLD">QLD</option>
  <option value="WA">WA</option>
  <option value="SA">SA</option>
  <option value="TAS">TAS</option>
  <option value="ACT">ACT</option>
  <option value="NT">NT</option>
</select>

</td>

</tr>


<tr height="40px">

<td>
Area:
</td>

<td align="right">
<input maxLength={35}  name="area" className="textfield fontsize4" type="text" onChange={(e) => setArea(e.target.value)}/>
</td>

</tr>


<tr height="40px">

<td>
Restaurant:
</td>

<td align="right">
<input maxLength={35} name="restaurant" className="textfield fontsize4" type="text" onChange={(e) => setRestaurant(e.target.value)}/>
</td>

</tr>

<tr height="40px">

<td>
#:
</td>


<td align="right">
<input maxLength={35} name="hash_value" className="textfield fontsize4" type="text" onChange={(e) => setHashValue(e.target.value)}/>
</td>
</tr>


<tr height="40px">
<td></td>
<td align="right">

<input onClick={target_article_button} type="button" value="SEARCH" className="orangebutton fontsize4"/>

</td>

</tr>

<tr height="40px">
<td></td>
<td align="right">

<input onClick={() =>  ReactDOM.render(<SearchFromMap />, document.getElementById('content1'))} type="button" value="SEARCH FROM MAP→" className="article_button article_restaurant_button"/>

</td>

</tr>


</tbody>


</table>


<table width="100%"></table>


{condition}

{map_for_location}
<table width="100%"></table>






<input onClick={all_article_button}  type="button" value="ALL ARTICLES" className="orangebutton fontsize4"/><dd  className="right fontsize4">{article_list.length + " articles"}</dd>{article_list.map((value, index) => (
   <span key={index}>
   {a_shown_article(value)}
</span>
 ))}



</div>




          );
        }
      

      export default Filtrate;


      ReactDOM.render(<Filtrate state={null} area={null} restaurant={null} hash_value={null} />, document.getElementById('content1'));
    
    
