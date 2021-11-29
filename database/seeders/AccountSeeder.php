<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use DB;

class AccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('accounts')->insert([
            'username' => "seeded_user",
            'taveler' => "seeded_taveler",
            "account_id" => "seeded_account_id",
            
        ]);



        
    }
}
