const hexSorter = require('./hexSorter');
const log = console.log;
var colorArray = ["#516373", "#f2b999", "#f2e8c9", "#6c838c", "#f2f2f2"];

var mixColor = hexSorter.colorMixer(colorArray[0], "#fff", 50);
var mostBright = hexSorter.sortColors(colorArray, 'mostBrightColor');
var mostSaturatedColor = hexSorter.sortColors(colorArray, 'mostSaturatedColor');
var colorMixed = hexSorter.colorMixer("#516373", "#fff", 50);
var mixSort = hexSorter.mixSortColors(colorArray, 'mostBrightColor', "#fff", 50);

console.log("Mixed with 50% white: ", mixColor);
console.log("Sorted by brightness: ", mostBright);
console.log("Sorted by saturation: ", mostSaturatedColor);
console.log("Mix #fff sorted: ", mixSort);
console.log("Mix #516373 with #fff - 50%: ", colorMixed);
