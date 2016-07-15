(function() {

	var app = angular.module('coffeescale', []);

	//custom filter used when parsing coffeeTypes-description-html.
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
			return this.coffeeWeight * this.selectedCoffeeType.waterMultiplier;
		};

		this.getServings = function() {
			return parseInt(this.coffeeWeight / this.selectedCoffeeType.servingsMultiplier);
		};

		this.addToCoffeeWeight = function(value) {
			if ( this.coffeeWeight + value >= 0 ) {
				this.coffeeWeight += value;
			}
		};
		/*
		 * Adds (or removes) parameter value from servings, ie adds to coffeeWeight and rounds it to a number dividable by servingsMultiplier.
		 * For example if coffeeWeight is 5 and user increases servings by one, servingsMultiplier is 10. 
		 * CoffeeWeight will be set to 10:
		 * 5 + 10 = 15, but 15 isnt a full serving, so it's set to 10.
		*/
		this.addToServings = function(value) {
			//console.log("addToServings reached with value: " + value);
			//console.log("coffeeWeight this.coffeeWeight + this.selectedCoffeeType.servingsMultiplier: " + (this.coffeeWeight + this.selectedCoffeeType.servingsMultiplier));
			//console.log("this.coffeeWeight % " + this.coffeeWeight = this.coffeeWeight + this.selectedCoffeeType.servingsMultiplier - ((this.coffeeWeight + this.selectedCoffeeType.servingsMultiplier) % this.selectedCoffeeType.servingsMultiplier));
			if ( this.coffeeWeight + value >= 0 ) {
				var multiplier = this.selectedCoffeeType.servingsMultiplier * value;
				this.coffeeWeight = this.coffeeWeight + multiplier - ((this.coffeeWeight + multiplier) % multiplier);
			}

		};

	});

	var coffeeTypes = [
			{
				name: 'Coldbrew',
				description: '<p>Makes a concentrated coffee which you can serve warm by adding boiling water.</p><p>Put the grind in a bowl and soak everything with the given amount of cold water. Cover with cling film and let it seep in room temperature for ~12 hours. Filter out the grind and store it in the fridge.</p><p>To serve preheat a cup, then measure <strong>1/6</strong> of the coldbrew and top with <strong>5/6</strong> boiling water.</p>',
				waterMultiplier: 6,
				servingsMultiplier: 10
			},
			{
				name: 'Frenchpress',
				description: '<p>A quick way to make coffee.</p><p>Put the grind in a french press and soak everything with the given amount of almost boiling water (let it cool a bit after boiling). Let it seep for <strong>4</strong> minutes.</p>',
				waterMultiplier: 17,
				servingsMultiplier: 7
			}
	];

	//initialize selectedCoffeeType by selecting the first element in the array.
	var selectedCoffeeType = coffeeTypes[0];

	var coffeeWeight = 30;

})();