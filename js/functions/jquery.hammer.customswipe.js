/**
 * [customSwipe jQuery plugin that implements custom Swipe event (it depends of HammerJS http://eightmedia.github.io/hammer.js/)]
 * @param {Object}   params   [All options of the plugin]
 * params.container = The container of element
 * params.threshold = number between 0 to 1 that represents the final accuracy
 * params.direction = Direction for the swipe
 * params.delay = delay time after ends event
 * params.returntime = time necessary for return to initially position
 */
(function($){
	var x = 0;
	var end = false;

	$.fn.customSwipe = function(params,callback){
		// Default options

		var options = {
			container  : $(this).parent(),
			threshold  : 0.5,
			direction  : "left",
			delay 	   : 100,
			returntime : 50
		};

		// Save this jquery object
		var _this = $(this);

		// Extend default options with custom options
		options = $.extend(options, params);

		// Consider correct direction
		var reverse_direction;
		// Maximum space with container
		var space;

		// Switch direction I save reverse direction and the heigth or width
		switch(options.direction){
			case "right":
				reverse_direction = "left";
				space = parseInt(options.container.css("width"))-parseInt($(this).css("width"));
				break;
			case "left":
				reverse_direction = "right";
				space = parseInt(options.container.css("width"))-parseInt($(this).css("width"));
				break;
			case "top":
				reverse_direction = "bottom";
				space = parseInt(options.container.css("height"))-parseInt($(this).css("height"));
				break;
			case "bottom":
				reverse_direction = "top";
				space = parseInt(options.container.css("height"))-parseInt($(this).css("height"));
				break;
		}

		// Initialize de plugin
		var init = function(){
			// On drag the element
			options.container.hammer().on("drag",_this.selector,function(e){
				var difX = x-e.gesture.deltaX;
				var difY = x-e.gesture.deltaY;
				console.log(space);
				// Depends of direction I move different
				if(difX > 0 && difX < space && !end && options.direction == "left"){
					move(1,difX);

				}else if(difX < 0 && difX < space && !end && options.direction == "right"){
					move(-1,difX);

				}else if(difY > 0 && difY < space && !end && options.direction == "top"){
					move(1,difY);

				}else if(difY < 0 && difY < space && !end && options.direction == "bottom"){
					move(-1,difY);
				}

			// When I finish
			}).on("dragend",_this.selector,function(e){
				var anim = {};
				anim[reverse_direction] = 0;
				_this.delay(options.delay).animate(anim,options.returntime);
			});
		}

		// Move the element
		var move = function(sign,dif){
			// When pass the threshold I finish it
			if ((dif > (space)*options.threshold && sign == 1) || (dif < -(space)*options.threshold && sign == -1)){
				_this.css(reverse_direction,space+"px");
				end = true;
				var anim = {};
				anim[reverse_direction] = 0;
				_this.delay(options.delay).animate(anim,options.returntime,function(){
					end = false;
				});

				// Do the calback if necessary
				if(callback){
					callback.call(_this);
				}else if(typeof params == "function"){
					params.call(_this);
				}

			}else{
				// Move normally
				_this.css(reverse_direction,sign*dif+"px");
			}
		}
		// returns each of the elements we have passed to the plugin
		// it allows you to chain multiple functions and plugins together on one jQuery element.
		return this.each(function(){
			init();
		});
	};
}(jQuery));