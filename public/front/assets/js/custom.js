/* ============================================================
 * Portfolio Init
 * ============================================================ */
'use strict';
$(function() {

	//Intialize Slider
	var slider = new Swiper('#hero', {
		pagination: {
			el: '.swiper-pagination',
			clickable: true
		},
		slidesPerView: 1,
		keyboard: {
			enabled: true,
		},
		mousewheel: true,
		paginationClickable: true,
		nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev',
		parallax: true,
		speed: 1000
	});

})