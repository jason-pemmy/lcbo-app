$(document).ready(function () {
	var quoteFormOpen = false,
		screenWidth = $(window).width(),
		screenHeight = $(window).height(),
		productDataArray = [];
	
	$(".quote-form-header").on("click", function () {
		if (!quoteFormOpen) {
			$(this).parent().animate({ top: '0' }, 200, function () {
				$("body").css("overflow", "hidden");
				$(this).css("overflow-y", "scroll");
				$(".form-header-button-text").text("Close");
				quoteFormOpen = true;
			});
		} else {
			$(this).parent().animate({ top: screenHeight - 50 }, 200, function () {
				$(".form-header-button-text").text("Get a Quote");
				$("body").css("overflow", "auto");
				$(this).css("overflow-y", "hidden");
				quoteFormOpen = false;
			});
		}
	});
	
	function positionFeatureRows() {
		if (screenWidth <= 750) {
			$(".feature-col-img:even").removeClass("pull-right");
			$(".feature-col-copy:even").removeClass("pull-left");
		} else {
			$(".feature-col-img:even").addClass("pull-right");
			$(".feature-col-copy:even").addClass("pull-left");
		}
	}	
	
	function positionMobileQuoteForm() {
		if (!quoteFormOpen) {
			var pos = $(".quote-form-container").position.top = screenHeight - 50;
			$(".quote-form-container").css("top", pos + "px");
		}
	}
	
	function loadProductDetails(productID, dataAry) {
		var itemDetailsStr = "",
			productImage = $(".product-image-detail"),
			productName = $(".product-name span"),
			productPrice = $(".product-price span"),
			packageUnits = $(".package-units"),
			brewer = $(".brewer span"),
			tasteDescription = $(".product-taste-description span"),
			productPairing = $(".product-pairing span");			
		
		for (var i=0; i < dataAry.length; i++) {
			if (dataAry[i].id == productID) {
				productImage.attr("src", dataAry[i].bigImage);
				//productName.html(dataAry[i].name);
				//productPrice.html(dataAry[i].price);
				
				if (dataAry[i].packageUnits == 1) {
					//packageUnits.html("each");
				} else {
					//packageUnits.html("x"+dataAry[i].packageUnits);
				}				
				
				//brewer.html(dataAry[i].brewer);
				//tasteDescription.html(dataAry[i].tasteDescription);
				//productPairing.html(dataAry[i].pairing);				
			}
		}
        
        $(".product-details-modal").modal("show");
        $(".product-details-container").html(itemDetailsStr);		
	}
	
	function showProductItems(items, dataAry) {
		for (var i=0; i < items.length; i++) {
			$(".product-thumb-row").html(items);
		}
		
		$(".product-detail-link").on("click",function(e) {
			var productID = $(this).attr("id");
			e.preventDefault();
			
			loadProductDetails(productID, dataAry);
		});
	}
	
	function loadAPIData() {
		$.getJSON("json/lcbo-data.json", function (data) {
			var items = [],
				i = 0;
			
			$.each(data.result, function (key, val) {
				var item = "",
					productData = {};
				item = "<div class='col-lg-3 col-sm-4 col-xs-6 product-thumbs'>";
				if (val.image_thumb_url !== null) {
					item += "<a class='product-detail-link' id='" + val.id + "' href='#'><img src='" + val.image_thumb_url + "' class='thumbnail img-responsive'/></a>";
				} else {
					item += "<img src='http://placehold.it/249x329' class='thumbnail img-responsive'/>";
				}
				
				item += "<div class='product-description-container'><h4>" + val.name + "</h4></div>";
				item += "</div>";
				items.push(item);
				
				var price = val.price_in_cents / 100;
				var roundedPrice = price.toFixed(2);
				
				productData.id = val.id;
				productData.name = val.name;
				productData.price = roundedPrice;
				productData.packageUnits = val.total_package_units;
				productData.brewer = val.producer_name;
				productData.pairing = val.serving_suggestion;
				productData.tasteDescription = val.tasting_note;
				productData.thumbImage = val.image_thumb_url;
				productData.bigImage = val.image_url;
				
				productDataArray.push(productData);				
				i++;
			});
			showProductItems(items, productDataArray);
		});		
	}	
	
	$(".launch-grain-button").on("click", function(e) {
		e.preventDefault();
		$(".contest-entry-modal").modal("show");		
	});
	
	positionFeatureRows();
	positionMobileQuoteForm();
	loadAPIData();
	
	$(window).resize(function () {
		screenWidth = $(this).width();
		screenHeight = $(this).height();
		positionFeatureRows();		
		positionMobileQuoteForm();		
	});
});