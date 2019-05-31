<?php
	include ('dbconnect.php');
	include ('layout_manager.php');
	include ('content_fuction.php');
	include ('check_username.php');
	
	$function = $_GET['funci'];

	if (isset($_GET['username'])) {
		$usernametodecode = $_GET['username'];
		$username = atob($usernametodecode);
		echo "ok";
	}
?>