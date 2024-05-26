// Random opacity for selected items
// Created with MATE, www.omata.io/mate
// v1.0

var doc = app.activeDocument;
var selectedItems = doc.selection;

var min = 20;
var max = 80;

if (selectedItems.length === 0) {
    alert("No items selected.");
} else {
    for (var i = 0; i < selectedItems.length; i++) {
        var item = selectedItems[i];
        if (!item.locked && !item.hidden) {
            var randomOpacity = Math.random() * (max - min) + min;
            item.opacity = randomOpacity;
        }
    }
}
