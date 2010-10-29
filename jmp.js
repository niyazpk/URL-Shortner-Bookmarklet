javascript:(function() {
	/* Replace login and apiKey, get your's from http://bit.ly/a/your_api_key */
	var login="changeme",
		apiKey="changeme",
		otherlib=false;
	if (typeof jQuery=='undefined' && typeof $=='function') {
		otherlib=true;
	}
	function getScript(url,success){
		var script=document.createElement('script');
		script.src=url;
		var head=document.getElementsByTagName('head')[0],
		done=false;
		script.onload=script.onreadystatechange = function(){
			if ( !done && (!this.readyState
			|| this.readyState == 'loaded'
			|| this.readyState == 'complete') ) {
				done=true;
				success();
				script.onload = script.onreadystatechange = null;
				head.removeChild(script);
			}
		};
		head.appendChild(script);
	}
	getScript('http://code.jquery.com/jquery-latest.min.js',function() {
		if (typeof jQuery!='undefined') {
			if (otherlib) {
				$jq=jQuery.noConflict();
			}
			var url= 'http://api.bit.ly/v3/shorten?login='+login+'&apiKey='+apiKey+'&domain=j.mp&format=json&longUrl=' + escape(window.location.href);
			jQuery.ajax({
				url: url,
				dataType: 'jsonp',
				success: function(data){
					jQuery('body').append('<div id="jmp-shortened-url" style="position:fixed;top:0;left:0;background:#ffb;padding:10px;font-family:calibri">' + data.data.url +'</div>');
					jQuery('#jmp-shortened-url').mouseout(function(){jQuery(this).remove();});
				}
			});
		}
	});
})();