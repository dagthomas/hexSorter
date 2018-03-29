const hexSorter = require('./hexSorter');
const chalk = require('chalk');
const log = console.log;

var color;
var colorArray = ["#516373", "#F2B999", "#F2C8C9", "#6C838C", "#F2F2F2"];
var sortedArray = [];
log("input array:");
for (var color in colorArray) {
    log(chalk.hex(colorArray[color]).underline('████'));
}

function sortStuff(input) {
    log("\r\noutput array:");
    for (var color in input) {
        color = hexSorter.mostBrightColor(colorArray);
        sortedArray.push(color);
        log(chalk.hex(color).underline('████'));
        colorArray.splice(colorArray.indexOf(color), 1);
        input.push("");
    }
}

sortStuff(colorArray);