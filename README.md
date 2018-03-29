# hexSorter

Original:
![alt text](https://raw.githubusercontent.com/dagthomas/hexSorter/master/images/unsorted_hexSorter.png "Unsorted Color Array")

Sorted:
![alt text](https://raw.githubusercontent.com/dagthomas/hexSorter/master/images/sorted_hexSorter.png "Sorted Color Array")


```javascript
var colorArray = ["#516373", "#f2b999", "#f2e8c9", "#6c838c", "#f2f2f2"];

console.log("bright", module.exports.mostBrightColor(colorArray));
console.log("saturated", module.exports.mostSaturatedColor(colorArray));
console.log("bright dull", module.exports.brightestDullColor(colorArray));
console.log("mix", module.exports.colorMixer('#000000', '#FF0000', 65));

```

## convtocss.js - NodeJS example, reading from file, outputting to css.