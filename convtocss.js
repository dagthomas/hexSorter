const fs = require('fs');
const readline = require('readline');
const hexSorter = require('./hexSorter');

const outputFile = 'dagthomas.css';
const inputFile = 'colors.txt';

var lineno = 1;
var output = "";

fs.unlink(outputFile, function(err) {
    if (err && err.code == 'ENOENT') {
        //  console.info("File " + outputFile + " doesn't exist, won't remove it.");
    } else if (err) {
        //   console.error("Error occurred while trying to remove " + outputFile);
    } else {
        //   console.info(`removed ` + outputFile);
    }
});

var lineReader = readline.createInterface({
    input: fs.createReadStream(inputFile)
});

function writeToFile(input) {
    fs.appendFile(outputFile, input.toString(), function(err) {
        if (err) throw err;
    });

}

lineReader.on('line', function(line) {
    var hl1, hl2, fill, s1, s2;
    a = line.split(",");
    h1 = hexSorter.mostBrightColor(a);
    a.splice(a.indexOf(h1), 1);
    h2 = hexSorter.mostBrightColor(a);
    a.splice(a.indexOf(h2), 1);
    fill = hexSorter.mostBrightColor(a);
    a.splice(a.indexOf(fill), 1);
    s1 = hexSorter.mostBrightColor(a);
    a.splice(a.indexOf(s1), 1);
    s2 = hexSorter.mostBrightColor(a);
    a.splice(a.indexOf(s2), 1);

    output += "/* Palette #" + lineno + " */\r\n";
    output += "._dtp" + lineno + ".h1c {" + "color:       " + h1 + ";}\r\n";
    output += "._dtp" + lineno + ".h1bg {" + "background: " + h1 + ";}\r\n";
    output += "._dtp" + lineno + ".h1f {" + "fill:        " + h1 + ";}\r\n";
    output += "._dtp" + lineno + ".h1s {" + "stroke:      " + h1 + ";}\r\n";
    output += "._dtp" + lineno + ".h2c {" + "color:       " + h2 + ";}\r\n";
    output += "._dtp" + lineno + ".h2bg {" + "background: " + h2 + ";}\r\n";
    output += "._dtp" + lineno + ".h2f {" + "fill:        " + h2 + ";}\r\n";
    output += "._dtp" + lineno + ".h2s {" + "stroke:      " + h2 + ";}\r\n";
    output += "._dtp" + lineno + ".fc {" + "color:        " + fill + ";}\r\n";
    output += "._dtp" + lineno + ".fbg {" + "background:  " + fill + ";}\r\n";
    output += "._dtp" + lineno + ".ff {" + "fill:         " + fill + ";}\r\n";
    output += "._dtp" + lineno + ".fs {" + "stroke:       " + fill + ";}\r\n";
    output += "._dtp" + lineno + ".s1c {" + "color:       " + s1 + ";}\r\n";
    output += "._dtp" + lineno + ".s1bg {" + "background: " + s1 + ";}\r\n";
    output += "._dtp" + lineno + ".s1f {" + "fill:        " + s1 + ";}\r\n";
    output += "._dtp" + lineno + ".s1s {" + "stroke:      " + s1 + ";}\r\n";
    output += "._dtp" + lineno + ".s2c {" + "color:       " + s2 + ";}\r\n";
    output += "._dtp" + lineno + ".s2bg {" + "background: " + s2 + ";}\r\n";
    output += "._dtp" + lineno + ".s2f {" + "fill:        " + s2 + ";}\r\n";
    output += "._dtp" + lineno + ".s2s {" + "stroke:      " + s2 + ";}\r\n\r\n";

    lineno++;
});
lineReader.on('close', function() {
    writeToFile(output);
});