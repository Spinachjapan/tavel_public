<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAccountsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('accounts', function (Blueprint $table) {
            $table->string("username", 20);
            $table->string("taveler", 20)->nullable($valu = true);
            $table->string("account_id", 50);
            $table->string("profile_photo_type", 20)->nullable($value = true);
            $table->string("follower", 500)->nullable($value = true);

            $table->timestamps();
            $table->primary("username");
        });
        DB::statement("ALTER TABLE accounts ADD profile_photo MEDIUMBLOB");
   
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('accounts');
    }
}
