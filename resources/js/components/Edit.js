import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import AccountDetail from './AccountDetail';
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import LoginState from './loginState';
import LoginCheck from './LoginCheck';










function Edit(props)
    {

      LoginCheck()

      ReactDOM.render("Edit", document.getElementById('page_state'));





const [restaurant, setRestaurant] = useState(null);
const [state, setState] = useState("NSW");
const [area, setArea] = useState(null);     
const [note, setNote] = useState(null);

const [star, setStar] = useState(null);

const [new_photos, setNewPhotos] = useState([]);

const [posted_photos, setPostedPhotos] = useState([]);



const [date, setDate] = useState(null);


const [location, setLocation] = useState("")
     
const [center, setCenter] = useState({
 lat: -33.8688197,
 lng: 151.2092955,
})

const [latLng, setLatLng] = useState(null)


const [hashValue, setHashValue] = useState([]);

const [tempHash, setTempHash] = useState("")



const [loading, setLoading] = useState(false)



useEffect(() => {

  
load()



       
  }, [])









  const load = () =>
  {

    axios.post('/get_article_info', 
    {

      article_id: props.article_id,

   
    },{ 
      xsrfHeaderName: "X-XSRF-TOKEN", 
      withCredentials: true
    })
    .then(res => {

      var returned_data = res.data;


        setRestaurant(returned_data[0])
        setState(returned_data[1])
        setArea(returned_data[2])
        setNote(returned_data[3])
        setStar(returned_data[5])
        setPostedPhotos(returned_data[8])



        if (returned_data[4] != null)
        {
          setHashValue(String(returned_data[4]).split(","))
        }

        if (returned_data[6] != null && returned_data[7] != null)
        {
          setLatLng([returned_data[6], returned_data[7]])
          setCenter({lat: returned_data[6], lng: returned_data[7]})

        }










                    
 })

 
.catch(error => {
 
   });
   

  }







 








const change_info = (kind) =>
{

  var change_confirm = confirm("Will you change " + kind + "?")

  if (change_confirm == false)
  {
    return
  }


  if (kind == "restaurant")
  {
  

  axios.post('/change_info', 
  {
    kind : 0,
    article_id: props.article_id,
    restaurant: restaurant}
    ,{ 
      xsrfHeaderName: "X-XSRF-TOKEN", 
      withCredentials: true
    }
    )
  .then(res => {

    alert("Restaurant's name was updated.")

  

                  
})


.catch(error => {


 
 });
 
}


else if (kind == "state")
{



axios.post('/change_info', 
{
  kind : 1,
  article_id: props.article_id,
  state: state},{ 
    xsrfHeaderName: "X-XSRF-TOKEN", 
    withCredentials: true
  })
.then(res => {

   alert("State was updated.")


                
})


.catch(error => {

});

}

else if (kind == "area")
{



axios.post('/change_info', 
{
  kind : 2,
  article_id: props.article_id,
  area: area},{ 
    xsrfHeaderName: "X-XSRF-TOKEN", 
    withCredentials: true
  })
.then(res => {

   alert("Area was updated.")


                
})


.catch(error => {

});

}





else if (kind == "note")
{



axios.post('/change_info', 
{
  kind : 3,
  article_id: props.article_id,
  note: note},{ 
    xsrfHeaderName: "X-XSRF-TOKEN", 
    withCredentials: true
  })
.then(res => {



   alert("Note was updated.")
 

                
})


.catch(error => {

});

}




else if (kind == "hash_value")
{



axios.post('/change_info', 
{
  kind : 4,
  article_id: props.article_id,
  hash_value: hashValue},{ 
    xsrfHeaderName: "X-XSRF-TOKEN", 
    withCredentials: true
  })
.then(res => {



   alert("Hash tags was updated.")
 

                
})


.catch(error => {

});

}
















 else if (kind == "star")
  {


 

  axios.post('/change_info', 
  {
    kind : 5,
    article_id: props.article_id,
    star: star},{ 
      xsrfHeaderName: "X-XSRF-TOKEN", 
      withCredentials: true
    })
  .then(res => {

     alert("Star was updated.")
   

                  
})


.catch(error => {
 
 });

}





else if (kind == "position")
{

  let new_lat = null
  let new_lng = null

  if (latLng != null)
  {
new_lat = latLng[0]
new_lng = latLng[1]

  }
 

axios.post('/change_info', 
{
  kind : 6,
  article_id: props.article_id,
  Lat: new_lat,
  Lng: new_lng

},{ 
  xsrfHeaderName: "X-XSRF-TOKEN", 
  withCredentials: true
})
.then(res => {

   alert("Location was updated.")
 

                
})


.catch(error => {

});

}













  else if (kind == "photo")
  {



    axios.post('/change_info', 
    {
      kind : 7,
      article_id: props.article_id,
      posted_photos: posted_photos,
      new_photos: new_photos
    
    },{ 
      xsrfHeaderName: "X-XSRF-TOKEN", 
      withCredentials: true
    })
    .then(res => {

  
  
  
       alert("Photos were updated.")
       setNewPhotos([])
   
  
                    
  })
  
  
  .catch(error => {
   
   });


  }


  load()



  

}



  



          


    






 



   const add_photo = (e) =>
    {
     
      var photo_array = new_photos

      const file = e.target.files[0]


  
      
          var reader = new FileReader()
          reader.onload = (e) => {

            photo_array.push([e.target.result, file.type])
  
              setNewPhotos(photo_array)
              setDate(new Date)

             
           
            
  
          };
          reader.readAsDataURL(file)

          var obj = document.getElementById("target1");
          obj.value = "";
   

    } 





    const delete_posted_photo = (e) =>
    {
        

        var posted_photo_array = posted_photos

       var new_posted_photo_array = posted_photo_array.filter(item => item != e.target.value);
  
        setPostedPhotos(new_posted_photo_array)



  




    }





    const delete_new_photo = (e) =>
    {    
      

      var new_photo_array = new_photos

      new_photo_array.splice(e.target.value, 1)

      setNewPhotos(new_photo_array)

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








    var posted_photo_bunch = null

    if (posted_photos.length > 0)
    {
      

      posted_photo_bunch = (<div>
         <dt className="fontsize6">posted photos</dt>    
        {posted_photos.map((value, index) => (
          
<label key={index}>
<dd style={{marginRight: "5px"}}><img src={"photo_output_article/" + props.article_id + "/" + value+ "/" + new Date()} className="big_photo"/></dd>
<dd><button className="delete_button fontsize4" value={value} onClick={delete_posted_photo}>delete</button></dd>
</label>
        ))

        }

</div>)

    }
       



          var add_photo_button = (<label>
 
  
           <label style={{borderRadius: "30px",}} className="orangebutton fontsize5" htmlFor="target1">+|Add New Photo</label>
                            <input accept="image/*" onChange={                         
                                add_photo
                            } type="file" name="photo1" className="filesend" id="target1"/>
            
                   </label>  )


if (new_photos.length + posted_photos.length >5)
{
  add_photo_button = <label className="fontsize4 red_word">"You can input up to 6 photos."</label>
}
















   

          
            



var star_num_array = [1, 2, 3, 4, 5];



var star_buttons = <div>{star_num_array.map((value, index) =>  

  <label key={index}>
 {star_check(value)}
  </label>

   )}<button className="fontsize4 orangebutton" onClick={() => change_info("star")}>CHANGE</button></div>



      



   var new_photo_bunch = null
    

   if (new_photos.length > 0)
   {
   
    new_photo_bunch = (<div>
     
   {new_photos.map((value, index) => (
     
   <label key={index} style={{marginRight: "5px"}}>
   <dt className="fontsize6" style={{marginTop: "20px"}}>new photos</dt>
   <dd><img src={value[0]} className="big_photo"/></dd>
   <dd><button className="delete_button fontsize4" value={index} onClick={delete_new_photo}>delete</button></dd>
   </label>
   ))
   
   }
   </div>)
   }




   var change_photo_button =  <dd> <button className="fontsize4 orangebutton" onClick={() => change_info("photo")}>CHANGE</button></dd>

   if (posted_photos.length + new_photos.length == 0)
   {
     change_photo_button = <label className="fontsize4 red_word">"Please input at least 1 photo."</label>

   }






  const onMapClick = (event) => {
    setLatLng([event.latLng.lat(), event.latLng.lng()])
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

      setLatLng([results[0].geometry.location.lat(), results[0].geometry.location.lng()])
   

     



    }
  });
}

const delete_position = () =>
{
  setLatLng(null)


}



var delete_position_button = <dd className="fontsize4 red_word">Location is not selected.</dd>

if (latLng != null)
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











var marker = null

if (latLng != null)
{
  marker =   <Marker
  position={{lat: latLng[0], lng: latLng[1]}}
>
</Marker>
}







       
          return (<dl className="center">
            {LoginState()}
  



<table align="center" className="fontsize6">

<tbody>

<tr align="center">

<td valign="top"  align="left">
<dt>Restaurant's Name:</dt>
</td>



</tr>

<tr align="center">


<td  align="left">
        <dd><input defaultValue={restaurant} maxLength={35} className="fontsize5 textfield" type="text" name="restaurant" onChange={(e) =>setRestaurant(e.target.value)}/>
        <button className="fontsize4 orangebutton" onClick={() => change_info("restaurant")}>CHANGE</button>
        </dd>
</td>

</tr>






<tr align="center">

  <td valign="top"  align="left">
        <dt style={{marginTop: "10px"}} className="state_select" htmlFor="state">State or Territory:</dt>

  </td>



</tr>




<tr align="center">

 

<td  align="left">

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
            <button className="fontsize4 orangebutton" onClick={() => change_info("state")}>CHANGE</button>
        </dd>
</td>

</tr>








<tr align="center">

  <td valign="top"  align="left">
        <dt style={{marginTop: "10px"}}>Area:</dt>
</td>
 


</tr>






<tr align="center">



<td align="left"> 
        <dd><input defaultValue={area} maxLength={35} onChange={(e) =>setArea(e.target.value)} className="fontsize5 textfield" type="text" name="area"/>
       <button className="fontsize4 orangebutton" onClick={() => change_info("area")}>CHANGE</button>
        </dd>
</td>

</tr>





<tr align="center">
<td align="left"><dt style={{marginTop: "10px"}}>Star:</dt></td>
 

</tr>

<tr>
<td align="left">{star_buttons}</td>

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
        zoom={13}
        onClick={onMapClick}
      >
        {marker}
      </GoogleMap>
    </LoadScript>
    <dd className="right"><button className="fontsize4 orangebutton" onClick={() => change_info("position")}>CHANGE</button></dd>







        <dt className="fontsize6">Note:</dt>
        <dd><textarea defaultValue={note} maxLength={500} onChange={(e) =>setNote(e.target.value)} className="textarea fontsize5" name="note" rows={10}>
            
            </textarea>
            <br/>
            <button className="fontsize4 orangebutton" onClick={() => change_info("note")}>CHANGE</button>
            </dd>


            {hash_values}
            <dd className="right"><button className="fontsize4 orangebutton" onClick={() => change_info("hash_value")}>CHANGE</button></dd>


            <dt className="fontsize6" style={{marginTop: "20px"}}>#

            <input id="hash_value_txf" onChange={(e) => setTempHash(e.target.value)} maxLength={35} className="textfield fontsize5" type="text" name="hash_value"/>
            <button onClick={add_hash_value} className="orangebutton fontsize4">ADD</button>
            
            </dt>


   
            <dt className="fontsize6">Photos:</dt>
          
       <dd style={{marginBottom: "20px"}}>



     

          

       </dd>


{posted_photo_bunch}


       {new_photo_bunch}




 {add_photo_button}
       {change_photo_button}


    


          </dl>

            




          );
        
      }

      export default Edit;



   
          