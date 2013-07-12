/**
 * [customSwipe jQuery plugin that implements custom Swipe event (it depends of HammerJS http://eightmedia.github.io/hammer.js/)]
 * @param {Object}   params   [All options of the plugin]
 * params.container = The container of element
 * params.threshold = number between 0 to 1 that represents the final accuracy
 * params.directions = Directions for the swipe separated by commas left,up,down,right
 * params.delay = delay time after ends event
 * params.returntime = time necessary for return to initially position
 */
(function ($) {
    var end = false;
    var current = null;

    $.fn.customSwipe = function (params, callback) {
        // Default options

        var options = {
            container: $(this).parent(),
            directions: {
                left: true,
                right: false,
                up: false,
                down: false,
                gradient: false
            },
            delay: 100,
            returntime: 200
        };

        // Save this jquery object
        var _this = $(this);

        // Extend default options with custom options
        options = $.extend(options, params);

        // Save the position of the element
        var $position = $(this).position();

        // Posible directions
        var directions = {
            left: function () {
                directions.move("dragleft", "deltaX", "left", 0, "left");
            },
            right: function () {
                directions.move("dragright", "deltaX", "left", 1, "right");
            },
            up: function () {
                directions.move("dragup", "deltaY", "top", 0, "up");
            },
            down: function () {
                directions.move("dragdown", "deltaY", "top", 1, "down");
            },
            gradient: function(){
                var arrives;
                var dif;
                var stlye = function(e,dif){
                    e.css("mask-image", "-webkit-linear-gradient(left top ,rgba(0,0,0,1) 0%, rgba(0,0,0,"+dif/120+") "+dif*1.5+"%)");
                    e.css("mask-image", "-ms-linear-gradient(left top ,rgba(0,0,0,1) 0%, rgba(0,0,0,"+dif/120+") "+dif*1.5+"%)");
                    e.css("mask-image", "-moz-linear-gradient(left top ,rgba(0,0,0,1) 0%, rgba(0,0,0,"+dif/120+") "+dif*1.5+"%)");
                }
                options.container.hammer().on("dragleft", function (e) {
                    current = "left";
                    dif = 100 + ((($position["left"]) + (e.gesture["deltaX"]))/2);
                    arrives = false;
                    if (!end) {
                        if ( dif > 11) {
                            stlye(_this,dif);
                            arrives = false;
                        } else {
                            end = true;
                        }
                    }
                }).on("dragend", function () {
                    if (end) {
                        function animationdown(dif){
                            stlye(_this,dif);
                            arrives = false;
                            if (dif > 0){
                                dif -= 5;
                                console.log(dif)
                                setTimeout(function(){
                                    animationdown(dif);
                                },20);
                            }else{
                                doCallback();
                            }
                        }

                        animationdown(10);
                    }else{
                       function animation(dif){
                            stlye(_this,dif);

                            if (dif < 100){
                                dif += 15;
                                setTimeout(function(){
                                    animation(dif);
                                },45);
                            }else{
                                end = false;
                            }
                        }

                        animation(dif);
                    }
                }).on("swiperight", function () {
                    function animation(dif){
                        stlye(_this,dif);

                        if (dif < 100){
                            dif += 10;
                            setTimeout(function(){
                                animation(dif);
                            },50);
                        }
                    }

                    animation(0);
                });
            },
            move: function (drag, delta, direction, the_case, curre) {
                var arrives;
                options.container.hammer().on(drag, _this.selector, function (e) {
                    current = curre;
                    _this = $(this);
                    var dif = ($position[direction]) + (e.gesture[delta]);
                    arrives = false;
                    if (!end) {
                        if (the_case == 0 && dif >= 0 || the_case == 1 && (dif <= parseInt(options.container.width() - _this.width()) && direction == "left" || dif <= parseInt(options.container.height() - _this.height()) && direction == "top")) {
                            _this.css(direction, dif + "px");
                            arrives = false;
                        } else {
                            end = true;
                        }
                    }
                }).on("dragend", function () {
                    var anim = {};
                    anim[direction] = ($position[direction]) + "px";

                    if (end) {
                        _this.delay(options.delay).animate(anim, options.returntime, function () {
                            doCallback();
                            end = false;
                        });
                    } else {
                        _this.delay(options.delay).animate(anim, Math.round(options.returntime / 4), function () {
                            end = false;
                        });
                    }
                });
            }
        }

        var init = function () {
            var dirs = options.directions;
            for (var i in dirs) {
                if (dirs[i]) directions[i]();
            }
        }

        var doCallback = function () {
            if (end) {
                // Do the calback if necessary
                if (typeof options.directions[current] == "function") options.directions[current].call(_this);

                if (callback) {
                    callback.call(_this);
                } else if (typeof params == "function") {
                    params.call(_this);
                }
            }
        }
        init();
    };
}(jQuery));