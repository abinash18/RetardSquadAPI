<?php
	include ('dbconnect.php');
	$select = mysqli_query($connect, "SELECT * FROM categories");
	while ($row = mysqli_fetch_assoc($select)) {
		echo "<h1>".$row['category_title']."</h1>";
	}
?>