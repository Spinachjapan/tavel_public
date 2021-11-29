import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import { animateScroll as scroll } from "react-scroll";
import AccountDetail from './AccountDetail';
import ArticlePhotoCheck from './ArticlePhotoCheck';
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import LoginState from './loginState';
import 'react-tabs/style/react-tabs.css';
import Login from './Login';
import Filtrate from './Filtrate';



function SearchFromMap()
    {


      ReactDOM.render("Search on Map", document.getElementById('page_state'));


      const [article_list, setArticle] = useState(null);



      const [markers, setMarkers] = React.useState([]);
     
     
      const [location, setLocation] = useState("")
     
      const [center, setCenter] = useState({
       lat: -23.6980,
       lng: 133.8807,
     
     })
     
       const [totalStar, setTotalStar] = useState(null)
     
       const [restaurantName, setRestaurantName] = useState(null)
     
       const [chosenArticle, setChosenArticle] = useState(null)
     






      useEffect(() => {
        if (markers.length == 0)
        {
    
        axios.post('/get_all_positions', null, { 
          xsrfHeaderName: "X-XSRF-TOKEN", 
          withCredentials: true
        })
        .then(
          
          res => {
          
            setMarkers(res.data)
    
    
        
        })
             
                
        .catch(error => {
    
            
            });
    
          }
    
       }, [])

      

  

     

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







const geocode = () => {


  const geocoder = new window.google.maps.Geocoder();
  geocoder.geocode({ address: location }, ( results, status ) => {
    if (status === 'OK') {
    
      let new_center = Object.assign({}, center);
      new_center = {
        lat: results[0].geometry.location.lat(), 
        lng: results[0].geometry.location.lng()
      };
  
      setCenter(new_center)
  
  
  
    }
  });
  }


  const get_restaurant_info = (got_lat, got_lng) =>
{

  

    axios.post('/get_restraurant_info',
    {
        lat: got_lat,
        lng: got_lng
    },{ 
      xsrfHeaderName: "X-XSRF-TOKEN", 
      withCredentials: true
    }
    )
    .then(
      
      res => {

        setArticle(res.data[0])
 
        setTotalStar(res.data[1])

       setRestaurantName(res.data[2])

    })
         
            
    .catch(error => {

        
        });


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

                  
})


.catch(error => {


 });




}














 const a_shown_article = (chosen_article) =>
 {



  let good_button = null;
  let good_array = [];

  if (chosen_article.good != null)
  {
    good_array = chosen_article.good.split(",");
  }


if (sessionStorage.getItem("username") == null)
{
  good_button = <button onClick={() =>  ReactDOM.render(<Login />, document.getElementById('content1'))} className="fontsize4 add_good">{good_array.length} good!</button>
}

  

  if (sessionStorage.getItem("username") != null)
  {
    if (!good_array.includes(sessionStorage.getItem("username")))
{    
    good_button = <button onClick={() => good_function(chosen_article.article_id, "add")} className="fontsize4 add_good">{good_array.length} good!</button>
}
else
{
  good_button = <button onClick={() => good_function(chosen_article.article_id, "remove")} className="fontsize4 remove_good">{good_array.length} good!</button>

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
    return <span key={index}><button onClick={(event)=> 
      ReactDOM.render(<Filtrate state={null} area={null} restaurant={null} hash_value={event.target.value} />, document.getElementById('content1'))
    }   
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
<input onClick={(event)=> 

ReactDOM.render(<Filtrate state={event.target.value} area={null} restaurant={null} hash_value={null} />, document.getElementById('content1'))

}

className="article_button article_state_button" type="button"
value={chosen_article.state}/>
</td>

</tr>



<tr>

<td>
Area: 
</td>

<td>
<input onClick={(event)=> 

ReactDOM.render(<Filtrate state={null} area={event.target.value} restaurant={null} hash_value={null} />, document.getElementById('content1'))
}

className="article_button article_region_button" type="button"
value={chosen_article.area}/>

</td>

</tr>


<tr>

<td　valign="top">
Restaurant:&nbsp;&nbsp;
</td>

<td　valign="top">
<input onClick={(event)=> 

ReactDOM.render(<Filtrate state={null} area={null} restaurant={event.target.value} hash_value={null} />, document.getElementById('content1'))
}


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

</td>

</tr>

</tbody>

</table>

<dd className="right">{good_button}</dd>



</dl>)



}

var chosen_article = null

if (chosenArticle != null)
{
  chosen_article = a_shown_article(chosenArticle)
}






var show_restaurant_info = null

if (totalStar != null)
{
  show_restaurant_info = 
  <div>
  
  <h3 className="center">{restaurantName}</h3>
        

<h5 className="right">
Total star:&nbsp;&nbsp;
       
    {totalStar}&nbsp;&nbsp;
 
 Average:&nbsp;&nbsp;<label className="yellow_word">★</label>
 
{totalStar/article_list.length}

</h5>

<div style={{height: "260px", overflow: "scroll"}}>
<dd  className="right fontsize4">{article_list.length + " article(s)"}</dd>{article_list.map((value, index) =>  (<span onClick={() => setChosenArticle(value)} key={index}> 

  {ArticlePhotoCheck(value.article_id, value.photo_type1, value.photo_type2, value.photo_type3, value.photo_type4, value.photo_type5, value.photo_type6, true)}


</span>))}

</div>


{chosen_article}

    
    </div>
}













          

          return (


            <div> 



{LoginState()}





<dt className="fontsize5 left">Input LocationName:</dt>
<dd><input placeholder="◯◯◯◯◯ Sydney NSW" maxLength={150} style={{width: "100%"}} onChange={(e) => setLocation(e.target.value)}  className="fontsize4 textfield" type='text' value={location}/></dd>
<dd className="right"><button onClick={geocode} className="orangebutton fontsize4">SEARCH</button></dd>


<LoadScript googleMapsApiKey={process.env.MIX_GOOGLE_MAP_API_KEY}>
    <GoogleMap
      mapContainerStyle={{
        width: "100%",
        height: "60vh",
      }}
      center={center}
      zoom={4}
     
    >
     {markers.map((marker, index) => (
         
    <Marker
       key={index}
       position={{lat: marker.lat, lng: marker.lng}}
       onClick={() => get_restaurant_info(marker.lat, marker.lng)}
    >
    </Marker>
 ))}


    </GoogleMap>
  </LoadScript>

  {show_restaurant_info}














</div>




          );
        }
      

      export default SearchFromMap;


    
    
