jQuery(document).ready(function() {

    var usernametocheck = usernameinput;
    var functiontouse = 1

    jQuery("#usernameinput").keyup(function() {
        jQuery.post('functions.php', {
            username: usernametocheck
            funci: functiontouse
        },
        function(result) {
            jQuery("#message").html(result).show();
        });
    });    
});