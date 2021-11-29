<?php
 
namespace Tests\Unit\TavelController;
 
use PHPUnit\Framework\TestCase;
use App\Sample;


 
class TavelControllerTest extends TestCase
{


      /**
     * @test
     */
    public function test_oo()
    {
        
        $postdata = http_build_query(
            array(
                'new_username' => 'seeded_user',
                
            
            )
        );
        $opts = array('http' =>
            array(
                'method' => 'POST',
                'header' => 'Content-type: application/x-www-form-urlencoded',
                'content' => $postdata
            )
        );
        $context = stream_context_create($opts);
        $result = file_get_contents('http://localhost:8080/check_username', false, $context);

        $this->assertEquals(true, $result);
       
    }




}
