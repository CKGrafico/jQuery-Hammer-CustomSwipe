// Variables globales
var $doc = $(document);
var $win = $(window);

(function(){
	$("#left").customSwipe();
	$("#right").customSwipe({
		directions : {
			right : true
		}
	});
	$("#top").customSwipe({
		directions : {
			up : true
		}
	});
	$("#bottom").customSwipe({
		directions : {
			down : true
		}
	});

	$("#special:not(.off)").customSwipe({
		directions : {
			left : function(){
				alert ("Direction callback");
				$(this).addClass("off");
			}
		}
	},
	function(){
		alert ("General callback");
	});

	$("#omni1").customSwipe({
		directions : {
			left : true,
			up : true
		}
	});
	$("#omni2").customSwipe({
		directions : {
			left : true,
			right : true
		}
	});
	$("#omni3").customSwipe({
		directions : {
			left : true,
			down : true,
			right : true,
			up : true
		}
	});

	$("#gradient-left").customSwipe({
		directions : {
			gradient : true
		}
	});
})();