jQuery(document).ready(function () {

    // $('.dataTables_length').addClass('bs-select');
    jQuery.ajax({
        url: '/api/fstm/getskins',
        type: 'get',
        dataType: 'json',
        cache: false,
    }).done(function (data) {
        console.log(data)
        dataset = data.skins;
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
        $('#SkinTable').DataTable({
            data: data.skins,
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
                    'data': 'rarity'
                },
                {
                    'data': 'challenges'
                },
                {
                    'data': 'skinSeason'
                },
                {
                    'data': 'tier'
                },
                {
                    'data': 'trademarked'
                },
                {
                    'data': '_id',
                    'sortable': false,
                    'render': function (_id) {
                        return '<a href="/pages/profile.html?s=' + _id + '" target="_blank">' + _id + '</a>';
                    }
                },
                // { 'data': 'imagePreview' },
                // { 'data': 'skinPreview' },      
            ]
        });
    });
});