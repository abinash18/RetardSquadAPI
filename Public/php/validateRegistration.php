
<?php
$username = $_POST['usernameinput'];
$pass = $_POST['passwordinput'];
$pass2 = $_POST['passwordinput2'];

if ($pass == $pass2) {
    echo '<script type="text/javascript" src="/js/AJAX_registeruser.js"></script>';
};

?>