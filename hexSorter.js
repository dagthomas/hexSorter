module.exports = {
    hexValueSanitize: function(color) {
        return color.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
        ,(m, r, g, b) => r + r + g + g + b + b).replace('#', '');
    },
    hexToDec: function(hex) {
        return parseInt((hex + '').replace(/[^a-f0-9]/gi, ''), 16);
    },
    decToHex: function(number) {
        return number < 0 ? 0xFFFFFFFF + number + 1 : parseInt(number, 10).toString(16);
    },
    hexToRgb: function(hex) {
        hex = this.hexValueSanitize(hex);
        return hex.length == 3 ? [this.hexToDec(hex[0] + hex[0]), this.hexToDec(hex[1] + hex[1]), this.hexToDec(hex[2] + hex[2])] : [this.hexToDec(hex[0] + hex[1]), this.hexToDec(hex[2] + hex[3]), this.hexToDec(hex[4] + hex[5])];
    },
    hexBrightness: function(hex, type) {
        let conversion;

        if (type == 'BT601') {
            conversion = [0.299, 0.587, 0.114]; //BT601
        } else if (type == 'BT709') {
            conversion = [0.2126, 0.7152, 0.0722]; //BT709
        } else if (type == 'BT2020') {
            conversion = [0.2627, 0.6780, 0.0593]; //BT2020
        } else {
            conversion = [0.299, 0.587, 0.114]; //BT601
        };

        hex = this.hexValueSanitize(hex);

        return (this.hexToDec(hex[0] + hex[1]) * conversion[0] + this.hexToDec(hex[2] + hex[3]) * conversion[1] + this.hexToDec(hex[4] + hex[5]) * conversion[2]);
    },
    rgbToHsv: function(color) {
        let r = color[0] / 255;
        let g = color[1] / 255;
        let b = color[2] / 255;

        let h,s,min,max,del,dR,dG,dB,hsl;

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
            };

            if (h < 0) {
                h++;
            };

            if (h > 1) {
                h--;
            };
        };

        hsl['h'] = h;
        hsl['s'] = s;
        hsl['v'] = 0.9;

        return hsl;
    },
    hexToHsv: function(hex) {
        let rgb, hsv;

        hex = this.hexValueSanitize(hex);

        rgb = this.hexToRgb(hex);
        hsv = this.rgbToHsv(rgb);

        return hsv;
    },
    mostBrightColor: function(colors, type) {
        let mostBright = false;
        let hex;

        colors.forEach((color) => {
            hex = this.hexValueSanitize(color);

            brightness = this.hexBrightness(hex, type);
            if (!mostBright || this.hexBrightness(hex, type) > this.hexBrightness(mostBright, type)) {
                mostBright = hex;
            };
        });

        return `#${mostBright}`;
    },
    mostSaturatedColor: function(colors) {
        let mostSaturated = false;
        let hex, hsv, saturation, oldHsv;

        colors.forEach((color) => {
            hex = this.hexValueSanitize(color);
            hsv = this.hexToHsv(hex);

            saturation = hsv['s'];

            if (mostSaturated) {
                oldHsv = this.hexToHsv(mostSaturated);
            };

            if (!mostSaturated || saturation > oldHsv['s']) {
                mostSaturated = hex;
            };
        });

        return `#${mostSaturated}`
    },
    colorMixer: function(hex1, hex2, percent) {
        hex1 = this.hexValueSanitize(hex1);
        hex2 = this.hexValueSanitize(hex2);
        
        if (hex1.length == 3) {
            hex1 = hex1.repeat(hex1[0], 2) + hex1.repeat(hex1[1], 2) + hex1.repeat(hex1[2], 2);
        };

        if (hex2.length == 3) {
            hex2 = hex2.repeat(hex2[0], 2) + hex2.repeat(hex2[1], 2) + hex2.repeat(hex2[2], 2);
        };

        let red_hex = this.decToHex((percent * this.hexToDec(hex1[0] + hex1[1]) + (100 - percent) * this.hexToDec(hex2[0] + hex2[1])) / 100).padStart(2, '0');
        let green_hex = this.decToHex((percent * this.hexToDec(hex1[2] + hex1[3]) + (100 - percent) * this.hexToDec(hex2[2] + hex2[3])) / 100).padStart(2, '0');
        let blue_hex =this.decToHex((percent * this.hexToDec(hex1[4] + hex1[5]) + (100 - percent) * this.hexToDec(hex2[4] + hex2[5])) / 100).padStart(2, '0');

        return `#${red_hex+green_hex+blue_hex}`;
    },
    sortColors: function(colors, type) {
        const input = colors.slice(0);
        const output = [];
      
        while (input.length > 0) {
          const color = this[type](input)
          let index = input.indexOf(color);
          if (index > -1) {
            input.splice(index, 1);
          }
          output.push(color)
        }
        return output
      },
      mixSortColors: function(colors, type, mixcolor, percentage) {
        const input = colors.slice(0)
        const output = []

        while (input.length > 0) {
          const color = this[type](input)
          let index = input.indexOf(color);
          if (index > -1) {
            input.splice(index, 1);
          }
          output.push(this.colorMixer(color, mixcolor, percentage))
        }
        return output
      }
}