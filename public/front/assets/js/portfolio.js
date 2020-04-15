/* ============================================================
 * Portfolio Init
 * ============================================================ */
'use strict';

//Intialize Slider
var slider = new Swiper('#hero', {});

//Intialize Testamonials
var testimonials_slider = new Swiper('#demo-testimonial-1 .swiper-container', {
	paginationClickable: true,
	nextButton: '.swiper-button-next',
	prevButton: '.swiper-button-prev',
	parallax: true,
	autoplay: 5000,
	speed: 1000
});
