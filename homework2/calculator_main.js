const calculator = require('./calculator');

var add_result = calculator.add(4, 2);
var sub_result = calculator.substract(4, 2);
var mul_result = calculator.multiply(4, 2);
var div_result = calculator.divide(4, 2);

console.log("add result: ", add_result);
console.log("sub result: ", sub_result);
console.log("mul result: ", mul_result);
console.log("div result: ", div_result);