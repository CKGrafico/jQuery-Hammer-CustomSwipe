/**
 * [customSwipe jQuery plugin that implements custom Swipe event (it depends of HammerJS http://eightmedia.github.io/hammer.js/)]
 * @param {Object}   params   [All options of the plugin]
 * params.container = The container of element
 * params.threshold = number between 0 to 1 that represents the final accuracy
 * params.directions = Directions for the swipe separated by commas left,up,down,right
 * params.delay = delay time after ends event
 * params.returntime = time necessary for return to initially position
 */
(function($){
	var end = false;

	$.fn.customSwipe = function(params,callback){
		// Default options

		var options = {
			container  : $(this).parent(),
			directions  : "left",
			delay 	   : 100,
			returntime : 50
		};

		// Save this jquery object
		var _this = $(this);

		// Extend default options with custom options
		options = $.extend(options, params);

		// Save the position of the element
		var $position = $(this).position();

		// Posible directions
		var directions = {
			left : function(){
				directions.move("dragleft","deltaX","left",0);
			},
			right : function(){
				directions.move("dragright","deltaX","left",1);
			},
			up : function(){
				directions.move("dragup","deltaY","top",0);
			},
			down : function(){
				directions.move("dragdown","deltaY","top",1);
			},
			move : function(drag,delta,direction,the_case){
				options.container.hammer().on(drag,_this.selector,function(e){
					var dif = ($position[direction])+(e.gesture[delta]);
					if(!end){
						if (the_case == 0 && dif >= 0 || the_case == 1 && (dif <= parseInt(options.container.width()-_this.width()) && direction == "left" || dif <= parseInt(options.container.height()-_this.height()) && direction == "top") ) {
							_this.css(direction,dif+"px");
						}else{
							end = true;
							var anim = {};
							anim[direction] = ($position[direction])+"px";
							_this.delay(options.delay).animate(anim,options.returntime,function(){
								doCallback();
								end = false;
							});
						}
					}
				});
			}
		}

		var init = function(){
			var dirs = options.directions.split(",");
			for (var i in dirs){
				directions[dirs[i]]();
			}
		}

		var doCallback = function(){
			// Do the calback if necessary
			if(callback){
				callback.call(_this);
			}else if(typeof params == "function"){
				params.call(_this);
			}
		}
		// returns each of the elements we have passed to the plugin
		// it allows you to chain multiple functions and plugins together on one jQuery element.
		return this.each(function(){
			init();
		});
	};
}(jQuery));