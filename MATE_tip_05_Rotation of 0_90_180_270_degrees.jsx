/*
This script randomly rotates each selected item in the active Adobe Illustrator document
by one of the following angles: 0, 90, 180, or 270 degrees. It skips items that are locked or hidden.
v1.0 - created with MATE, www.omata.io/mate
*/

var doc = app.activeDocument;
var selectedItems = doc.selection;

if (selectedItems.length === 0) {
    alert("No items selected.");
} else {
    var rotationValues = [0, 90, 180, 270];
    
    for (var i = 0; i < selectedItems.length; i++) {
        var item = selectedItems[i];
        
        if (!item.locked && !item.hidden) {
            var randomIndex = Math.floor(Math.random() * rotationValues.length);
            var rotationAngle = rotationValues[randomIndex];
            item.rotate(rotationAngle);
        }
    }
}
