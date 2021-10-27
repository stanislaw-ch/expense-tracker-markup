<?php
require('config.php');

if (isset($_POST)) {
  $postData = array(
    "email_address" => $_POST["email"],
    "status" => "pending"
  );

  $ch = curl_init($LINK_TO_LIST.$LIST_ID.'/members/');

  curl_setopt_array($ch, array(
    CURLOPT_POST => TRUE,
    CURLOPT_RETURNTRANSFER => TRUE,
    CURLOPT_HTTPHEADER => array(
      'Authorization: apikey '.$API_KEY,
      'Content-Type: application/json'
    ),
    CURLOPT_POSTFIELDS => json_encode($postData)
  ));

  $result = curl_exec($ch);
  $info = curl_getinfo($ch);

  // echo $response = $info["http_code"];
  echo $result;
};
?>

