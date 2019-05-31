jQuery(document).ready(function () {
    jQuery("#create").on("click", function () {
        jQuery("#success-dismiss").addClass("hidden");
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://127.0.0.1/api/makePage",
            "method": "POST",
            "data": {
                "route": jQuery("#inputroute").val(),
                "name": jQuery("#inputPathName").val(),
                "adminPage": jQuery('input[type=checkbox]').prop('checked')
            }
        }
        
        $.ajax(settings).done(function (response) {
            var formattedData = JSON.stringify(response, null, '\t');
            console.log(response);
            console.log(formattedData);
            jQuery("#success-dismiss").removeClass("hidden");
            jQuery("#callout-title").html("Success");
            jQuery("#callout-body").html(formattedData);
        });
        load();
    });
    jQuery("#callout-close").on("click", function () {
        jQuery("#success-dismiss").addClass("hidden");
    });

    jQuery("#deletebutton").on("click", function () {
        jQuery("#success-dismiss").addClass("hidden");
        console.log(jQuery("#deletebutton").attr("name"));
        // var settings = {
        //     "async": true,
        //     "crossDomain": true,
        //     "url": "http://127.0.0.1/api/makePage",
        //     "method": "POST",
        //     "data": {
        //         "id": jQuery("#deletebutton").attr("name").val()
        //     }
        // }
        
        // $.ajax(settings).done(function (response) {
        //     var formattedData = JSON.stringify(response, null, '\t');
        //     console.log(response);
        //     console.log(formattedData);
        //     jQuery("#success-dismiss").removeClass("hidden");
        //     jQuery("#callout-title").html("Success");
        //     jQuery("#callout-body").html(formattedData);
        // });
    });

    jQuery("#deletebutton").on("click", function (e) {
        jQuery("#success-dismiss").addClass("hidden");
        var val = jQuery(this).val();
        alert(this);
        // var settings = {
        //     "async": true,
        //     "crossDomain": true,
        //     "url": "http://127.0.0.1/api/makePage",
        //     "method": "POST",
        //     "data": {
        //         "id": jQuery("#deletebutton").attr("name").val()
        //     }
        // }
        
        // $.ajax(settings).done(function (response) {
        //     var formattedData = JSON.stringify(response, null, '\t');
        //     console.log(response);
        //     console.log(formattedData);
        //     jQuery("#success-dismiss").removeClass("hidden");
        //     jQuery("#callout-title").html("Success");
        //     jQuery("#callout-body").html(formattedData);
        // });
    });

});

    // $('.dataTables_length').addClass('bs-select');
    jQuery.ajax({
        url: '/api/avalPages',
        type: 'get',
        dataType: 'json',
        cache: false,
    }).done(function (data) {
        console.log(data)
        dataset = data.sitemap;
        // $(data.skins).each(function (index, value) {
        //     dataset = [value.skinPreview, value._id];
        //     // _tr =
        //     //     '<tr><td><input type="checkbox" onclick="return checklimit()" name="chk" class="single-checkbox" value="' +
        //     //     value._id +
        //     //     '"></td><td><p>' + value.name +
        //     //     '</p></td><td><a href="/FSTM/skin.html?s=' + value
        //     //     ._id +
        //     //     '">Details</a></td><td><td><img <img style="width: 100px; length: 50px;" src="' +
        //     //     value.skinPreview + '"></td></tr>'
        //     // $("#tbody").append(_tr);
        // });
        $('#pageTable').DataTable({
            data: data.sitemap.paths,
            'paging': true,
            'lengthChange': true,
            'searching': true,
            'ordering': true,
            'info': true,
            'autoWidth': false,
            columns: [{
                    'data': 'name'
                },
                {
                    'data': 'admin'
                },
                {
                    'data': 'dev'
                },
                {
                    'data': 'route',
                    'render': function (route) {
                        return '<a id="deletebutton" href="' + route + '" target="_blank">' + route + '</a>';
                    }
                },
                {
                    'data': '_id',
                    'sortable': false                    
                },
                {
                    'data': '_id',
                    'render' : function (_id) {
                        return '<button id="deletebutton" value="' + _id + '">' + _id + '</button>';
                    }
                }
                // { 'data': 'imagePreview' },
                // { 'data': 'skinPreview' },      
            ]
        });
    });