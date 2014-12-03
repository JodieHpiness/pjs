var pjs = {};
pjs.option = {};
var PI_REPEAT = "pi-repeat",
	PI_VO = "pi-vo";
pjs.render = function(id, data){
	try {
		pjs.explain(id, data);
	} catch(e){
		console.log("error : "+e);
	}
}
pjs.explain = function(id, data){
	if(data==null || data===undefined || typeof data!=="object") return ;

	var location = document.getElementById(id);
	var attrs = location.attributes;
	if(attrs.length==1){ //最简单的例子 {{title}}
		pjs.simpleValue(location, data);
	}else if(attrs[PI_REPEAT] &&　attrs[PI_VO]){
		var repeat_name = attrs[PI_REPEAT];
		var vo_name = attrs[PI_VO];
		pjs.repeat(location, repeat_name.value, vo_name.value, data);
	}else {

	}
}
pjs.repeat = function(location, repeat_name, vo_name, data){
	for(var index in data){
		if(index==repeat_name){
			var repeat_items = data[index];

			var html = "";
			var template = location.innerHTML;
			for(var i in repeat_items){
				html += pjs.simpleValueReplace(template, vo_name, repeat_items[i]);
			}
			location.innerHTML = html;
		}
	}
}
pjs.simpleValueReplace = function(html, vo_name, data){
	var temp_html = "";
	var temp_pre_arr = html.split("{{");
	var temp_pre = temp_pre_arr[0];
	var temp_post_arr = html.split("}}");
	var temp_post = temp_post_arr[1];

	return temp_pre+data+temp_post;
}
pjs.simpleValue = function(location, data){
	var html = pjs.trim(location.innerHTML);

	var title = html.replace(/({{)|(}})/g, '');
	title = pjs.trim(title);

	for(var index in data){
		if(index==title){
			location.innerHTML = data[index];
		}
	}
}
pjs.trim = function(str){
	var str = str || '';
	return str.replace(/(^\s*)|(\s*$)/g, '');
}
pjs.getIndex = function(arr, title){
	for(var index in arr){
		if(arr[index]===title){
			return index;
		}
	}
}