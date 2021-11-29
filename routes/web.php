<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/', function () {
    return view("tavel.index");});


 Route::post('/get_articles', 'App\Http\Controllers\TavelController@get_articles');

 Route::get('/photo_output_article/{article_id}/{photo_num}/{date}', 'App\Http\Controllers\TavelController@photo_output_article');
 Route::get('/photo_output_account/{username}/{date}', 'App\Http\Controllers\TavelController@photo_output_account');


 Route::post('/check_account', 'App\Http\Controllers\TavelController@check_account');

 Route::post('/create_account', 'App\Http\Controllers\TavelController@create_account');

 Route::post('/check_username', 'App\Http\Controllers\TavelController@check_username');

 Route::post('/get_account_info', 'App\Http\Controllers\TavelController@get_account_info');

 Route::post('/article_photo_check', 'App\Http\Controllers\TavelController@article_photo_check');

 Route::post('/post_article', 'App\Http\Controllers\TavelController@post_article');

 Route::post('/get_article_info', 'App\Http\Controllers\TavelController@get_article_info');

 Route::post('/edit_article', 'App\Http\Controllers\TavelController@edit_article');

 Route::post('/get_taveler', 'App\Http\Controllers\TavelController@get_taveler');

 Route::post('/send_changed_profile_photo', 'App\Http\Controllers\TavelController@send_changed_profile_photo');

 Route::post('/change_taveler', 'App\Http\Controllers\TavelController@change_taveler');

 Route::post('/delete_account', 'App\Http\Controllers\TavelController@delete_account');

 Route::post('/delete_article', 'App\Http\Controllers\TavelController@delete_article');

 Route::post('/change_restaurant', 'App\Http\Controllers\TavelController@change_restaurant');

 Route::post('/change_state', 'App\Http\Controllers\TavelController@change_state');

 Route::post('/change_area', 'App\Http\Controllers\TavelController@change_area');

 Route::post('/change_info', 'App\Http\Controllers\TavelController@change_info');

 Route::post('/get_all_positions', 'App\Http\Controllers\TavelController@get_all_positions');

 Route::post('/get_restraurant_info', 'App\Http\Controllers\TavelController@get_restraurant_info');

 Route::post('/follow_manage', 'App\Http\Controllers\TavelController@follow_manage');

 Route::post('/good_manage', 'App\Http\Controllers\TavelController@good_manage');


 Route::post('/search_username', 'App\Http\Controllers\TavelController@search_username');