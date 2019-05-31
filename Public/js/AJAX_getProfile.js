$(document).ready(function (e) {
    var urlParams = new URLSearchParams(window.location.search);

    if (urlParams.get('s') != null) {
        jQuery.ajax({
            url: '/api/fstm/skinById?s=' + urlParams.get('s'),
            type: 'get',
            dataType: 'json',
            cache: false,
        }).done(function (data) {
            console.log(data);
            jQuery("#username").append(data.raw.username);
            jQuery("#email").append(data.raw.email);
            jQuery("#profileid").append(data.raw.profileid);
            jQuery("#profilePic").html(
                '<img class="w3-center" style="border-radius: 25pt;width: 200px; length: 400px;" src=' +
                data.raw.profilePic + '></img>');
            jQuery("#roles").append(data.raw.roles);
        });
    } else {
        if (urlParams.get('u') == null) {
            jQuery.ajax({
                url: '/api/profileById?u=self',
                type: 'get',
                dataType: 'json',
                cache: false,
            }).done(function (data) {
                jQuery("#username").append(data.raw.username);
                jQuery("#email").append(data.raw.email);
                jQuery("#profileid").append(data.raw.profileid);
                jQuery("#profilePic").html(
                    '<img class="w3-center" style="border-radius: 25pt;width: 200px; length: 400px;" src=' +
                    data.raw.profilePic + '></img>');
                jQuery("#roles").append(data.raw.roles);
            });
        } else {
            jQuery.ajax({
                url: '/api/profileById?u=' + urlParams.get('u'),
                type: 'get',
                dataType: 'json',
                cache: false,
            }).done(function (data) {
                jQuery("#username").append(data.raw.username);
                jQuery("#email").append(data.raw.email);
                jQuery("#profileid").append(data.raw.profileid);
                jQuery("#profilePic").html(
                    '<img class="w3-center" style="border-radius: 25pt;width: 200px; length: 400px;" src=' +
                    data.raw.profilePic + '></img>');
                jQuery("#role").append(data.raw.roles);
            });
        };
    }


});