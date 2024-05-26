
var doc = app.activeDocument;
var selectedItems = doc.selection;

if (selectedItems.length === 0) {
    alert("No items selected.");
} else {
    for (var i = 0; i < selectedItems.length; i++) {
        var item = selectedItems[i];
        if (!item.locked && !item.hidden) {
            var randomOpacity = Math.random() * (80 - 20) + 20;
            item.opacity = randomOpacity;
        }
    }
}
