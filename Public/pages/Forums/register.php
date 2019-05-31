<?php
    include ('layout_manager.php');
?>
<!DOCTYPE html>
<html>
    <head>
        <title>
            Login
        </title>
        <meta http-equiv="pragma" content="no-cache" />
        <link rel="stylesheet" href="../../css/main.css" type="text/css">
        <link rel="stylesheet" href="../../css/forum-registerpage.css" type="text/css">
        <meta charset="utf-8;" />
        <script src="../../../js/jquery-3.3.1.min.js"></script>
        <script type="text/javascript" src="../../../js/registerpagefade.js"></script>
        <script type="text/javascript" src="../../../js/reg-login-errormessage.js"></script>
        <script type="text/javascript" src="../../../js/AJAX_checkusername.js"></script>
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
                    <a class="link" href="pages/Info/info.html">
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
        <div class="container">
            <h1 class="h1-registerpage">Register mans!</h1>
            <!-- <form action="addnewuser.php" method="POST">
                <p>Username:</p>
                <input type="text" name="usernameinput" id="usernameinput" />
                <p>Password:</p>
                <input type="Password" name="passwordinput" id="passwordinput" />
                <input type="submit" value="Register" />
            </form> -->
            <form action="addnewuser.php" method="POST">
                <p>Username:</p>
                <div>
                    <input type="text" name="usernameinput" placeholder="Username m8" id="usernameinput" />
                </div>
                <p>Password:</p>
                <input type="Password" placeholder="Pasword mans" name="passwordinput" id="passwordinput" />
                <br />
                <div style="margin-top:10px;">
                    <input type="submit" value="Register" />                
                </div>
            </form>
            
            <div class="message">
                <?php
                    if (isset($_GET['status'])) {
                        $status = $_GET['status'];
                        if ($_GET['status'] == 'reg-fail-username-empty') {
                            error_goood_message("Invalid Username its prolly empty m8!", "2");
                        } else if ($_GET['status'] == 'reg-fail-password-empty') {
                            error_goood_message("Invalid password its prolly empty m8!", "2");
                        } else if ($_GET['status'] == 'reg-fail-username-exists') {
                            error_goood_message("User already exists m8!", "2");
                        }
                    }
                ?>
                <script type="text/javascript">
                    jQuery(document).ready(function() {                        
                        var status = "<?php echo $status; ?>";
                        jQuery("#usernameinput").keyup(function() {
                            alert(jQuery("#usernameinput").val());
                        });
                        var usernameinput = btoa(jQuery("#usernameinput").val());
                        alert(usernameinput);

                        if (status != '') {
                            jQuery(".container").css("height", "475px");
                        } else {
                            jQuery(".container").css("height", "350px");
                        };
                    };                
                </script>
                <a class="loginlink" href="login.php">Login Here.</a>
            </div>
            <div align="center" class="footer">
                <p class="footer-text">Made from scratch by<div class="skewX-negative"><p class="skewX-positive">Abinash Singh</p></div></p>
            </div>
        </div> 
    </body>
</html>