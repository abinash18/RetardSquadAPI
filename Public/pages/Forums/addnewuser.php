<?php
	include ('dbconnect.php');

	$newuser = $_POST['usernameinput'];
	$newpassword = $_POST['passwordinput'];

		if (strlen($newuser) != 0) {

			if (strlen($newpassword) != 0) {

				$result = mysqli_query($connect, "SELECT username FROM users WHERE username = '".$newuser."'");

				if (mysqli_num_rows($result) != 0) {

					header("Location: register.php?status=reg-fail-username-exists");
				
				} else {

					$insert = mysqli_query($connect, "INSERT INTO users (`username`, `password`) VALUES ('".$newuser."', '".sha1($newpassword)."')");
		
					if ($insert) {

						header("Location: login.php?status=reg-success");
					}

				}

			} else {

				header("Location: register.php?status=reg-fail-password-empty");
			}

		} else {

			header("Location: register.php?status=reg-fail-username-empty");

		}
?>