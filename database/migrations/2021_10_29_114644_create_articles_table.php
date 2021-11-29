<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateArticlesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->integer("article_id")->autoIncrement();
            $table->string("username", 20);
            $table->string("restaurant", 40)->nullable($value = true);
            $table->string("state", 10);
            $table->string("area", 40)->nullable($value = true);
            $table->string("note", 550)->nullable($value = true);
            $table->string("hash_value", 255)->nullable($value = true);
            $table->integer("star");
            $table->string("photo_type1", 20);
            $table->string("photo_type2", 20)->nullable($value = true);
            $table->string("photo_type3", 20)->nullable($value = true);
            $table->string("photo_type4", 20)->nullable($value = true);
            $table->string("photo_type5", 20)->nullable($value = true);
            $table->string("photo_type6", 20)->nullable($value = true);
            $table->string("good", 500)->nullable($value = true);
            $table->double("lat")->nullable($value = true);
            $table->double("lng")->nullable($value = true);
            $table->timestamps();

            $table->foreign('username')->references('username')->on('accounts')->onUpdate('CASCADE')->onDelete('CASCADE');
        });


        DB::statement("ALTER TABLE articles ADD photo1 MEDIUMBLOB");
        DB::statement("ALTER TABLE articles ADD photo2 MEDIUMBLOB");
        DB::statement("ALTER TABLE articles ADD photo3 MEDIUMBLOB");
        DB::statement("ALTER TABLE articles ADD photo4 MEDIUMBLOB");
        DB::statement("ALTER TABLE articles ADD photo5 MEDIUMBLOB");
        DB::statement("ALTER TABLE articles ADD photo6 MEDIUMBLOB");


    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('articles');
    }
}
