# hexSorter v1.3.1

### Original:
![alt text](https://raw.githubusercontent.com/dagthomas/hexSorter/master/images/unsorted_hexSorter.png "Unsorted Color Array")

### Sorted:
![alt text](https://raw.githubusercontent.com/dagthomas/hexSorter/master/images/sorted_hexSorter.png "Sorted Color Array")

## Installation
In a browser:
```html
<script src="hexSorter.js"></script>
```

Using npm:
```shell
$ npm i --save hexsorter
```

In Node.js:
```js
// Load the module.
const hexSorter = require('hexSorter');
```

## Why hexSorter?

hexSorter was based on an old Adobe Kuler plugin in php. Rewritten to work with<br>
new technology.<br>

Its usage is to automagically sort colors by luminosity, to generate style<br>
sheets or vector fill/strokes.<br>

 * Sort colors by luminosity
 * Get brightest color from array
 * Get most saturated color from array
 * Mix hexadecimal color values to create/diffuse colors
 * Choose conversion type for RGB->Y. BT.601, BT709, BT2020
 <br>

## Usage
```js
const hexSorter = require('./hexSorter');
const log = console.log;
var colorArray = ["#516373", "#f2b999", "#f2e8c9", "#6c838c", "#f2f2f2"];

var mostBright = hexSorter.sortColors(colorArray, 'mostBrightColor');
var mostSaturatedColor = hexSorter.sortColors(colorArray, 'mostSaturatedColor');

console.log("Sorted by brightness: ", mostBright);
console.log("Sorted by saturation: ", mostSaturatedColor);

```
## Examples

Can be found in the /examples/ folder, be sure to run:

```shell
npm install
```

in the examples folder before testing examples.

## Node.js console example

sortcolors.js - NodeJS example, showing how sorting works
```shell
node sortcolors
```

![alt text](https://raw.githubusercontent.com/dagthomas/hexSorter/master/images/output_hexSorter.png "Sorted Color Array")


### Web example

[Hex Sorter - Stack Blitz Pure JS example](https://stackblitz.com/edit/hexsorter?file=index.js)

[Hex Sorter - Stack Blitz Vue example](https://stackblitz.com/edit/hexsorter-vue?file=index.js)


### Adobe Kuler Top 100 palettes, 2017 (nvrfrgt)

convtocss.js - NodeJS example, reading from file, outputting to css.

```shell
node convtocss
```

Outputs 'output/dagthomas.css' based on color arrays in 'input/colors.txt' (from an earlier php Kuler project, nvrfrgt).

[Color Input](https://github.com/dagthomas/hexSorter/blob/master/examples/input/colors.txt)

[CSS Output](https://github.com/dagthomas/hexSorter/blob/master/examples/output/dagthomas.css)

### Example of CSS file used on SVG in HTML
![alt text](https://raw.githubusercontent.com/dagthomas/hexSorter/master/images/example_hexSorter.png "Example of palette applied to SVG")

## Shoutouts
The wonderful str_pad remake

[javascript str_pad](http://locutus.io/php/str_pad/)
