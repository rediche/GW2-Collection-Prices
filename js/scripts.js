var items = function( collection ) {

	var root = "https://api.guildwars2.com/v2/";
	var itemsRdy = 0;
	var pricesRdy = 0;
	var totalBuy = 0;
	var totalSell = 0;

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

	if( collection == "hylek" ) {
		var data = [14882, 14883, 14884, 14885, 14886, 14887, 14888, 14889, 14890, 14891, 14892, 14893, 14894, 14895, 14896, 14897, 14898, 14899, 14900];
	} else if( collection == "grawl" ) {
		var data = [46042, 46043, 46044, 46045, 46046, 46047, 46048, 46049, 46050, 46051, 46052, 46053, 46054, 46055, 46056, 46057, 46058, 46059, 46060];
	} else if( collection == "dwayna" ) {
		var data = [31070, 31073, 39476, 39479];
	} else if( collection == "exotic" ) {
		var data = [44960, 44961, 44962, 44963, 44964, 44965, 44966, 44967, 44968, 44969, 44970, 44971, 44972, 44973, 44974, 44975, 44976, 44977, 44978, 44979, 44980, 44981, 44982, 44983, 44984, 44985, 44986, 44987, 44988, 44989, 44990, 44991, 44992, 44999, ];
	} else if( collection == "jormag" ) {
		var data = [14920, 14921, 14922, 14923, 14924, 14925, 19926, 14927, 14928, 14929, 14930, 14931, 14932,  14933, 14934, 14935, 14936, 14937, 14938, 31065, 31105, 67276];
	} else if( collection == "spirit") {
		var data = [31062, 31071, 31074, 31077, 31078];
	} else if( collection == "aether" ) {
		var data = [44001, 44004, 44007, 44010, 44013, 44016, 44019, 44022, 44025, 44028, 44031, 44034, 44037, 44040, 44043, 44046, 44049, 44052, 44055];
	} else if( collection == "chaos" ) {
		var data = [67028, 67034, 67036, 67039, 67047, 67048, 67049, 67050, 67051, 67052, 67059, 67060, 67061, 67062, 67064, 67065, 67069, 67073, 67074];
	}

	for ( var i = 0; i < data.length; i++) {

		var icon;
		var name;
		var buy;
		var sell;

		$.ajax({
	    	url: root + "items/" + data[i],
	    	async: false,
	    	dataType: 'json',
	    	success: function(item) {
	    		icon = item.icon;
	    		name = item.name;

	    		itemsRdy = 1;
	    	}
	    });

	    $.ajax({
	    	url: root + "commerce/prices/" + data[i],
	    	async: false,
	    	dataType: 'json',
	    	success: function(prices) {
	    		totalBuy = totalBuy + prices.buys.unit_price;
				totalSell = totalSell + prices.sells.unit_price;
				buy = prices.buys.unit_price;
				sell = prices.sells.unit_price;

				pricesRdy = 1;
	    	}
	    });

	    if(itemsRdy == 1 && pricesRdy == 1) {
	    	var newTr = $("<tr><td><img src='" + icon + "'></td><td>" + name + "</td><td>" + format(sell) + "</td><td>" + format(buy) + "</td></tr>");
			$( "#" + collection + " table.table.table-striped").append(newTr);
	    }

		console.log(i);
	}

	$( "#" + collection +" h3 small" ).append( "<br />Total Price at Direct Purchace: " + format(totalSell) + "<br />Total Price with Buyorders: " + format(totalBuy) );

}

/*$( document ).ready(items("grawl"), 
					items("hylek"), 
					items("dwayna"),
					items("exotic"),
					items("jormag"),
					items("spirit"),
					items("aether"), 
					items("chaos"));*/

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