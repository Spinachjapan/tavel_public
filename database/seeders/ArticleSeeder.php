<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use DB;
use Illuminate\Support\Str;

class ArticleSeeder extends Seeder
{

    private $gti;

    public function __construct()
    {
        $this->gti = app()->make('App\Retrieve\GetTestImage');
    }



    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        //$state = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"];

        $food_name = ["ramen1","ramen2", "ramen3", "burger1", "burger2", "burger3", "chinese1", "chinese2", "chinese3"];
        

       


        for ($i = 1; $i <= 10; $i++) {

            $random_food_photo = $food_name[rand(0,8)];
            

 
            DB::table('articles')->insert([
                'username' => "seeded_user",
                'restaurant' => Str::random(10),
                "state" => "NSW",
                "note" => Str::random(350),
                "star" => rand(1,5),
                "photo_type1" => $this->gti->get_test_image($random_food_photo)["test_photo_type"],
                "photo1" => $this->gti->get_test_image($random_food_photo)["test_photo"],
                "lat" => rand(-33872587836561, -33812482722842)/1000000000000,
                "lng" => rand(15077308944531, 15126834701367)/100000000000
                


            ]);
        }
    }
}
