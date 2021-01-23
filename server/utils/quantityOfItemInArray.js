module.exports = function quantityOfItemInArray(array, item) {
    var quantityOfItems = array.filter(function(i) {
        return i === item;
    }).length;

    return quantityOfItems;
};

