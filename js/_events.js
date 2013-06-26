// Variables globales
var $doc = $(document);
var $win = $(window);

(function(){
	$("#left").customSwipe();
	$("#right").customSwipe({direction : "right"});
	$("#top").customSwipe({direction : "top"});
	$("#bottom").customSwipe({direction : "bottom"});

	$("#special:not(.off)").customSwipe({direction : "left"},function(){
		$(this).addClass("off");
	});

	$("#omni").customSwipe({direction : "left"},function(){
		$(this).addClass("off");
	});
})();