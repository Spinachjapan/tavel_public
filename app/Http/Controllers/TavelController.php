<?php
namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\Article;
use App\Models\DefaultPhoto;
//use App\Models\Comment;
use Illuminate\Http\Request;

//session_start();

class TavelController //extends Controller
{
    private $stc;

    public function __construct()
    {
    
        $this->stc = app()->make('App\Retrieve\SubTavelController');
    }



    public function get_articles(Request $request)
    {
            
         $conditions = $request -> all();
            
         return $this->stc->target_articles($conditions["state"], $conditions["area"], $conditions["restaurant"], $conditions["hash_value"]);      
   
           
   
   
    }







        public function photo_output_article($article_id, $photo_num, $date)
    {
        if ($article_id == "default") {
            $default_article_photo = DefaultPhoto::select("photo", "photo_type")
                ->where("default_photo_name", "default_article")->first();

            $output_photo = $default_article_photo["photo"];
            $output_ = $default_article_photo["photo_type"];

        } else {

            $article_photos = Article::select("photo" . $photo_num, "photo_type" . $photo_num)
                ->where("article_id", $article_id)->first();


                $output_photo = $article_photos["photo" . $photo_num];
                $output_photo_type = $article_photos["photo_type" . $photo_num];

        
        }

        header('Content-type: ' . $output_photo_type);
        echo $output_photo;
        exit();

    }

    public function photo_output_account($username)
    {

        $account_photo = Account::select("profile_photo", "profile_photo_type")
            ->where("username", $username)->first();

        if ($account_photo["profile_photo"] == null || $username == "default") {

            $default_account_photo = DefaultPhoto::select("photo", "photo_type")
                ->where("default_photo_name", "default_profile")->first();

            $output_photo = $default_account_photo["photo"];
            $output_photo_type = $default_account_photo["photo_type"];

        } else {

            $output_photo = $account_photo["profile_photo"];
            $output_photo_type = $account_photo["profile_photo_type"];

        }

        header('Content-type: ' . $output_photo_type);
        echo $output_photo;
        exit();

    }



    public function check_account(Request $request)
    {


         $got_account_id = sha1($request -> input("got_account_id"));

         $all_account_id = $this->stc -> get_all_account_id();


         if (count($all_account_id) == 0)
         {
             return false;
         }






         $min = 0;
         $max = count($all_account_id) - 1;
   

         while(true)
         {

            if (strcmp($got_account_id, $all_account_id[$min + ($max - $min)/2]["account_id"]) == 0)
            {
                return $all_account_id[$min + ($max - $min)/2]["username"];
            }
            else if ($min == $max)
            {
                return false;
            }
            else if (strcmp($got_account_id, $all_account_id[$min + ($max - $min)/2]["account_id"]) < 0)
            {
                $max -= ((($max - $min) / 2) + 1);

                $max = floor($max);
                
                
            }
            else
            {
                $min += ((($max - $min) / 2) + 1);
                $min = floor($min);
            }
           
         }
           
   
    }




    public function create_account(Request $request)
    {


            
         $new_account_id = sha1($request -> input("new_account_id"));

         $new_username = $request -> input("new_username");

         Account::insert([

            'username' => $new_username,
            'account_id' => $new_account_id
        

        ]);

        return true;
         

       
    }


    public function check_username(Request $request)
    {


            
         $got_username = $request -> input("new_username");

         $all_username = $this->stc -> get_all_username();

         if (count($all_username) == 0)
         {
             return false;
         }




         $min = 0;
         $max = count($all_username) - 1;
   

         while(true)
         {

            if (strcmp($got_username, $all_username[$min + ($max - $min)/2]["username"]) == 0)
            {
                return true;
            }
            else if ($min == $max)
            {
                return false;
            }
            else if (strcmp($got_username, $all_username[$min + ($max - $min)/2]["username"]) < 0)
            {
                $max -= ((($max - $min) / 2) + 1);
                $max = floor($max);
            }
            else
            {
                $min += ((($max - $min) / 2) + 1);
                $min = floor($min);
            }
             
         }
           
   
    }


    public function get_account_info(Request $request)
    {

         return  $this->stc->get_account_info($request -> input("username"));
            
       
    }



    public function article_photo_check(Request $request)
    {

         $got_article_id = $request -> input("article_id");

        $article_photos = Article::select("photo_type1", "photo_type2", "photo_type3", "photo_type4", "photo_type5", "photo_type6")
        ->where("article_id", $got_article_id)->first();


        $photo_check_array = [];

        for ($i=1; $i <= 6; $i++)
        {
            if ($article_photos["photo_type". strval($i)] != null && $article_photos["photo_type". strval($i)] != "")
            {
                array_push($photo_check_array, $i);
            }


        }


        return $photo_check_array;


    }





    public function post_article(Request $request)
    {
       

        $got_article_data = $request -> all();

        $got_photos = $got_article_data["photos"];

        


       $got_photos = array_pad($got_photos, 6, null);
     


                $post_photo1 = file_get_contents($got_photos[0][0]);
                $post_photo_type1 = $got_photos[0][1];

                $post_photo2 = null;
                $post_photo_type2 = null;

                $post_photo3 = null;
                $post_photo_type3 = null;

                $post_photo4 = null;
                $post_photo_type4 = null;

                $post_photo5 = null;
                $post_photo_type5 = null;

                $post_photo6 = null;
                $post_photo_type6 = null;



            

           if ($got_photos[1] != null)
           {

            $post_photo2 = file_get_contents($got_photos[1][0]);
                $post_photo_type2 = $got_photos[1][1];


           }
        


           if ($got_photos[2] != null)
           {

            $post_photo3 = file_get_contents($got_photos[2][0]);
                $post_photo_type3 = $got_photos[2][1];


           }
           



           if ($got_photos[3] != null)
           {

            $post_photo4 = file_get_contents($got_photos[3][0]);
                $post_photo_type4 = $got_photos[3][1];


           }
    
   


           if ($got_photos[4] != null)
           {

            $post_photo5 = file_get_contents($got_photos[4][0]);
                $post_photo_type5 = $got_photos[4][1];


           }
     



           if ($got_photos[5] != null)
           {

            $post_photo6 = file_get_contents($got_photos[5][0]);
                $post_photo_type6 = $got_photos[5][1];


           }

    

           $hash_value_sent = null;

           if (count($got_article_data["hash_value"]) != 0)
           {
             
            $hash_value_sent = implode(",", $got_article_data["hash_value"]);

      
           }
    


    










            Article::insert([

                'username' => $got_article_data["username"],
                'restaurant' => $got_article_data["restaurant"],
                'state' => $got_article_data["state"],
                'area' => $got_article_data["area"],
                "note" => $got_article_data["note"],
                "hash_value" =>  $hash_value_sent,
                "star" => $got_article_data["star"],
                "lat" => $got_article_data["lat"],
                "lng" => $got_article_data["lng"],
                'photo1' => $post_photo1,
                'photo2' => $post_photo2,
                'photo3' => $post_photo3,
                'photo4' => $post_photo4,
                'photo5' => $post_photo5,
                'photo6' => $post_photo6,
                'photo_type1' => $post_photo_type1,
                'photo_type2' => $post_photo_type2,
                'photo_type3' => $post_photo_type3,
                'photo_type4' => $post_photo_type4,
                'photo_type5' => $post_photo_type5,
                'photo_type6' => $post_photo_type6
            ]);

          
            return true;

        

    }






    public function get_article_info(Request $request)
    {
  
        
         $got_article_id = $request -> input("article_id");

       

        $article_info = Article::select("restaurant", "state", "area", "note", "hash_value", "star", "lat", "lng", "photo1",
        "photo_type1", "photo_type2", "photo_type3", "photo_type4", "photo_type5", "photo_type6")
        ->where("article_id", $got_article_id)->first();

       $photo_num_array = [];

        if ($article_info["photo_type1"] != null)
        {
            array_push($photo_num_array, 1);
        }

        if ($article_info["photo_type2"] != null)
        {
            array_push($photo_num_array, 2);
        }

        if ($article_info["photo_type3"] != null)
        {
            array_push($photo_num_array, 3);
        }

        if ($article_info["photo_type4"] != null)
        {
            array_push($photo_num_array, 4);
        }

        if ($article_info["photo_type5"] != null)
        {
            array_push($photo_num_array, 5);
        }

        if ($article_info["photo_type6"] != null)
        {
            array_push($photo_num_array, 6);
        }

       


      


        return [$article_info["restaurant"], $article_info["state"], $article_info["area"], $article_info["note"], $article_info["hash_value"], 
        $article_info["star"], $article_info["lat"], $article_info["lng"], $photo_num_array];


    }




    function get_taveler(Request $request)
    {
        $got_username = $request->input("username");

        $got_taveler = Account::select("taveler")
        ->where("username", $got_username)->first();


        return $got_taveler["taveler"];


    }


    function send_changed_profile_photo(Request $request)
    {
        
        $got_username = $request->input("username");


        $got_photo = $request->input("changed_profile_photo");

        Account::where("username", $got_username)->update([

            "profile_photo" => file_get_contents($got_photo[0]),
            "profile_photo_type" => $got_photo[1]


        ]);

        return true;




    }





    function change_taveler(Request $request)
    {

          
        $username = $request->input("username");

        $new_taveler = $request->input("new_taveler");


        Account::where("username", $username)->update([

            "taveler" => $new_taveler,
            
        ]);


      
  return true;
    



    }






    function delete_account(Request $request)
    {

          
        $username = $request->input("username");

        


        Article::where("username", $username)->delete();
        Account::where("username", $username)->delete();


      
  return true;
    



    }






    function delete_article(Request $request)
    {

           
    
        $article_id = $request->input("got_article_id");

    
        Article::where("article_id", $article_id)->delete();


 return true;

    }







    public function change_info(Request $request)
    {

   


        $got_article_data = $request->all();

        if ($got_article_data["kind"] == 0)
        {

 
                Article::where("article_id", $got_article_data["article_id"])->update([

                    'restaurant' => $got_article_data["restaurant"]

                ]);

            }

           else if   ($got_article_data["kind"] == 1)
            {
    
     
                    Article::where("article_id", $got_article_data["article_id"])->update([
    
                        'state' => $got_article_data["state"]
    
                    ]);
    
                }

                else if   ($got_article_data["kind"] == 2)
                {
        
         
                        Article::where("article_id", $got_article_data["article_id"])->update([
        
                            'area' => $got_article_data["area"]
        
                        ]);
        
                    }


                    else if   ($got_article_data["kind"] == 3)
                    {
            
             
                            Article::where("article_id", $got_article_data["article_id"])->update([
            
                                'note' => $got_article_data["note"]
            
                            ]);
            
                        }

                        else if   ($got_article_data["kind"] == 4)
                        {


           $hash_value_sent = null;

           if (count($got_article_data["hash_value"]) != 0)
           {
             
            $hash_value_sent = implode(",", $got_article_data["hash_value"]);

      
           }
    
                 
                                Article::where("article_id", $got_article_data["article_id"])->update([
                
                                    'hash_value' => $hash_value_sent
                
                                ]);
                
                            }



                        else if   ($got_article_data["kind"] == 5)
        {

 
                Article::where("article_id", $got_article_data["article_id"])->update([

                    'star' => $got_article_data["star"]

                ]);

            }

            else if   ($got_article_data["kind"] == 6)
       {

    

               Article::where("article_id", $got_article_data["article_id"])->update([

                   'lat' => $got_article_data["Lat"],
                   'lng' => $got_article_data["Lng"],

               ]);

          
            }


            else if   ($got_article_data["kind"] == 7)
            {

        

                $article_photos = Article::select( "photo1", "photo2", "photo3", "photo4", "photo5", "photo6",
                "photo_type1", "photo_type2", "photo_type3", "photo_type4", "photo_type5", "photo_type6")
                ->where("article_id", $got_article_data["article_id"])->first();
        
       
                $posted_photo_array_2 = [];
        
    
              
                for ($i = 1; $i<7; $i++)
                {
        
                
                    if ($article_photos["photo" . $i] != null && in_array($i, $got_article_data["posted_photos"]))
                    {
                         
                        array_push($posted_photo_array_2, [ $article_photos["photo" . $i],  $article_photos["photo_type" . $i]]);
        
                      
                    }
        
        
                }


                if (count($got_article_data["new_photos"]) != 0)
                {

                    for ($t = 0; $t < count($got_article_data["new_photos"]); $t++)
                  {

                    array_push($posted_photo_array_2, [ file_get_contents($got_article_data["new_photos"][$t][0]),  $got_article_data["new_photos"][$t][1]]);

                   
            
               }




                }



                $posted_photo_array_3 = array_pad($posted_photo_array_2, 6, [null, null]);

   
             

                Article::where("article_id", $got_article_data["article_id"])->update([

                
                    "photo1" => $posted_photo_array_3[0][0],
                    "photo2" => $posted_photo_array_3[1][0],
                    "photo3" => $posted_photo_array_3[2][0],
                    "photo4" => $posted_photo_array_3[3][0],
                    "photo5" => $posted_photo_array_3[4][0],
                    "photo6" => $posted_photo_array_3[5][0],
                    "photo_type1" => $posted_photo_array_3[0][1],
                    "photo_type2" => $posted_photo_array_3[1][1],
                    "photo_type3" => $posted_photo_array_3[2][1],
                    "photo_type4" => $posted_photo_array_3[3][1],
                    "photo_type5" => $posted_photo_array_3[4][1],
                    "photo_type6" => $posted_photo_array_3[5][1],



                ]);
    
                }

    

                return true;

    }



    public function get_all_positions()
    {


        return $this->stc->get_all_positions();  
       


    }




    public function get_restraurant_info(Request $request)
    {
      
        
        $got_lat_lng = $request->all();

        $all_restaurant_article = $this->stc->get_restaurant_info($got_lat_lng["lat"], $got_lat_lng["lng"]);

      $request_name_array = array_column($all_restaurant_article, 'restaurant');

      $request_name_array = array_count_values($request_name_array);

      arsort($request_name_array);


      $returned_res_name = "No Name";

      if (count($request_name_array) != 0)
      {
        $returned_res_name = array_keys( $request_name_array)[0];
      }


        return [$this->stc->get_restaurant_info($got_lat_lng["lat"], $got_lat_lng["lng"]), array_sum(array_column($all_restaurant_article, 'star')), $returned_res_name]; 

    }


    public function follow_manage(Request $request)
    {
         $got_data = $request->all();

        $follower_info = Account::select("follower")->where("username", "seeded_user")->first()["follower"];

        $follower_info_array;


        if ($got_data["type"] == "follow")
        {

            if ($follower_info == null)
            {
                $follower_info_array = [$got_data["following_user"]];

            }
            else
            {
         
                $follower_info_array = explode(",", $follower_info);

                if (!in_array($got_data["following_user"], $follower_info_array))
                {
                    array_push($follower_info_array, $got_data["following_user"]);
                }

            }

        }
        else if ($got_data["type"] == "unfollow")
        {

            if ($follower_info != null)
            {
         
                $follower_info_array = explode(",", $follower_info);

                $follower_info_array = array_diff($follower_info_array, [$got_data["following_user"]]);

                $follower_info_array = array_values($follower_info_array);
                
                if (count($follower_info_array) == 0)
                {
                    Account::where("username", $got_data["followed_user"])->update([

                        "follower" => null
    
                    ]);

                    return true;


                }


            }

        }


                Account::where("username", $got_data["followed_user"])->update([

                    "follower" => implode(",", $follower_info_array)

                ]);
 

        return true;




    }




    public function good_manage(Request $request)
    {
        $got_data = $request -> all();

        $good_info = Article::select("good") -> where("article_id", $got_data["article_id"]) -> first()["good"];

        $good_info_array;

        if ($got_data["type"] == "add")
        {
            if ($good_info == null)
            {
                $good_info_array = [$got_data["user"]];

            }
            else
            {
                $good_info_array = explode(",", $good_info);

                if (!in_array($got_data["user"], $good_info_array))
                {
                    array_push($good_info_array, $got_data["user"]);
                 
                }
            }

        }
        else if ($got_data["type"] == "remove")
        {
            if ($good_info != null)
            {
         
                $good_info_array = explode(",", $good_info);

                $good_info_array = array_diff($good_info_array, [$got_data["user"]]);

                $good_info_array = array_values($good_info_array);
                
                if (count($good_info_array) == 0)
                {
                    Article::where("article_id", $got_data["article_id"])->update([

                        "good" => null
    
                    ]);

                    return true;


                }


            }


        }



        Article::where("article_id", $got_data["article_id"])->update([

            "good" => implode(",", $good_info_array)

        ]);


return true;


    }


    public function search_username(Request $request)
    {

     
        $all_username = $this->stc -> get_all_username();

        $found_users = [];

        if (count($all_username) == 0)
        {
            return [];
        }



       

        for ($i=0; $i<count($all_username); $i++)
       {
            if (str_contains($all_username[$i]["username"], $request->input("username")))
            {  
                
               array_push($found_users, $all_username[$i]["username"]);

              

            }

        }

      


        return [$request->input("username"), $found_users];
    

        


        




    }












}