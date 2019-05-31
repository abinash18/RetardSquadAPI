jQuery(document).ready(function () {
    jQuery.ajax({
        url: '/api/admin',
        type: 'get',
        dataType: 'json',
        cache: false,
    }).done(function (data) {
        console.log(data);
        if (data.admin == false) {
            window.location.replace('/pages/login?m=Admin Only Restricted Area');
        } else {
            jQuery(document).attr('title', "Welcome");
        };
    });
    jQuery.ajax({
        url: '/api/profiles',
        type: 'get',
        dataType: 'json',
        cache: false
    }).done(function (data) {
        var users = data.users;
        var count = users.length;
        console.log(count);
        jQuery("#userCount").html(count);
    });
    jQuery.ajax({
        url: '/api/fstm/getskins',
        type: 'get',
        dataType: 'json',
        cache: false
    }).done(function (data) {
        var Skins = data.skins;
        var count = Skins.length;
        console.log(count);
        jQuery("#skinCount").html(count);
    });    
    jQuery.ajax({
        url: '/api/fstm/gettrademarks',
        type: 'get',
        dataType: 'json',
        cache: false
    }).done(function (data) {
        console.log(data);
        var Tms = data.skins;
        var count = Tms.length;
        console.log(count);
        jQuery("#tmCount").html(count);
    });
    jQuery.ajax({
        url: '/api/profileById?u=self',
        type: 'get',
        dataType: 'json',
        cache: false,
    }).done(function (data) {
        console.log(data);
       jQuery("#userDropDown").html('<img src="' + data.raw.profilePic + '" class="user-image" alt="User Image">' +
       '<span class="hidden-xs">' + data.raw.username + '</span>');
       jQuery("#bigUserImage").html('<img src="' + data.raw.profilePic + '" class="img-circle" alt="User Image">' +
       '<p>' +
       data.raw.username + ' - ' + data.raw.roles +
       '<small>Member since Nov. 2012</small>' +
     '</p>');
     jQuery("#sidebaruser").html(data.raw.username);
    });

    // jQuery(".link").on("click", function(){
    //     console.log(jQuery(this).val());
    // });

    // function addSkinsPanel() {

    // }
    // jQuery("#addskins").on("click", function () {
    //     _addSkinsPanel = '<form name="addSkins" action="">' +
    //         '<p>Enter Skin Name</p>' +
    //         '<input name="name" placeholder="Formatted name of skin">' +
    //         '<p>Enter Skin Rarity</p>' +
    //         '<input name="rarity" placeholder="(1-4) Green - Blue - Purple - Gold" requierd>' +
    //         '<label value="Season:"></p>' +
    //         '<p>Skin Season</p>' +
    //         '<input name="skinSeason" placeholder="the season the skin came out" required>' +
    //         '<p>Tier:</p>' +
    //         '<input name="tier" placeholder="If not in battle pass just leave empty">' +
    //         '<p>Provied a link for the preview image</p>' +
    //         '<input name="imagePreview" placeholder="Paste the link if u have it from another website">' +
    //         '<p>Paste a link for the full body image</p>' +
    //         '<input name="skinPreview" placeholder="Paste the link if u have it from another website">' +
    //         '<input type="button" id="submitaddskin" value="Add Skin">' +
    //         '</form>'
    //     // jQuery("#panel").last().remove();
    //     jQuery("#panel").html(_addSkinsPanel);
    // })
    jQuery("#regex").on("click", function () {
        data = {
            name: jQuery("#inputname").val(),
            prev: jQuery("#inputprev").val(),
            rarity: jQuery("#inputrarity").val(),
            season: jQuery("#inputseason").val(),
            tier: jQuery("#inputTier").val(),
            chall: jQuery("#inputchall").val()
        };
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "/api/fstm/submitskin",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded",
                "cache-control": "no-cache",
            },
            data: {
                name: jQuery("#inputname").val(),
                prev: jQuery("#inputprev").val(),
                rarity: jQuery("#inputrarity").val(),
                season: jQuery("#inputseason").val(),
                tier: jQuery("#inputTier").val(),
                chall: jQuery("#inputchall").val()
            },
            beforeSend: function () {
                jQuery("#addskinform").attr("class", "horizontal-form overlay")
                jQuery("#addskinform").append('<i class="fa fa-refresh fa-spin"></i>');
            }
        };
        $.ajax(settings).done(function (response) {
            console.log(response);
            sm = '<div class="box box-success box-solid">' +
                '<div class="box-header with-border">' +
                '<h3 class="box-title">Success</h3>' +

                '<div class="box-tools pull-right">' +
                '<button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>' +
                '</div>' +
                '</div>' +
                '<div id="successMessage" class="box-body">' +

                '</div>' +
                '</div>'
            jQuery("#messageSection").html('<div class="box box-success box-solid">' +
                'div class="box-header with-border">' +
                '<h3 class="box-title">Success: ' + response.ms + '</h3>' +
                '<div class="box-tools pull-right">' +
                '<button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>' +
                '</div>' +
                '</div>' +
                '<div id="successMessage" class="box-body">' +
                '<div> <p>Link To Skin Page: <p> ' +
                '<a href="/profile?s=' + response.raw._id + '">' + response.raw._id + '</a>' +
                '</div>' +
                '</div>' +
                '</div>'
            );
            jQuery("#addskinform").trigger("reset");
        });
        // jQuery("#messageSection").html('<div class="box box-success box-solid">' +
        //     '<div class="box-header with-border">' +
        //     '<h3 class="box-title">Success</h3>' +

        //     '<div class="box-tools pull-right">' +
        //     '<button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>' +
        //     '</div>' +
        //     '</div>' +
        //     '<div id="successMessage" class="box-body">' +

        //     '</div>' +
        //     '</div>');
        jQuery("#addskinform").trigger("reset");
        // jQuery("#addskinform").html('');
    });
    jQuery("#addCode").on("click", function () {
        data = {
            code: jQuery("#addCode").val()
        };
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "/api/adminregcode",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded",
                "cache-control": "no-cache",
            },
            data: {"code": jQuery("#addCode").val()},
            beforeSend: function () {
                jQuery("#addAdminCode").attr("class", "horizontal-form overlay")
                jQuery("#addAdminCode").append('<i class="fa fa-refresh fa-spin"></i>');
            }
        };
        $.ajax(settings).done(function (response) {
            console.log(response);
            jQuery("#addAdminCode").trigger("reset");
        });
        // jQuery("#messageSection").html('<div class="box box-success box-solid">' +
        //     '<div class="box-header with-border">' +
        //     '<h3 class="box-title">Success</h3>' +

        //     '<div class="box-tools pull-right">' +
        //     '<button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>' +
        //     '</div>' +
        //     '</div>' +
        //     '<div id="successMessage" class="box-body">' +

        //     '</div>' +
        //     '</div>');
        jQuery("#addAdminCode").trigger("reset");
        // jQuery("#addskinform").html('');
    });

    jQuery(document).ready(function () {
        if (document.cookie.split(';').filter((item) => item.includes('admin=')).length) {
            jQuery("#navbarAdmin").append('<li><a href="/AdminCP/"><i class="fa fa-cogs"></i>Admin Control Panel</a></li>');
        }
    });
    
    jQuery(document).ready(function(){
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://127.0.0.1/api/avalPages",
            "method": "GET",
          }
          
          $.ajax(settings).done(function (response) {
            console.log(response.sitemap.paths);
    
            jQuery(response.sitemap.paths).each(function(index, value){
                console.log(value);
                jQuery("#navbarAdmin").append('<li><a href="' + value.route + '"><i class="fa fa-circle-o"></i>' + value.name + '</a></li>');
            });
    
          });
    });

});