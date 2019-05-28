const hexSorter = require('../hexSorter');
const chalk = require('chalk');
const log = console.log;

var colorArray = ["#516373", "#f2b999", "#f2e8c9", "#6c838c", "#f2f2f2"];
var sorted = hexSorter.sortColors(colorArray, 'mostBrightColor');
var saturated = hexSorter.sortColors(colorArray, 'mostSaturatedColor');
var mixSort = hexSorter.mixSortColors(colorArray, 'mostBrightColor', "#fff", 50);
var mixSort2 = hexSorter.mixSortColors(colorArray, 'mostBrightColor', "#333", 50);

log("input array:");
for (var col in colorArray) {
    log(chalk.hex(colorArray[col]).underline('████'));
}

log("\r\nsorted by brightness:");
for (var col in sorted) {
    log(chalk.hex(sorted[col]).underline('████'));
}

log("\r\nsorted by saturation:");
for (var col in saturated) {
    log(chalk.hex(saturated[col]).underline('████'));
}

log("\r\nmix #fff sorted:");
for (var col in mixSort) {
    log(chalk.hex(mixSort[col]).underline('████'));
}

log("\r\nmix #333 sorted:");
for (var col in mixSort2) {
    log(chalk.hex(mixSort2[col]).underline('████'));
}
