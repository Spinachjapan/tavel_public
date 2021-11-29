<?php

namespace App\Retrieve;
use App\Models\Account;
use App\Models\Article;
use App\Models\DefaultPhoto;
use App\Models\TestPhoto;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Cache;

class GetTestImage
{

    public function get_test_image(string $name)
    {

      return  TestPhoto::select("test_photo", "test_photo_type")->where("test_photo_title", $name)->first(); 



    }

    
}