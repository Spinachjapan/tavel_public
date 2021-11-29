<?php
 
namespace Tests\Feature\Database;
 
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Schema;
use Tests\TestCase;
 
class DatabaseTest extends TestCase
{
    public function testDatabase()
    {
        $this->assertTrue(
            Schema::hasColumns('accounts', [
                'username',"taveler"
            ]),
            1
        );
    }
}