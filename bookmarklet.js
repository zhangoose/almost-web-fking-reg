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
				console.log("wut");
				var suffix = "courseTitleAndCredits\\.courseTitle";
				$("[id$='" + suffix + "']")	.each(function(){
					var elem = this;
					if(elem != undefined){
						var elem_text = $(elem).text();
						var new_elem_text = elem_text.replace("&", " & ");	
						console.log("elem text: " + new_elem_text);
						var don_arr = duck_or_not(new_elem_text);
						var don_str = don_arr.join(" ");
						console.log(elem_text +  " ..... " + don_str );
						$(elem).text(don_str);
					}
					else{
						console.log("pls no");
					}
				});
			})();
		}

		function clean_up_ducks(sent_arr, ducking){
			
		}
		
		function duck_or_not(sent){
			var ducking = "FKING";
			var sent_arr = sent.split(" ");
			var duck_ignores = ['IN', 'A', 'THE', 'OF', 'TO', 'AND', 'OR', '&'];
			var duck_arr = number_the_words(sent, duck_ignores);
			var ret_arr = [];
			ret_arr.push(sent_arr[0]);
			var i;
			if(sent_arr.length == 2){
				console.log("oh yeah" + sent_arr[0]);

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
			var sent_arr = sent.split(" ");
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
