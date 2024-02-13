<?php
    $data = '[
        {"id" : "1", "name" : "가나다", "email" : "abc@naver.com"},
        {"id" : "2", "name" : "라마바", "email" : "def@naver.com"},
        {"id" : "3", "name" : "사아자", "email" : "ghi@naver.com"},
        ]';
    echo $_GET["callback"]."(".$data.")";
?>