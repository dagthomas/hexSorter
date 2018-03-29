const fs = require('fs');
const readline = require('readline');
const hexfix = require('./hexfix');

const outputFile = 'dagthomas.css';
const inputFile = 'colors.txt';

var lineno = 1;
var output;

var lineReader = readline.createInterface({
    input: fs.createReadStream(inputFile)
});

function writeToFile(input) {
    fs.appendFile(outputFile, input.toString(), function(err) {
        if (err) throw err;
    });

}

lineReader.on('line', function(line) {
    output = "";
    var hl1, hl2, fill, s1, s2;
    a = line.split(",");
    h1 = hexfix.mostBrightColor(a);
    a.splice(a.indexOf(h1), 1);
    h2 = hexfix.mostBrightColor(a);
    a.splice(a.indexOf(h2), 1);
    fill = hexfix.mostBrightColor(a);
    a.splice(a.indexOf(fill), 1);
    s1 = hexfix.mostBrightColor(a);
    a.splice(a.indexOf(s1), 1);
    s2 = hexfix.mostBrightColor(a);
    a.splice(a.indexOf(s2), 1);

    output += ".palette" + lineno + ".h1c {" + "color: " + h1 + ";}\r\n";
    output += ".palette" + lineno + ".h1bg {" + "background: " + h1 + ";}\r\n";
    output += ".palette" + lineno + ".h2c {" + "color: " + h2 + ";}\r\n";
    output += ".palette" + lineno + ".h2bg {" + "background: " + h2 + ";}\r\n";
    output += ".palette" + lineno + ".fillc {" + "color: " + fill + ";}\r\n";
    output += ".palette" + lineno + ".fillbg {" + "background: " + fill + ";}\r\n";
    output += ".palette" + lineno + ".s1c {" + "color: " + s1 + ";}\r\n";
    output += ".palette" + lineno + ".s1bg {" + "background: " + s1 + ";}\r\n";
    output += ".palette" + lineno + ".s2c {" + "color: " + s2 + ";}\r\n";
    output += ".palette" + lineno + ".s2bg {" + "background: " + s2 + ";}\r\n";

    writeToFile(output);
    lineno++;
});