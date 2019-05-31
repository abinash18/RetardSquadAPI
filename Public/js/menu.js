jQuery(document).ready(function() {
    var navOffset = jQuery(".nav").offset().top;
    
    var hasfixed = jQuery(".nav").hasClass("fixed");
    
    jQuery(".nav").wrap('<div class="nav-placeholder"></div>');
    
    jQuery(".nav-placeholder").height(jQuery("div.fill").height);
    
    jQuery(".nav").wrapInner('<div class="nav-inner"></div>');
    
    jQuery(window).scroll(function() {
        var scrollPos = jQuery(window).scrollTop();
        
        if (scrollPos >= navOffset) {
            jQuery(".nav").addClass("fixed");
            jQuery("div.subtitle").addClass("maxtitle");
            jQuery("h1").addClass("remove");
            jQuery("div.line").addClass("aline");
        } else {
            jQuery(".nav").removeClass("fixed");
            jQuery("div.subtitle").removeClass("maxtitle");
            jQuery("h1").removeClass("remove");
            jQuery("div.line").removeClass("aline");
        }
    });
});