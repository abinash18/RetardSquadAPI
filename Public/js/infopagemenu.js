jQuery(document).ready(function() {
    var navOffset = jQuery(".nav-placeholder").offset().top;
    
    jQuery(window).scroll(function() {
        var scrollPos = jQuery(window).scrollTop();
        
        if (scrollPos >= navOffset) {
            jQuery(".subtitle-infopage").addClass("maxtitle2");
        } else {
            jQuery(".subtitle-infopage").removeClass("maxtitle2");
        }
    })  
})