/*
This script allows the user to set the number of selected items in Adobe Illustrator.
It provides a UI to enter the desired number of items, with a cancel button and a "Run" button.
If the current selection is less than the desired number, it duplicates the selected item to reach the count.
If the current selection is more than the desired number, it deletes the excess items.
An alert is shown if no items are selected.

v1.0 - created with MATE, www.omata.io/mate
*/

var doc = app.activeDocument;
var selectedItems = doc.selection;

if (selectedItems.length === 0) {
    alert("No items selected.");
} else {
    var initialCount = selectedItems.length;

    var dialog = new Window("dialog", "Set Number of Items");
    dialog.orientation = "column";
    dialog.alignChildren = ["fill", "top"];

    var inputGroup = dialog.add("group");
    inputGroup.add("statictext", undefined, "Number of items:");
    var itemCountInput = inputGroup.add("edittext", undefined, initialCount.toString());
    itemCountInput.characters = 5;

    var buttonGroup = dialog.add("group");
    buttonGroup.alignment = "center";
    var cancelButton = buttonGroup.add("button", undefined, "Cancel", {name: "cancel"});
    var runButton = buttonGroup.add("button", undefined, "Run", {name: "ok"});

    cancelButton.onClick = function() {
        dialog.close();
    };

    runButton.onClick = function() {
        var itemCount = parseInt(itemCountInput.text, 10);
        if (isNaN(itemCount) || itemCount < 1) {
            alert("Please enter a valid number greater than 0.");
            return;
        }

        var originalItem = selectedItems[0];
        var x = originalItem.position[0];
        var y = originalItem.position[1];
        var currentCount = selectedItems.length;

        if (currentCount < itemCount) {
            for (var i = currentCount; i < itemCount; i++) {
                var newItem = originalItem.duplicate();
                newItem.position = [x + (i * 10), y - (i * 10)];
            }
        } else if (currentCount > itemCount) {
            for (var j = currentCount - 1; j >= itemCount; j--) {
                selectedItems[j].remove();
            }
        }

        dialog.close();
    };

    dialog.show();
}
