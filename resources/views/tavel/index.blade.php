<?php
ob_start();

?>





<!DOCTYPE html>
<html lang="en">

<head>







    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">


    <!-- <title>@yield("title")</title> -->
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">
    <link href="{{ mix('css/r.css') }}" rel="stylesheet">
    <script src="{{ mix('js/app.js') }}" defer></script>

    <script>
        function scrollToTop() {
  scrollTo(0, 0);
 }
    </script>







</head>




<body style="background-color: white;">

    　<div class="container">


        <header class="sticky-top">


         
                 <nav style="background-color: #ff9100;" class="navbar navbar-light">
    
    <a style="border: 2px solid white; padding:5px; border-radius:10px; color: white"
                        class="navbar-brand fontsize6-5" class="navbar-brand fontsize6-5">Tavel</a>


  </nav>
         

        </header>





        <main style="padding-bottom: 40px;">

            




            <h4 class="center" style="margin-top:10px; color: #ff9100;"><div id="page_state"></div></h4>



            <div id="content1"></div>





        </main>

        <footer class="fixed-bottom container">





        <nav class="navbar navbar-light">
    
    <a style="padding:5px; color: white"
                        class="navbar fontsize6-5" class="fontsize6-5"></a>

    <button onclick="scrollToTop()"  class="navbar no_dec_button fontsize5 orange_word">
     ▲TOP
    </button>
    
 
  </nav>


         
        





        </footer>




    </div>


</body>

</html>