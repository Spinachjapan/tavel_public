<?php

namespace App\Retrieve;
use App\Models\Account;
use App\Models\Article;
use App\Models\DefaultPhoto;
//use App\Models\Comment;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Cache;




class SubTavelController 
{
    private $seconds = 1;
 



    public function get_default_articles()
    {

       
        $all_article_cache = Cache::remember('all_article_key', $this->seconds, function(){
           
            return Article::select("articles.article_id", "articles.username", "restaurant", "note", "hash_value", "state", "star", "lat", "lng", "photo_type1", "photo_type2", "photo_type3", "photo_type4", "photo_type5", "photo_type6",
            "area", "good") /*, Comment::raw('count(comments.article_id) as total_comment')) -> groupBy("articles.article_id") -> leftjoin("comments", "articles.article_id", "=", "comments.article_id") */
            ->join("accounts", "articles.username", "=", "accounts.username") -> orderBy('article_id', "desc")->get(); 


       
        });
        

        return  $all_article_cache;


    }




    public function target_articles(string $state=null, string $area=null, string $restaurant=null, string $hash_value=null)
    {
        

 $original_articles_array = $this->get_default_articles();





    if ($state != null) {
        $temp_state = [];

        foreach ($original_articles_array as $each_state) {

            if ($each_state["state"] != null && $each_state["state"] == $state) {
                array_push($temp_state, $each_state);

            }

        }

        $original_articles_array = $temp_state;

    }






    if ($area != null) {
        $temp_area = [];

        foreach ($original_articles_array as $each_area) {

            if ($each_area["area"] != null) {
                if (str_contains($each_area["area"], $area) || str_contains($area, $each_area["area"])) {
                    array_push($temp_area, $each_area);
                }

            }

        }

        $original_articles_array = $temp_area;

    }

    if ($restaurant != null) {
        $temp_restaurant = [];

        foreach ($original_articles_array as $each_restaurant) {

            if ($each_restaurant["restaurant"] != null) {
                if (str_contains($each_restaurant["restaurant"], $restaurant) || str_contains($restaurant , $each_restaurant["restaurant"])) {
                    array_push($temp_restaurant, $each_restaurant);
                }
            }

        }

        $original_articles_array = $temp_restaurant;

    }




    if ($hash_value != null) {

        $temp_hash_array = [];

        foreach ($original_articles_array as $each_stmt) {

            if ($each_stmt["hash_value"] != null && in_array($hash_value, explode(",", $each_stmt["hash_value"])))
            {
                array_push($temp_hash_array, $each_stmt);

            }

        
        }



        $original_articles_array = $temp_hash_array;

    }


    return $original_articles_array;


    }





    public function get_all_account_id()
    {

        $all_account_id_cache = Cache::remember('all_account_id_key', $this->seconds, function(){
           
            return Account::select("account_id", "username")->orderBy("account_id", "asc")->get(); 
       
        });

        return  $all_account_id_cache;


    }


    public function get_all_username()
    {

        $all_username_cache = Cache::remember('all_username_key', $this->seconds, function(){
           
            return Account::select("username")->orderBy("username", "asc")->get(); 
       
        });

        return  $all_username_cache;


    }





    function get_someone_articles(string $username)
    {
    

        $someone_articles_cache = Cache::remember($username. 'someone_articles_key', $this->seconds, function () use ($username){


            $temp_array = [];
    
            foreach ($this -> get_default_articles() as $each_article)
            {
                if ($each_article["username"] == $username)
                {
                    array_push($temp_array, $each_article);
                }
        
            }
        
            return $temp_array;


        });


    
        return  $someone_articles_cache;
    


    }






    public function get_account_info(string $username)
    {

        $gotten_taveler_cache = Cache::remember($username . 'gotten_taveler_key', $this->seconds, function() use ($username){
           
            return Account::select("taveler")->where('username', $username)->first()["taveler"];
       
        });


        







        return [$gotten_taveler_cache, $this->get_someone_articles($username), 
    $this->get_follower_array($username), $this->get_following_array($username)];



    }












    public function get_all_taveler()
    {

        $all_taveler_cache = Cache::remember('all_taveler_key', $this->seconds, function(){
           
            return Account::select("username", "taveler", "follower", "account_id")->get(); 
       
        });

        return  $all_taveler_cache;


    }

   




    public function get_follower_array($username)
    {
        $follower_array_cache = Cache::remember($username . 'follower_array_key', $this->seconds, function() use ($username){


       return Account::where("username", $username) -> select("follower")->first()["follower"];


    });

    return $follower_array_cache;



    }




    public function get_following_array($username)
    {

     


            $following_array = [];

            foreach ( $this->get_all_taveler() as $each_following)
            {
        
                if ($each_following["follower"] != null && $each_following["follower"] != "") {
        
                    $temp_array = explode(",", $each_following["follower"]);

                    foreach ($temp_array as $each_temp)
                    {
                        if ($each_temp == $username)
                        {
                            array_push($following_array, $each_following["username"]);
                            continue;

                        }
                    }
        
               
               
               
                }
        
            }
        
            return $following_array;


  


    }


  




    // public function get_comment($article_id)
    // {


    //     $gotten_comment_cache = Cache::remember($article_id . 'gotten_comment_key', $this->seconds, function() use ($article_id){
           
    //         return  Comment::where("article_id", $article_id)->select("username", "comment_text", "article_id")-> orderBy('comment_text', "desc")->get();
       
    //     });


    //     return $gotten_comment_cache;


    // }






    public function get_ene_list($article_id)
    {

        $gotten_ene_list_cache = Cache::remember($article_id . 'gotten_ene_list_key', $this->seconds, function() use ($article_id){
           
            return  Article::where("article_id", $article_id)->select("good")->first();
       
        });


        return unserialize($gotten_ene_list_cache["good"]);


    }




    public function get_all_positions()
    {
        $all_position_cache = Cache::remember('all_position_key', $this->seconds, function(){
           
            return Article::select("lat", "lng") ->distinct()->whereNotNull('lat')->whereNotNull('lng')->get(); 

        });
        
        return  $all_position_cache;

    }

    public function get_restaurant_info($got_lat, $got_lng)
    {
        $original_articles_array = $this->get_default_articles();


        $restaurant_info_array = [];

        foreach ($original_articles_array as $each_article) {

            if ($each_article["lat"] == $got_lat && $each_article["lng"] == $got_lng) {
                array_push( $restaurant_info_array, $each_article);

            }

        }

       
        return $restaurant_info_array;

        



    }




















    




}
