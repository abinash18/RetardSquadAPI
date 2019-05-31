<?php
	session_start();

	include ('dbconnect.php');

	$username = $_POST['usernameinput'];
	$password = $_POST['passwordinput'];

	$result = mysqli_query($connect, "SELECT username, password FROM users WHERE username = '".$username."' AND password = '".sha1($password)."'");

		if (mysqli_num_rows($result) != 0) {
			$_SESSION['username'] = $username;
			header("Location: login.php?status=loggedin");
		} else {
			header("Location: login.php?status=login-fail");
		}
?>