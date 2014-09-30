var root = "https://api.guildwars2.com/v2/";

var items = function( collection ) {

	var totalBuy = 0;
	var totalSell = 0;

	console.log(collection);

	if(collection == "hylek") {
		var data = [14882, 14883, 14884, 14885, 14886, 14887, 14888, 14889, 14890, 14891, 14892, 14893, 14894, 14895, 14896, 14897, 14898, 14899, 14900];
	} else if(collection == "grawl") {
		var data = [46042, 46043, 46044, 46045, 46046, 46047, 46048, 46049, 46050, 46051, 46052, 46053, 46054, 46055, 46056, 46057, 46058, 46059, 46060]
	}

	for ( var i = 0; i < data.length; i++) {
		$( "<li>", { id: data[i] } ).appendTo( "#" + collection + " .items");
		console.log("Printed");

		$.getJSON( root + "items/" + data[i], function( item ) {
			$( "<img>", { src: item.icon } ).appendTo( "#" + item.id );
			$( "<p>", { html: item.name } ).appendTo( "#" + item.id );
		});

		$.getJSON( root + "commerce/prices/" + data[i], function( prices ) {
			totalBuy = totalBuy + prices.buys.unit_price;
			totalSell = totalSell + prices.sells.unit_price;
			$( "<p>", { html: "Buy: " + prices.buys.unit_price } ).appendTo( "#" + prices.id );
			$( "<p>", { html: "Sell: " + prices.sells.unit_price } ).appendTo( "#" + prices.id );
		});

	}

	$( "<p>", { html: "Total Direct Buy: " + totalBuy } ).appendTo( "#" + collection + " .totals");
	$( "<p>", { html: "Total Price through Sellorders: " + totalSell } ).appendTo( "#" + collection + " .totals");


}
document.write(items("grawl"));
