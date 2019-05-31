jQuery(document).ready(function() {
    jQuery("#submit").prop("disabled", true);
    jQuery("#usernameinput, #passwordinput, #emailinput, #passwordinput2").keyup(function() {
        var unencodedUname = jQuery("#usernameinput").val();
        var unencodedPass = jQuery("#passwordinput").val();
        var unencodedEmail = jQuery("#emailinput").val();
        var unencodedPass2 = jQuery("#passwordinput2").val();
        if (unencodedUname != "") {
            if (unencodedPass != ""){
                if (unencodedPass2 != ""){
                    if (unencodedPass = unencodedPass2) {
                        if (unencodedEmail != ""){
                            jQuery("#submit").prop("disabled", false);
                            jQuery("#submit").click(function() {                            
                            
                                var encodedPass = btoa(unencodedPass);
                                var encodedUname = btoa(unencodedUname);
                                var encodedemail = btoa(unencodedEmail);
                                console.log(encodedPass + encodedUname);
                                jQuery.post('/api/validateregistration', {
                                    encodedUsername: encodedUname,
                                    encodedPassword: encodedPass,
                                    encodedEmail: encodedemail
                                },
                                function(result) {
                                    console.log(result);
                                    if (result.status == 'OK') {
                                        window.location.replace(result.url);
                                    }
                                });
                            }); 
                        } else {
                            jQuery("#message").html("Please Enter A Email").show();
                            jQuery("#submit").prop("disabled", true);
                        }
                    } else {
                        jQuery("#message").html("Psswords dont match").show();
                        jQuery("#submit").prop("disabled", true);
                    }       
                } else {
                    jQuery("#message").html("Please confirm pass").show();
                    jQuery("#submit").prop("disabled", true);
                }
            } else {
                jQuery("#message").html("Please Enter A password").show();
                jQuery("#submit").prop("disabled", true);
            }
        } else {
            jQuery("#submit").prop("disabled", true);
            jQuery("#message").html("Please Enter A Username").show();
            
        }
          
    });  
});