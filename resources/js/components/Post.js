import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import AccountDetail from './AccountDetail';
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { set } from 'lodash';
import LoginState from './loginState';
import LoginCheck from './LoginCheck';








function Post()
    {

    
  
      LoginCheck()

      ReactDOM.render("Post", document.getElementById('page_state'));




const [restaurant, setRestaurant] = useState(null);
      const [state, setState] = useState("NSW");
      const [area, setArea] = useState(null);     
      const [note, setNote] = useState(null);

      const [photos, setPhotos] = useState([]);

      const [date, setDate] = useState(null);

      const [star, setStar] = useState(1);


      const [markers, setMarkers] = useState([]);


      const [location, setLocation] = useState("")
     
      const [center, setCenter] = useState({
        lat: -23.6980,
        lng: 133.8807,
     })

      const [Lat, setLat] = useState(null)
      const [Lng, setLng] = useState(null)


      const [hashValue, setHashValue] = useState([]);

      const [tempHash, setTempHash] = useState("")



      const [loading, setLoading] = useState(false)

      
    
     
   

   


      

    



          


    



   const post_article = () =>
    {

      var confirm_post = confirm("Will you post this article?")

      if (confirm_post == false)
      {
        return
      }
   
    
        setLoading(true)
                   

        axios.post('/post_article', 
            {

                username: sessionStorage.getItem('username'),
                restaurant: restaurant,
                state: state,
                area: area,
                note: note,
                hash_value: hashValue,
                star: star,
                lat: Lat,
                lng: Lng,
                photos: photos,
                
         
               
 
            },{ 
              xsrfHeaderName: "X-XSRF-TOKEN", 
              withCredentials: true
            })
            .then(res => {


                ReactDOM.render(<AccountDetail  username={sessionStorage.getItem("username")} />, document.getElementById('content1'));
          
        
                            
         })
       
         
       .catch(error => {

        setLoading(false)
        
 
       
           
           });


    }






    const add_photo = (e) =>
    {
      
   

      if (photos.length < 6)

      {
      var photo_array = photos

      const file = e.target.files[0]

 
      
          var reader = new FileReader()
          reader.onload = (e) => {

           photo_array.push([e.target.result, file.type])
  
              setPhotos(photo_array)
      setDate(new Date)
  
          };
          reader.readAsDataURL(file)

         var obj = document.getElementById("target1");
          obj.value = "";

        }

    

 
      }






     const delete_photo = (e) =>
      {
        var photo_array = photos
  
        photo_array.splice(e.target.value, 1)
  
        setPhotos(photo_array)

        setDate(new Date)
  
  
      }




      const star_check = (num) =>
      {
        if (num <= star)
        {
          return <button onClick={(e) => setStar(e.target.value)} value={num} className="no_dec_button yellow_word fontsize6-5">★</button>
        }
        else
        {
          return <button onClick={(e) => setStar(e.target.value)} value={num} className="no_dec_button fontsize6-5">☆</button>

        }

      }


      const cancel_post = () =>
      {

        var confirm_cancel_post = confirm("Will you cancel posting?")

        if (confirm_cancel_post == false)
        {
          return
        }

        ReactDOM.render(<AccountDetail username={sessionStorage.getItem('username')}/>, document.getElementById('content1'))



      }




      


  
 



    





    





    var add_photo_button = (<label>
 
  
      <label style={{borderRadius: "30px",}} className="orangebutton fontsize5" htmlFor="target1">+|Add New Photo</label>
                       <input accept="image/*" onChange={                         
                           add_photo
                       } type="file" name="photo1" className="filesend" id="target1"/>
       
              </label>  )


if (photos.length >5)
{
add_photo_button = "You can input up 6 photos."
}
         
        
          
            




var post_button = (<button className="fontsize5 orangebutton" onClick={post_article}>Post</button>)

if (photos.length == 0)
{

  post_button = <label className="red_word fontsize5">Please input at least 1 photo.</label>

}







var img_bunch = null

if (photos.length > 0)
{

img_bunch = <div>
             
{photos.map((value, index) => (
  
<label key={index} style={{marginRight: "5px"}}>
<dd><img src={value[0]} className="big_photo"/></dd>
<dd><button className="delete_button fontsize4" value={index} onClick={delete_photo}>delete</button></dd>
</label>
))

}
</div>
}














var star_num_array = [1, 2, 3, 4, 5];



var star_buttons = <div>{star_num_array.map((value, index) =>  

  <label key={index}>
 {star_check(value)}
  </label>

   )}</div>













  const onMapClick = (event) => {
    
    setMarkers([{
       lat: event.latLng.lat(),
       lng: event.latLng.lng(),
    }]);
    setLat(event.latLng.lat())
    setLng(event.latLng.lng())

  //   setCenter({
  //     lat: event.latLng.lat(),
  //     lng: event.latLng.lng(),
  //  })
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

      setMarkers([new_center]);
      setCenter(new_center)

      setLat(results[0].geometry.location.lat())
      setLng(results[0].geometry.location.lng())

     



    }
  });
}

const delete_position = () =>
{
  setMarkers([])
  setLat(null)
  setLng(null)
}



var delete_position_button = <dd className="fontsize4 red_word">Location is not selected.</dd>

if (Lat != null && Lng != null)
{
  delete_position_button = <button onClick={delete_position} className="delete_button fontsize4">delete location</button>
}


const add_hash_value = () =>
{

    if (tempHash == "")
    {
        return;
    }

    if (tempHash.match(/\W/))
    {
     

    }


    var hash_value_array = hashValue


    if (hash_value_array.length >= 20)
    { 
       alert("You can input up to 20 hash tags.");
        return; 
    }

    var hash_value_txf = document.getElementById("hash_value_txf");
    hash_value_txf .value = "";





    hash_value_array.push(tempHash)

    setHashValue(hash_value_array)

    setDate(new Date)

}





var hash_values = null

if (hashValue.length != 0)
{
    hash_values = <span>{hashValue.map((value, index) => (<label className="orange_word fontsize4" key={index}>#{value}<button className="no_dec_button " value={index} onClick={(e) => delete_hash_value(e)}>✕</button></label>))}</span>

}


const delete_hash_value = (e) =>
{

  var hash_value_array = hashValue

  hash_value_array.splice(e.target.value, 1)

  setHashValue(hash_value_array)

  setDate(new Date)

  



}
















if (loading == true)
{
  return  <dl style={{marginTop: "30px"}} className="center fontsize6">
    <progress max="100"></progress>
     <dd> Please wait for a while.</dd>


  </dl>
}
          

           
   
          return (
          
          
          <dl className="center">


{LoginState()}



        <dd className="right"><button onClick={cancel_post} className="delete_button fontsize4">CANCEL</button></dd>




<table align="center" className="fontsize6">

<tbody>

<tr align="center">

<td align="left">
<dt>Restaurant's Name:</dt>
</td>

</tr>




<tr align="center">


<td align="left">
        <dd><input maxLength={35} className="textfield fontsize5" type="text" name="restaurant" onChange={(e) =>setRestaurant(e.target.value)}/></dd>
</td>

</tr>






<tr align="center" >

  <td align="left">
        <dt style={{marginTop: "10px"}} className="state_select" htmlFor="state">State or Territory:</dt>

  </td>


</tr>




<tr align="center">

<td align="left">

        <dd>
            <select　value={state} id="state" name="state" onChange={(e) =>setState(e.target.value)}>

        <option value="NSW">NSW</option>
        <option value="VIC">VIC</option>
        <option value="QLD">QLD</option>
        <option value="WA">WA</option>
        <option value="SA">SA</option>
        <option value="TAS">TAS</option>
        <option value="ACT">ACT</option>
        <option value="NT">NT</option>


            </select>
        </dd>
</td>

</tr>






<tr align="center">

  <td align="left">
        <dt style={{marginTop: "10px"}}>Area:</dt>
</td>
 



</tr>


<tr align="center">

 

<td align="left">
        <dd><input maxLength={35} onChange={(e) =>setArea(e.target.value)} className="fontsize5 textfield" type="text" name="area"/></dd>
</td>

</tr>






<tr align="center">
<td align="left"><dt style={{marginTop: "10px"}}>Star:</dt></td>
 

</tr>

<tr align="center">
<td  align="left">{star_buttons}</td>

</tr>












</tbody>




</table>


<dt className="fontsize5 left">Input LocationName:</dt>
<dd><input placeholder="◯◯◯◯◯ Sydney NSW" maxLength={150} style={{width: "100%"}} onChange={(e) => setLocation(e.target.value)}  className="fontsize4 textfield" type='text' value={location}/></dd>
<dd className="right"><button onClick={geocode} className="orangebutton fontsize4">SEARCH</button></dd>

<dd className="right">{delete_position_button}</dd>
<LoadScript googleMapsApiKey={process.env.MIX_GOOGLE_MAP_API_KEY}>
      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          height: "60vh",
        }}
        center={center}
        zoom={4}
        onClick={onMapClick}
      >
       {markers.map((marker, index) => (
      <Marker
         key={index}
         position={{lat: marker.lat, lng: marker.lng}}
      >
      </Marker>
   ))}
      </GoogleMap>
    </LoadScript>







        <dt className="fontsize6" style={{marginTop: "20px"}}>Note:</dt>



        <dd><textarea maxLength={500} onChange={(e) =>setNote(e.target.value)} className="textarea fontsize5" name="note" rows={10}>
            </textarea></dd>

{hash_values}

            <dt className="fontsize6" style={{marginTop: "20px"}}>#

            <input id="hash_value_txf" onChange={(e) => setTempHash(e.target.value)} maxLength={35} className="textfield fontsize5" type="text" name="hash_value"/>
            <button onClick={add_hash_value} className="orangebutton fontsize4">ADD</button></dt>

   
   
            <dt style={{marginTop: "20px"}} className="fontsize6">Photos:</dt>
          
       <dd style={{marginBottom: "20px"}}>



     

     {add_photo_button}



{img_bunch}






          

       </dd>



   


     <dd>{post_button}</dd>






          </dl>

            




          );
        
      }

      export default Post;



   