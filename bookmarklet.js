javascript:(
	function(){

		var v = "1.3.2";
		if (window.jQuery === undefined || window.jQuery.fn.jquery < v) {
			var done = false;
			var script = document.createElement("script");
			script.src = "https://ajax.googleapis.com/ajax/libs/jquery/" + v + "/jquery.min.js";
			script.onload = script.onreadystatechange = function(){
				if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
					done = true;
					initMyBookmarklet();
				}
			};
			document.getElementsByTagName("head")[0].appendChild(script);
		} else {
			initMyBookmarklet();
		}

		function initMyBookmarklet() {
			(window.myBookmarklet = function() {
				var suffix = "courseTitleAndCredits\\.courseTitle";

				$("#iframe2").attr("src","http://sis.rutgers.edu/soc/?iframe=true&amp;term=92014");
				console.log($("#iframe2").contents().find("[id$='" + suffix + "']").contents());
				$("[id$='" + suffix + "']")	.each(function(){
					var elem = this;
					if(elem != undefined){
						var ducking = "FKING";
						var elem_text = $(elem).text();
						var new_elem_text = elem_text.replace("&", " & ");	
						var don_arr = duck_or_not(new_elem_text);
						var clean_don_arr = clean_up_ducks(don_arr, ducking);
						var don_str = clean_don_arr.join(" ");
						$(elem).text(don_str);
					}

				});
			})();
		}

		function fuck_empty_strings(arr){
			var i;
			var dumb_ret = [];
			for(i = 0; i < arr.length; i++){
				if(arr[i] != ""){
					dumb_ret.push(arr[i]);
				}
			}
			return dumb_ret;
		}

		function clean_up_ducks(sent_arr, ducking){
			var i;
			for(i = 2; i < sent_arr.length; i++){
					if(sent_arr[i-2] == ducking && sent_arr[i] == ducking){
						sent_arr[i] = "";
					}
			}
			return sent_arr;
		}
		
		function duck_or_not(sent){
			var ducking = "FKING";
			var old_sent_arr = sent.split(" ");
			var sent_arr = fuck_empty_strings(old_sent_arr);
			var duck_ignores = ['IN', 'A', 'THE', 'OF', 'TO', 'AND', 'OR', '&'];
			var duck_arr = number_the_words(sent, duck_ignores);
			var ret_arr = [];
			ret_arr.push(sent_arr[0]);
			var i;
			if(sent_arr.length == 2){
				return [sent_arr[0], ducking, sent_arr[1]];
			}
			for(i = 1; i < sent_arr.length; i++){
				if(duck_arr[i-1] == 1 && duck_arr[i] == 1){
					ret_arr.push(ducking);
				}
				else if(duck_arr[i-1] == 1 && duck_arr[i] == 0){
					ret_arr.push("");
				}
				else if(duck_arr[i-1] == 0 && duck_arr[i] == 1){
					ret_arr.push(ducking);
				}
				ret_arr.push(sent_arr[i]);
			}
			return ret_arr;
		}

		function number_the_words(sent, ignore_words){
			var old_sent_arr = sent.split(" ");
			var sent_arr = fuck_empty_strings(old_sent_arr);
			var ret_arr = [];
			var i, j;
			for(i =0 ; i < sent_arr.length; i++){
				for(j = 0; j < ignore_words.length; j++){
					if(sent_arr[i] == ignore_words[j]){
						ret_arr[i] = 0;
						break;
					}
					else{
						ret_arr[i] = 1;
					}
				}
			}
			return ret_arr;
		}

	})();
