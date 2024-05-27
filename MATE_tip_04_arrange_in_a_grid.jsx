// This script for Adobe Illustrator arranges selected items in a grid with specified columns and gaps.
// v1.0, created with MATE, www.omata.io/mate

if (app.selection.length === 0) {
    alert("No items selected.");
} else {
    var dialog = new Window("dialog", "Arrange in Grid");
    
    // Number of columns
    var colGroup = dialog.add("group");
    colGroup.add("statictext", undefined, "Number of columns:");
    var colInput = colGroup.add("edittext", undefined, "3");
    colInput.characters = 5;
    
    // Gaps
    var gapGroup = dialog.add("group");
    gapGroup.add("statictext", undefined, "Horizontal gap:");
    var hGapInput = gapGroup.add("edittext", undefined, "0");
    hGapInput.characters = 5;
    gapGroup.add("statictext", undefined, "Vertical gap:");
    var vGapInput = gapGroup.add("edittext", undefined, "0");
    vGapInput.characters = 5;
    
    // Buttons
    var buttonGroup = dialog.add("group");
    buttonGroup.alignment = "center";
    var cancelButton = buttonGroup.add("button", undefined, "Cancel", {name: "cancel"});
    var runButton = buttonGroup.add("button", undefined, "Run", {name: "ok"});
    
    if (dialog.show() === 1) {
        var cols = parseInt(colInput.text, 10);
        var hGap = parseFloat(hGapInput.text);
        var vGap = parseFloat(vGapInput.text);
        
        var items = [];
        for (var i = 0; i < app.selection.length; i++) {
            if (!app.selection[i].locked && !app.selection[i].hidden) {
                items.push(app.selection[i]);
            }
        }
        
        var x = 0;
        var y = 0;
        var maxHeight = 0;
        for (var j = 0; j < items.length; j++) {
            items[j].position = [x, -y];
            maxHeight = Math.max(maxHeight, items[j].height);
            if ((j + 1) % cols === 0) {
                x = 0;
                y += maxHeight + vGap;
                maxHeight = 0;
            } else {
                x += items[j].width + hGap;
            }
        }
    }
}
