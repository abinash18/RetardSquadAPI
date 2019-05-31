<!DOCTYPE html>
<?php
    include ('layout_manager.php');
    include ('content_function.php');
?>
<html>
	<head>
        <title>
            XxR!SxX Team Fourms
        </title>
        <meta http-equiv="pragma" content="no-cache" />
        <link rel="stylesheet" href="../../css/main.css" type="text/css">
        <link rel="stylesheet" href="../../css/forum-landing.css" type="text/css">
        <link rel="stylesheet" href="../../css/forum-index.css" type="text/css">
        <script src="../../js/jquery-3.3.1.min.js"></script>
        <script type="text/javascript" src="../../js/menu.js"></script>
		<meta charset="utf-8;" />
	</head>
    <body>        
        
        <div class="fill">             
            <div class="nav">
                <div class="subtitle-infopage">                
                    <h2>
                        Information About Us m8                  
                    </h2>                   
                </div>
                <div class="line">
                </div>
                <ul class="menu">
                    <li class="inactive">
                        <a class="link" href="../../index.html">
                            Home
                        </a>
                    </li>
                    <li class="inactive">
                        <a class="link" href="../../pages/Info/info.html">
                            Info
                        </a>
                    </li>
                    <li class="inactive">
                        <a class="link" href="#">
                            Home
                        </a>
                    </li>
                    <li class="active">
                        <a class="link" href="#">
                            Forums
                        </a>
                    </li>
                    <li class="inactive">
                        <a class="link" href="#">
                            Home
                        </a>
                    </li>
                </ul>
            </div>
        </div>        
            <div class="loginpane">     
                <?php
                    session_start();
                    if (isset($_SESSION['username'])) {
                        logout();
                        //logout
                    } else {
                        // if (isset($_GET['status'])) {
                        //     if ($_GET['status'] == 'reg-success') {
                        //         echo "<h2 style='color: green;'>New User Registered Succesfully!</h2>";
                        //     } else if ($_GET['status'] == 'login_fail') {
                        //         echo "<h2 style='color: red;'>Invalid Password Or Username!</h2>";
                        //     } else if ($_GET['status'] == 'password-notgud') {
                        //         echo "<h2 style='color: red;'>Invalid Password its no gud man its prolly empty m8!</h2>";
                        //     } else if ($_GET['status'] == 'username-notgud') {
                        //         echo "<h2 style='color: red;'>Invalid username its no gud man its prolly empty or its bein used m8!</h2>";
                        //     }
                        // }
                        // // loginform();
                    }
                ?>
            </div>
        <div class="content">
            <a href="login.php">Login</a>
            <?php
                displaycategories();
            ?>
        </div>
        <!-- Footer -->
        <footer id="footer">
            XxR!SxX Copyright 2018&#169;(not really)
        </footer>
    </body>
</html>