'use strict';

var generateRandomNumberWithExcepitons = require('../utils/generateRandomNumberWithExcepitons');
var quantityOfItemInArray = require('../utils/quantityOfItemInArray');

module.exports = function (router) {
    router.get('/', function (req, res) {
        var mapDataArray = [];

        var mapDimensionX = Number(req.query.mapColumns);
        var mapDimensionY = Number(req.query.mapRows);
        var cloudsQuantity = Number(req.query.clouds);
        var airportsQuantity = Number(req.query.airports);

        var mapArea = mapDimensionX * mapDimensionY;

        var cloudPositions = [];

        for (var cloudIndex = 0; cloudIndex < cloudsQuantity; cloudIndex++) {
            var newCloudPosition = generateRandomNumberWithExcepitons(
                mapArea,
                []
            );

            cloudPositions.push(newCloudPosition);
        }

        var airportPositions = [];

        for (var airportIndex = 0; airportIndex < airportsQuantity; airportIndex++) {
            var newAirportPosition = generateRandomNumberWithExcepitons(
                mapArea,
                cloudPositions
            );

            airportPositions.push(newAirportPosition);
        }

        for (var mapIndex = 0; mapIndex < mapArea; mapIndex++) {
            mapDataArray[mapIndex] = '.';
        }

        cloudPositions.map(function(cloudPosition) {
            mapDataArray[cloudPosition] = '*';
        });

        airportPositions.map(function(airportPosition) {
            mapDataArray[airportPosition] = 'A';
        });

        var day = 1;

        var propagationMapArray = Array.from(mapDataArray);
        var updatedNumberOfAirports = 0;

        function newDay() {
            var propagationsOfTheDay = [];

            propagationMapArray.map(function(item, index) {
                if(item === '*') {
                    var cloudPropagationTop = index - mapDimensionX;
                    var cloudPropagationBottom = index + mapDimensionX;
                    var cloudPropagationLeft = index - 1;
                    var cloudPropagationRight = index + 1;

                    propagationsOfTheDay.push(
                        cloudPropagationTop,
                        cloudPropagationBottom,
                        cloudPropagationLeft,
                        cloudPropagationRight
                    );
                }
            });

            propagationsOfTheDay.map(function(cloudIndex) {
                if(propagationMapArray[cloudIndex]){
                    propagationMapArray[cloudIndex] = '*';
                }
            });

            updatedNumberOfAirports = quantityOfItemInArray(propagationMapArray, 'A');
            day = day + 1;
        }

        do {
            newDay();
        } while (updatedNumberOfAirports === airportsQuantity);

        var coverFirstAirport = day;
        var mapFirstDay = Array.from(propagationMapArray);

        do {
            newDay();
        } while (quantityOfItemInArray(propagationMapArray, 'A'));

        var coverLastAirport = day;
        var mapLastDay = Array.from(propagationMapArray);

        res.json({
            mapDimensionX: mapDimensionX,
            mapDimensionY: mapDimensionY,
            map: mapDataArray,
            mapFirstDay: mapFirstDay,
            mapLastDay: mapLastDay,
            coverFirstAirport: coverFirstAirport,
            coverLastAirport: coverLastAirport
        });
    });
};
