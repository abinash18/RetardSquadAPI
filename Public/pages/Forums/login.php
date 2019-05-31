<!DOCTYPE html>
<?php
    include ('layout_manager.php');
    include ('content_function.php');
?>
<html>
    <head>
        <title>
            Login
        </title>
        <meta http-equiv="pragma" content="no-cache" />
        <link rel="stylesheet" href="../../css/main.css" type="text/css">
        <link rel="stylesheet" href="../../css/forum-loginpage.css" type="text/css">
        <meta charset="utf-8;" />
        <script src="../../../js/jquery-3.3.1.min.js"></script>
        <script type="text/javascript" src="../../../js/loginpagefade.js"></script>
        <script type="text/javascript" src="../../../js/reg-login-errormessage.js"></script>
    </head>
    <body>           
            <div class="nav">
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
                        <a class="link" href="forum-reg-login.php">
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
        <div class="container" align="center">
            <h1 class="h1-loginpage">Login Mans!</h1>
            <?php
                session_start();
                loginform();
                if (isset($_SESSION['username'])) {
                    logout();
                }
                if (isset($_GET['status'])) {

                    $status = $_GET['status'];

                    if ($_GET['status'] == 'reg-success') {
                        error_goood_message("Registration successfull, please login.", "1");
                    } else if ($_GET['status'] == 'login-fail') {
                        error_goood_message("Login fail!", "2");
                    }
                }
            ?>
            <script type="text/javascript">

                    var status = "<?php echo $status; ?>"

                    // jQuery(document).ready(function() {
    
                    //     if (status = '') {
                    //         jQuery(".container").css("height", "500px");
                    //     } else {
                    //         jQuery(".container").css("height", "300px");
                    //     }
                   
                </script>
            <button type="button" id="register" onclick="location.href='register.php'">Register</button>
            <div align="center" class="footer">
                <p class="footer-text">Made from scratch by<div class="skewX-negative"><p class="skewX-positive">Abinash Singh</p></div></p>
            </div>
        </div>        
    </body>
</html>