# customSwipe
jQuery plugin that implements custom Swipe event (it depends of HammerJS http://eightmedia.github.io/hammer.js/)

## Options
* container: The container of element (by default: parent)
* threshold: number between 0 to 1 that represents the final accuracy (by default: 0.5).
* direction: Direction for the swipe (by default: 'left').
* delay: delay time after ends event in 'ms' (by default: 100).
* returntime:  time necessary for return to initially position in 'ms' (by default: 50).

## Use

### Default use
```javascript
(function(){
	$("#left").customSwipe();
	$("#right").customSwipe({direction : "right"});
	$("#top").customSwipe({direction : "top"});
	$("#bottom").customSwipe({direction : "bottom"});
})();
```
### With callback
```javascript
(function(){
	$("#special:not(.off)").customSwipe({direction : "left"},function(){
		$(this).addClass("off");
	});
})();
```

## About
Plugin by @ CKGRafico
Website: http://www.ckgrafico.com
