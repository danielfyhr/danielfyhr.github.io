(function() {

	var app = angular.module('coffeescale', []);

	app.filter("sanitize", ['$sce', function($sce) {
		return function(htmlCode) {
			return $sce.trustAsHtml(htmlCode);
		}
	}]);

	app.controller('CoffeeController', function() {
		
		this.coffeeTypes = coffeeTypes;
		this.coffeeWeight = coffeeWeight;
		this.selectedCoffeeType = selectedCoffeeType;
		
		this.selectCoffeeType = function(setCoffeeType) {
			this.selectedCoffeeType = setCoffeeType;
		};

		this.coffeeTypeIsSelected = function(checkType) {
			return this.selectedCoffeeType === checkType;
		};

		this.getWaterWeight = function() {
			return this.coffeeWeight * this.selectedCoffeeType.multiplier;
		};

	});

	var coffeeTypes = [
			{
				name: 'Coldbrew',
				description: '<p>Makes a concentrated coffee which you can serve warm by adding boiling water.</p><p>Put the grind in a bowl and soak everything with the given amount of cold water. Cover with cling film and let it seep in room temperature for ~12 hours. Filter out the grind and store it in the fridge.</p><p>To serve preheat a cup, then measure <strong>1/6</strong> of the coldbrew and top with <strong>5/6</strong> boiling water.</p>',
				multiplier: 6 
			},
			{
				name: 'Frenchpress',
				description: '<p>A quick way to make coffee.</p><p>Put the grind in a french press and soak everything with the given amount of almost boiling water (let it cool a bit after boiling). Let it seep for <strong>4</strong> minutes.</p>',
				multiplier: 17 }
	];

	//initialize selectedCoffeeType by selecting the first element in the array.
	var selectedCoffeeType = coffeeTypes[0];

	var coffeeWeight = 10;

})();