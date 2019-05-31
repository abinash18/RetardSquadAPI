<?php
	function displaycategories () {
		include ('dbconnect.php');

		$select = mysqli_query($connect, "SELECT * FROM categories");

		while ($row = mysqli_fetch_assoc($select)) {
			echo "<table class='category-table' cellspaceing='2px' cellborder='2px'>";
			echo "<tr><td class='main-category' colspan='2'>".$row['category_title']."</td></tr>";
			displaysubcategories($row['cat_id']);
			echo "</table>";
		}
	}

	function displaysubcategories ($parent_id) {
		include ('dbconnect.php');

		$select = mysqli_query($connect, "SELECT cat_id, subcat_id, subcategory_title, subcategory_desc FROM categories, subcategories
		 WHERE ($parent_id = categories.cat_id) AND ($parent_id = subcategories.parent_id)");
		echo "<tr><th width='50%'>Categories</th><th width='50%'>Topics</th></tr>";
		while ($row= mysqli_fetch_assoc($select)) {
			echo "<tr><td class='category_title'><a href='/topics.php?cid=".$row['cat_id']."&scid=".$row['subcat_id']."'>".$row['subcategory_title']."<br />";
			echo $row['subcategory_desc']."<a/></td>";
			echo "<td class='num-topics'>".getnumtopics($parent_id, $row['subcat_id'])."</td></tr>";
		}
	}

	function getnumtopics ($cat_id, $subcat_id) {
		include ('dbconnect.php');

		$select = mysqli_query($connect, "SELECT category_id, subcategory_id FROM topics WHERE ".$cat_id." = category_id AND ".$subcat_id." = subcategory_id");
		return mysqli_num_rows($select);
	}
?>