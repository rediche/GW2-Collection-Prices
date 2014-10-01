var items = function( collection ) {

	var root = "https://api.guildwars2.com/v2/";
	var itemsRdy = 0;
	var pricesRdy = 0;
	var totalBuy;
	var totalSell;

	if( collection == "hylek" ) {
		var data = [14882, 14883, 14884, 14885, 14886, 14887, 14888, 14889, 14890, 14891, 14892, 14893, 14894, 14895, 14896, 14897, 14898, 14899, 14900];
	} else if( collection == "grawl" ) {
		var data = [46042, 46043, 46044, 46045, 46046, 46047, 46048, 46049, 46050, 46051, 46052, 46053, 46054, 46055, 46056, 46057, 46058, 46059, 46060];
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
	    	var newTr = $("<tr><td><img src='" + icon + "'></td><td>" + name + "</td><td>" + sell + "</td><td>" + buy + "</td></tr>");
			$( "#" + collection + " table.table.table-striped").append(newTr);
	    }

		console.log(i);
	}

	$( "#" + collection +" h3 small" ).append( "Total Price at Direct Purchace: " + totalSell );

}

$( document ).ready(items("grawl"), items("hylek"));