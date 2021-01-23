module.exports = function generateRandom(limit, exceptionsArray) {
    var number = Math.floor(Math.random() * limit);

    var numberInArray = exceptionsArray.includes(number);

    return numberInArray ? generateRandom(limit, exceptionsArray) : number;
};
