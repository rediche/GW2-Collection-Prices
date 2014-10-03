var format = function( amount ) {
	var copper;
	var silver;
	var gold; 
	var formatted;

	amount = amount.toString();
	copper = amount.substr(-2,2);

	if( amount.length > 2) {
		silver = amount.substr(-4,2);
	} else {
		silver = 0;
	}

	if( amount.length > 4 ) {
		gold = amount.substr(0, amount.length - 4);
	} else {
		gold = 0;
	}

	formatted = gold + "g " + silver + "s " + copper + "c";
	return formatted;
}

var items = function( collection ) {

	var root = "https://api.guildwars2.com/v2/";
	var itemsRdy = 0;
	var pricesRdy = 0;
	var totalBuy = 0;
	var totalSell = 0;

	var item;
	var price;

	if( collection == "hylek" ) {
		var data = [14882, 14883, 14884, 14885, 14886, 14887, 14888, 14889, 14890, 14891, 14892, 14893, 14894, 14895, 14896, 14897, 14898, 14899, 14900];
	} else if( collection == "grawl" ) {
		var data = [46042, 46043, 46044, 46045, 46046, 46047, 46048, 46049, 46050, 46051, 46052, 46053, 46054, 46055, 46056, 46057, 46058, 46059, 46060];
	} else if( collection == "dwayna" ) {
		var data = [31070, 31073, 39476, 39479];
	} else if( collection == "exotic" ) {
		var data = [44960, 44961, 44962, 44963, 44964, 44965, 44966, 44967, 44968, 44969, 44970, 44971, 44972, 44973, 44974, 44975, 44976, 44977, 44978, 44979, 44980, 44981, 44982, 44983, 44984, 44985, 44986, 44987, 44988, 44989, 44990, 44991, 44992, 44999, ];
	} else if( collection == "jormag" ) {
		var data = [14920, 14921, 14922, 14923, 14924, 14925, 14926, 14927, 14928, 14929, 14930, 14931, 14932,  14933, 14934, 14935, 14936, 14937, 14938, 31065, 31105, 67276];
	} else if( collection == "spirit") {
		var data = [31062, 31071, 31074, 31077, 31078];
	} else if( collection == "aether" ) {
		var data = [44001, 44004, 44007, 44010, 44013, 44016, 44019, 44022, 44025, 44028, 44031, 44034, 44037, 44040, 44043, 44046, 44049, 44052, 44055];
	} else if( collection == "chaos" ) {
		var data = [67028, 67034, 67036, 67039, 67047, 67048, 67049, 67050, 67051, 67052, 67059, 67060, 67061, 67062, 67064, 67065, 67069, 67073, 67074];
	} else if( collection == "jade" ) {
		var data = [43367, 43370, 43373, 43376, 43379, 43382, 43385, 43388, 43391, 43394, 43397, 43400, 43403, 43406, 43409, 43412];
	} else if( collection == "dream" ) {
		var data = [48958, 48961, 48964, 48967, 48970, 48973, 48976, 48979, 48982, 48985, 48988, 48991, 48994, 48997, 49000, 49003, 49006, 49009, 49012];
	} else if( collection == "fused" ) {
		var data = [41760, 41763, 41766, 41769, 41772, 41775, 41778, 41781, 41784, 41787, 41790, 41793, 41796, 41800, 41803, 41806];
	} else if( collection == "winter" ) {
		var data = [38070, 38072, 38074, 38076, 38077, 38080, 38082, 38084, 38085, 38089];
	} else if( collection == "lovestruck" ) {
		var data = [44891, 44894, 44897, 44900, 44903, 44906, 44909, 44912, 44915, 44918, 44921, 44924, 44927, 44930, 44933, 44936];
	} else if( collection == "phoenix" ) {
		var data = [66229, 66230, 66231, 66235, 66239, 66242, 66245, 66247, 66248, 66253, 66257, 66262, 66263, 66266, 66268, 66272];
	} else if( collection == "sclerite" ) {
		var data = [42604, 42608, 42611, 42614, 42617, 42620, 42623, 42626, 42629, 42632, 42635, 42638, 42641, 42644, 42647, 42650];
	} else if( collection == "tempest" ) {
		var data = [67035, 67041, 67042, 67043, 67044, 67045, 67046, 67053, 67055, 67057, 67058, 67066, 67067, 67068, 67070, 67072];
	} else if( collection == "torment" ) {
		var data = [49314, 49317, 49320, 49323, 49326, 49329, 49332, 49335, 49338, 49341, 49344, 49347, 49350, 49353, 49356, 49359, 63875, 63877, 63881];
	} else if( collection == "zodiac" ) {
		var data = [44830, 44833, 44836, 44839, 44842, 44845, 44848, 44851, 44854, 44857, 44860, 44863, 44866, 44869, 44872, 44875];
	}

	$.ajax({
    	url: root + "items/?ids=" + String(data),
    	async: false,
    	dataType: 'json',
    	success: function(items) {
    		item = $.extend({}, items, item);

    		$.ajax({
				url: root + "commerce/prices/?ids=" + String(data),
				async: false,
				dataType: 'json',
				success: function(prices) {
					price = $.extend({}, price, prices);

					for ( var i = 0; i < data.length; i++) {
						var newTr = $("<tr id='" + item[i].id + "'></tr>");
						$( "#" + collection + " table.table.table-striped").append(newTr);
					}
					for ( var i = 0; i < data.length; i++) {
					   	var newTr = $("<td><img src='" + item[i].icon + "'></td><td>" + item[i].name + "</td>");
						$( "#" + item[i].id).prepend(newTr);
						var newTr2 = $("<td>" + format(price[i].sells.unit_price) + "</td><td>" + format(price[i].buys.unit_price) + "</td>");
						$( "#" + price[i].id).append(newTr2);
						totalSell = totalSell + price[i].sells.unit_price;
						totalBuy  = totalBuy  + price[i].buys.unit_price;
					}
				}
			});
    	}
    });

	$( "#" + collection +" h3 small" ).append( "<br />Total Price at Direct Purchace: " + format(totalSell) + "<br />Total Price with Buyorders: " + format(totalBuy) );

}

$('#rare').waypoint(function(direction) {
	$('#basic-li').removeClass('active');
	$('#bl-li').removeClass('active');
	$('#rare-li').addClass('active');
});

$('#basic').waypoint(function(direction) {
	$('#rare-li').removeClass('active');
	$('#bl-li').removeClass('active');
	$('#basic-li').addClass('active');
});

$('#blacklion').waypoint(function(direction) {
	$('#basic-li').removeClass('active');
	$('#rare-li').removeClass('active');
	$('#bl-li').addClass('active');
});

var shiftWindow = function() { scrollBy(0, -70) };
if (location.hash) shiftWindow();
window.addEventListener("hashchange", shiftWindow);