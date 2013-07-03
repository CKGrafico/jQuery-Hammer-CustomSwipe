// Variables globales
var $doc = $(document);
var $win = $(window);

(function(){
	$("#left").customSwipe();
	$("#right").customSwipe({directions : "right"});
	$("#top").customSwipe({directions : "up"});
	$("#bottom").customSwipe({directions : "down"});

	$("#special:not(.off)").customSwipe(function(){
		$(this).addClass("off");
	});

	$("#omni").customSwipe({directions : "left,up,right,down"});
})();