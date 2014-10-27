'use strict';

var michaelwatts = (function ($) {

    var indexPostClass = '.index-post',
        mobileMenuButton = '.mobile-menu a',
        mobileMenuCloseButton = '.mobile-close-btn',
        mainMenu = '.menu',
        bgCheckClass = '.bg-check',
        postBgImages = '.bg-img img',
        postCoverImg = '.post-header .bg-img',
	    indexPostClass = '.home-article-list',

    mobileMenu = function () {
        if($(mainMenu).length) {
            $(mobileMenuButton).on('click', function(e){
                e.preventDefault();
                $(mainMenu).addClass('opened');
            });
            $(mobileMenuCloseButton).on('click', function(e){
                e.preventDefault();
                $(mainMenu).removeClass('opened');
            });
        }
    },

    headerTitlesBackgroundCheck = function () {
        if ($(bgCheckClass).length && $(postBgImages).length) {
            BackgroundCheck.init({
                targets: bgCheckClass,
                images: postBgImages
            });
        }
    },

    postHeaderCoverImg = function () {
        var coverImage = $('[alt=cover-image]');
        if (coverImage.length) {
            $(postCoverImg).append('<img src="' + coverImage.attr('src') + '">');
            coverImage.remove();
        }
    },

    // javascripts initialization
    init = function () {
        postHeaderCoverImg();
        mobileMenu();
        headerTitlesBackgroundCheck();
    };

    return {
        init: init
    };

})(jQuery);

(function () {
	michaelwatts.init();
})();