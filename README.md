# customSwipe
jQuery plugin that implements custom Swipe event (it depends of HammerJS http://eightmedia.github.io/hammer.js/)
See examples http://ckgrafico.github.io/jQuery-Hammer-CustomSwipe/index.html

## Options
* container: The container of element (by default: parent)
* directions: Direction for the swipe separated by commas left,up,down,right (by default: 'left').
* delay: delay time after ends event in 'ms' (by default: 100).
* returntime:  time necessary for return to initially position in 'ms' (by default: 50).

## Use

### Default use
```javascript
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
})();
```
### With callback
```javascript
(function(){
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
})();
```

## About
Plugin by @ CKGRafico
Website: http://www.ckgrafico.com
