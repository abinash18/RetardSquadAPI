jQuery(document).ready(function load(){
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
            jQuery("#navbar").append('<a href="' + value.route + '" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">' + value.name + '</a>');
        });


      });
});