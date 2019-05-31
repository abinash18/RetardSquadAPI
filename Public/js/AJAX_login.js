jQuery(document).ready(function () {
    // jQuery("#submit").prop("disabled", true);
    jQuery("#passwordinput, #emailinput").keyup(function () {
        var unencodedPass = jQuery("#passwordinput").val();
        var unencodedEmail = jQuery("#emailinput").val();
        if (unencodedPass != "") {
            if (unencodedEmail != "") {
                jQuery("#submit").prop("disabled", false);
                jQuery("#submit").click(function () {

                    // var encodedPass = btoa(unencodedPass);
                    // var encodedemail = btoa(unencodedEmail);
                    jQuery.post('/api/login', {
                            pass: unencodedPass,
                            email: unencodedEmail
                        },
                        function (result) {
                            console.log(result);
                            if (result.status == 'OK') {
                                // window.sessionStorage.setItem('token', result.ct);
                                // window.location.replace(result.url);
                            }
                        });
                });
            } else {
                jQuery("#message").html("Please Enter A Email").show();
                jQuery("#submit").prop("disabled", true);
            }


        } else {
            jQuery("#message").html("Please Enter A password").show();
            jQuery("#submit").prop("disabled", true);
        }
    });
});