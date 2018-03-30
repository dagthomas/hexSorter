module.exports = {
    strPad: function(input, padLength, padString) {
        var half = ''
        var padToGo

        var strPadRepeater = function(s, len) {
            var collect = ''

            while (collect.length < len) {
                collect += s
            }
            collect = collect.substr(0, len)

            return collect
        }

        input += ''
        padString = padString !== undefined ? padString : ' '

        if ((padToGo = padLength - input.length) > 0) {
            input = strPadRepeater(padString, padToGo) + input
        }
        return input
    },

    hexValueSanitize: function(color) {
        var red, green, blue, hex;

        color = color.replace(/[^A-Z0-9]/ig, "")
        color = color.replace("#", "");
        if (color.length > 6) {
            color = color.substring(0, 6);
        }
        if (color.length == 6) {
            hex = color;
        } else {
            if (color.length > 3) {
                color = color.substring(0, 3);
            }
            if (color.length == 3) {
                red = color.substring(0, 1) + color.substring(0, 1);
                green = color.substring(1, 2) + color.substring(1, 2);
                blue = color.substring(2, 3) + color.substring(2, 3);
                hex = red + green + blue;
            }
            if (color.length == 2) {
                hex = color + color + color;
            }
            if (color.length == 1) {
                hex = color + color + color + color + color + color;
            }
        }
        return '#' + hex;
    },

    hexToDec: function(hex) {
        hex = (hex + '').replace(/[^a-f0-9]/gi, '')
        return parseInt(hex, 16)
    },

    decToHex: function(number) {
        if (number < 0) {
            number = 0xFFFFFFFF + number + 1;
        }
        return parseInt(number, 10).toString(16);
    },


    hexToRgb: function(hex) {
        var red, green, blue;
        var rgb = [];

        hex = hex.replace('#', '');
        hex = this.hexValueSanitize(hex);
        if (hex.length == 3) {
            red = this.hexToDec(hex.substring(0, 1) + hex.substring(0, 1));
            green = this.hexToDec(hex.substring(1, 1) + hex.substring(1, 1));
            blue = this.hexToDec(hex.substring(2, 1) + hex.substring(2, 1));
        } else {
            red = this.hexToDec(hex.substring(0, 2));
            green = this.hexToDec(hex.substring(2, 4));
            blue = this.hexToDec(hex.substring(4, 6));
        }
        rgb.push(red, green, blue);
        return rgb;
    },
    hexBrightness: function(hex) {
        var red, green, blue;

        hex = this.hexValueSanitize(hex);
        hex = hex.replace('#', '');

        red = this.hexToDec(hex.substring(0, 2)) * 0.299;
        green = this.hexToDec(hex.substring(2, 4)) * 0.587;
        blue = this.hexToDec(hex.substring(4, 6)) * 0.114;

        return ((red) + (green) + (blue));
    },
    rgbToHsv: function(color) {
        var r = color[0] / 255;
        var g = color[1] / 255;
        var b = color[2] / 255;

        var h, s, min, max, del, dR, dG, dB;

        hsl = [];

        min = Math.min(r, g, b);
        max = Math.max(r, g, b);
        del = max - min;

        if (del == 0) {
            h = 0;
            s = 0;
        } else {
            s = del / max;

            dR = (((max - r) / 6) + (del / 2)) / del;
            dG = (((max - g) / 6) + (del / 2)) / del;
            dB = (((max - b) / 6) + (del / 2)) / del;

            if (r == max) {
                h = dB - dG;
            } else if (g == max) {
                h = (1 / 3) + dR - dB;
            } else if (b == max) {
                h = (2 / 3) + dG - dR;
            }

            if (h < 0) {
                h++;
            }

            if (h > 1) {
                h--;
            }
        }

        hsl['h'] = h;
        hsl['s'] = s;
        hsl['v'] = 0.9;

        return hsl;
    },
    hexToHsv: function(hex) {
        var rgb, hsv;

        hex = this.hexValueSanitize(hex).replace('#', '');

        rgb = this.hexToRgb(hex);
        hsv = this.rgbToHsv(rgb);

        return hsv;
    },
    mostBrightColor: function(colors) {
        var mostBright = false;
        var color, hex, brightness;

        for (i = 0; i < colors.length; i++) {
            color = this.hexValueSanitize(colors[i]);
            hex = color.replace('#', '');

            brightness = this.hexBrightness(hex);
            if (!mostBright || this.hexBrightness(hex) > this.hexBrightness(mostBright)) {
                mostBright = hex;
            }

        }
        return '#' + mostBright;
    },
    mostSaturatedColor: function(colors) {
        var mostSaturated = false;
        var color, hex, hsv, saturation, oldHsv;

        for (i = 0; i < colors.length; i++) {
            color = this.hexValueSanitize(colors[i]);
            hex = color.replace('#', '');
            hsv = this.hexToHsv(hex);

            saturation = hsv['s'];

            if (mostSaturated) {
                oldHsv = this.hexToHsv(mostSaturated);
            }

            if (!mostSaturated || saturation > oldHsv['s']) {
                mostSaturated = hex;
            }
        }
        return '#' + mostSaturated;
    },
    colorMixer: function(hex1, hex2, percent) {
        var r1, r2, g1, g2, b1, b2;
        hex1 = this.hexValueSanitize(hex1);
        hex2 = this.hexValueSanitize(hex2);

        hex1 = hex1.replace('#', '');
        if (hex1.length == 3) {
            hex1 = hex1.repeat(hex1.substr(0, 1), 2) + hex1.repeat(hex1.substr(1, 2), 2) + hex1.repeat(hex1.substr(2, 3), 2);
        }

        hex2 = hex2.replace('#', '');
        if (hex2.length == 3) {
            hex2 = hex2.repeat(hex2.substr(0, 1), 2) + hex2.repeat(hex2.substr(1, 2), 2) + hex2.repeat(hex2.substr(2, 3), 2);
        }

        r1 = this.hexToDec(hex1.substr(0, 2));
        g1 = this.hexToDec(hex1.substr(2, 2));
        b1 = this.hexToDec(hex1.substr(4, 2));

        r2 = this.hexToDec(hex2.substr(0, 2));
        g2 = this.hexToDec(hex2.substr(2, 2));
        b2 = this.hexToDec(hex2.substr(4, 2));

        red = (percent * r1 + (100 - percent) * r2) / 100;
        green = (percent * g1 + (100 - percent) * g2) / 100;
        blue = (percent * b1 + (100 - percent) * b2) / 100;

        var red_hex = this.strPad(this.decToHex(red), 2, '0');
        var green_hex = this.strPad(this.decToHex(green), 2, '0');
        var blue_hex = this.strPad(this.decToHex(blue), 2, '0');

        return '#' + red_hex + green_hex + blue_hex;
    }
}

/*
var colorArray = ["#516373", "#6c838c", "#f2e8c9", "#f2b999", "#f2f2f2"];

console.log("bright", module.exports.mostBrightColor(colorArray));
console.log("saturated", module.exports.mostSaturatedColor(colorArray));
console.log("mix", module.exports.colorMixer('#000000', '#FF0000', 65));
*/