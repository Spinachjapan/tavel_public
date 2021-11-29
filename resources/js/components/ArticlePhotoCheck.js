import React, {useEffect, useState} from 'react';


        

        function ArticlePhotoCheck(article_id, p1, p2, p3, p4, p5, p6, cust_key = null)
        {

          var photo_num_array = [];
        
  
          if (p1 != null)
          {
            photo_num_array.push("1")
          }
          if (p2 != null)
          {
            photo_num_array.push("2")
          }
          if (p3 != null)
          {
            photo_num_array.push("3")
          }
          if (p4 != null)
          {
            photo_num_array.push("4")
          }
          if (p5 != null)
          {
            photo_num_array.push("5")
          }
          if (p6 != null)
          {
            photo_num_array.push("6")
           
          }


          if (cust_key != null)
          {
            return (
              <span>
              {photo_num_array.map((value, index) => 
                (
                  <span key={index} style={{marginRight: "2px"}}><img src={"photo_output_article/" + article_id + "/" + value + "/" + new Date()} className="common_size_photo"/></span>
           
                ))}</span>
            )


          }



  
  
          return (

            <div className="photo_group center">
              {photo_num_array.map((value, index) => 
              (
                <label key={index} style={{marginRight: "5px"}} className="area"><img src={"photo_output_article/" + article_id + "/" + value + "/" + new Date()} className="big_photo"/></label>
         
              ))}
            </div>
  
  
  
          )
  
  
  
  
  
  
  
  
          
  
  
        }






        
        
        

   
  
           

        
      

      export default ArticlePhotoCheck;

  
