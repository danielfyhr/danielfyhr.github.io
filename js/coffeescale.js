(function() {

	var app = angular.module('coffeescale', []);

	//custom filter used when parsing coffeeTypes-description-html.
	app.filter("sanitize", ['$sce', function($sce) {
		return function(htmlCode) {
			return $sce.trustAsHtml(htmlCode);
		}
	}]);

	app.filter('secondsToDateTime', [function() {
    	return function(seconds) {
        	return new Date(1970, 0, 1).setSeconds(seconds);
    	};
	}]);

	app.controller('CoffeeController', ['$scope', '$timeout', function($scope, $timeout) {
		
		this.coffeeTypes = coffeeTypes;
		this.coffeeWeight = coffeeWeight;
		this.selectedCoffeeType = selectedCoffeeType;
		$scope.countDown = selectedCoffeeType.time; //initiate countDown
		
		this.selectCoffeeType = function(setCoffeeType) {
			selectedCoffeeType = setCoffeeType;
			$scope.countDown = selectedCoffeeType.time; //initiate countDown
			$scope.resetTimer(); //reset timer
		};

		this.coffeeTypeIsSelected = function(checkType) {
			return selectedCoffeeType === checkType;
		};

		this.getWaterWeight = function() {
			return this.coffeeWeight * this.selectedCoffeeType.waterMultiplier;
		};

		this.getServings = function() {
			return parseInt(this.coffeeWeight / this.selectedCoffeeType.servingsMultiplier);
		};

		this.addToCoffeeWeight = function(value) {
			if ( this.coffeeWeight + value >= 0 ) {
				console.log('about to add some weight to coffee:' + value);
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

		var timeoutFunction = null; //replacable with destroyTimer(); ?

		$scope.startTimer = function() {
			console.log("startTimer called");
			//console.log("$scope.countDown: " + $scope.countDown);
			//initiate the timer if it doesn't already exist
			if (timeoutFunction == null) {
				console.log("timeOutfunction doesn't already exist so runTimer()!");
				$scope.runTimer();
			} else {
				console.log("startTimer does nothing at this point cause timer is already running.");
			}
		}

		$scope.runTimer = function() {
			$scope.countDown--;
			console.log("runTimer: " + timeoutFunction);
			timeoutFunction = $timeout($scope.runTimer,1000);

			if ($scope.countDown == 0) {
				window.alert('Kaffet är färdigt bror!')
				$timeout.cancel(timeoutFunction);
				$scope.destroyTimer();
			}
		}

		$scope.pauseTimer = function() {
			console.log("pauseTimer called");
			if (timeoutFunction != null) {
				$timeout.cancel(timeoutFunction);
				console.log("and there was something to cancel so it's cancelled now.");
				$scope.destroyTimer();
			}
		}

		$scope.resetTimer = function() {
			console.log("resetTimer called");
			//reset countDown by setting it to selected coffeetype's time.
			console.log("trying to reset countDown from " + $scope.countDown + " to " + selectedCoffeeType.time);
			//re-initiate countDown
			$scope.countDown = selectedCoffeeType.time; 
			//pauseTimer
			$scope.pauseTimer();
		}

		$scope.destroyTimer = function() {
			timeoutFunction = null;
		}

	}]);

	var coffeeTypes = [
			{
				name: 'Coldbrew',
				description: '<p>Makes a concentrated coffee which you can serve warm by adding boiling water.</p><p>Put the grind in a bowl and soak everything with the given amount of cold water. Cover with cling film and let it seep in room temperature for ~12 hours. Filter out the grind and store it in the fridge.</p><p>To serve preheat a cup, then measure <strong>1/6</strong> of the coldbrew and top with <strong>5/6</strong> boiling water.</p>',
				waterMultiplier: 6,
				servingsMultiplier: 10,
				time: 1
			},
			{
				name: 'Frenchpress',
				description: '<p>A quick way to make coffee.</p><p>Put the grind in a french press and soak everything with the given amount of almost boiling water (let it cool a bit after boiling). Let it seep for <strong>4</strong> minutes.</p>',
				waterMultiplier: 17,
				servingsMultiplier: 7,
				time: 240
			}
	];

	//initialize selectedCoffeeType by selecting the first element in the array.
	var selectedCoffeeType = coffeeTypes[0];

	var coffeeWeight = 30;

})();