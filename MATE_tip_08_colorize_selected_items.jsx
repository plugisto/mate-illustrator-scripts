/*
This script colorizes the selected items in Adobe Illustrator by randomly picking a color from the "colors" layer. The probability of each color being picked is proportional to the width of the color items.
v1.0.0, created with MATE, www.omata.io/mate
*/

if (app.activeDocument.selection.length === 0) {
    alert("No items selected.");
} else {
    var doc = app.activeDocument;
    var colorsLayer = doc.layers.getByName("colors");
    var colorItems = colorsLayer.pageItems;
    var totalWidth = 0;
    var colorWidths = [];
    var colorObjects = [];

    // Calculate total width and store color objects
    for (var i = 0; i < colorItems.length; i++) {
        if (!colorItems[i].locked && !colorItems[i].hidden) {
            var itemWidth = colorItems[i].width;
            totalWidth += itemWidth;
            colorWidths.push(itemWidth);
            colorObjects.push(colorItems[i].fillColor);
        }
    }

    // Function to get a random color based on width ratio
    function getRandomColor() {
        var randomValue = Math.random() * totalWidth;
        var cumulativeWidth = 0;
        for (var j = 0; j < colorWidths.length; j++) {
            cumulativeWidth += colorWidths[j];
            if (randomValue <= cumulativeWidth) {
                return colorObjects[j];
            }
        }
    }

    // Apply random color to selected items
    for (var k = 0; k < doc.selection.length; k++) {
        var selectedItem = doc.selection[k];
        if (!selectedItem.locked && !selectedItem.hidden) {
            selectedItem.filled = true;
            selectedItem.fillColor = getRandomColor();
        }
    }
}
