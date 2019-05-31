<?php

$curl = curl_init();
$email = $_POST['emailinput'];
$password = $_POST['passwordinput'];
curl_setopt_array($curl, array(
  CURLOPT_PORT => "3030",
  CURLOPT_URL => "http://127.0.0.1:3030/login",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => "{\n\t\"email\": \"$email\",\n\t\"password\": \"$password\"\n}",
  CURLOPT_HTTPHEADER => array(
    "cache-control: no-cache",
    "content-type: application/json"
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo "setcookie()";
}
?>