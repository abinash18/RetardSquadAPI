<?php
	function loginform() {
		echo "<form action='validatelogin.php' method='POST'>
				<p>Username:</p>
                <input type='text' name='usernameinput' placeholder='Username m8' id='usernameinput' />
                <p>Password:</p>
                <input type='Password' placeholder='Pasword mans' name='passwordinput' id='passwordinput' />
                <br />
                <div style='margin-top:10px;'>
                <input type='submit' value='Login' />
                </div>
                </form>";
	}
        function logout() {
                echo nl2br("<p>Welcome <div class='username-background'><div class='username-text'>".$_SESSION['username']."</div></div>!\n Awsome to see you again!</p>
                        <form action='logout.php' method='GET'>
                        <input type='submit' value='Logout' /></form>");

        }
        function error_goood_message($message, $messagetype) {
                if (isset($messagetype)) {
                        if ($messagetype == 1) { //success message
                                echo "<div style='margin-top:10px;text-align:center;background-color:#d0f7aa;border: 2px solid #56a808;height:70px;width:260px;align-content:center;'><p style='color:#56a808;font-size:15px;font-weight:bold;'>".$message."</h6></div>";
                        } elseif ($messagetype == 2) { //error message
                                echo "<div style='margin-top:10px;text-align:center;background-color:#f7aaaa;border: 2px solid #af0505;height:70px;width:260px;align-content:center;'><p style='color:#af0505;font-size:15px;font-weight:bold;'>".$message."</p></div>";
                        }
                        
                } else {
                        echo "<div style='margin-top:10px;text-align:center;background-color:#f7aaaa;border: 2px solid #af0505;height:70px;width:260px;align-content:center;'><p style='color:#af0505;font-size:15px;font-weight:bold;'>Error!</p></div>";
                }
                
        }
?>