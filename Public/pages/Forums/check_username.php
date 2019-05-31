<?php
	include ('dbconnect.php');
	$usernametocheck = $_GET['username'];

	$result = mysqli_query($connect, "SELECT username FROM users WHERE username = '".$usernametocheck."'");

				if (mysqli_num_rows($result) != 0) {
					echo "<img href='negative.png'></img>";
				} else {
					echo "<img href='check_mark.png'></img>";
				}
?>