(function() {

	var app = angular.module('coffeescale', []);

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
				description: 'Makes a concentrated coffee which you can serve warm by adding boiling water. 
				Use cold water. Put the grind with the water in a bowl. 
				Make sure everything is soaked and cover with cling film. 
				Let it seep in room temperature for ~12 hours.
				\nTo serve preheat a cup, then measure 1/3 of the coldbrew and top with 2/3 boiling water.',
				multiplier: 6 
			},
			{
				name: 'Frenchpress',
				description: 'asdpgijaerogiaeriogeritueroituertiouer eritoeriteritireut vnxcmvnxcmvnxcmvnxmcvn',
				multiplier: 17 }
	];

	//initialize selectedCoffeeType by selecting the first element in the array.
	var selectedCoffeeType = coffeeTypes[0];

	var coffeeWeight = 10;

})();