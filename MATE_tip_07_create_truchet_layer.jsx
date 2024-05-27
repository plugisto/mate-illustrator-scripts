/*
This script generates a grid of Truchet tiles in Adobe Illustrator. It creates a triangle shape, clones it to form a grid, applies random rotations and opacities to each tile, groups the tiles, and centers the group on the current artboard. The user can specify the number of tiles and columns through a UI.

v1.0 - created with MATE, www.omata.io/mate
*/

var doc = app.activeDocument;

// Create UI
var dialog = new Window('dialog', 'Truchet Tile Generator');
dialog.orientation = 'column';

var tileGroup = dialog.add('group');
tileGroup.add('statictext', undefined, 'Number of Tiles:');
var tileInput = tileGroup.add('edittext', undefined, '144');
tileInput.characters = 5;

var columnGroup = dialog.add('group');
columnGroup.add('statictext', undefined, 'Number of Columns:');
var columnInput = columnGroup.add('edittext', undefined, '12');
columnInput.characters = 5;

var buttonGroup = dialog.add('group');
buttonGroup.orientation = 'row';
var cancelButton = buttonGroup.add('button', undefined, 'Cancel', {name: 'cancel'});
var runButton = buttonGroup.add('button', undefined, 'Run', {name: 'ok'});

cancelButton.onClick = function() {
    dialog.close();
};

runButton.onClick = function() {
    var numTiles = parseInt(tileInput.text);
    var numCols = parseInt(columnInput.text);
    var numRows = Math.ceil(numTiles / numCols);
    var spacing = 120;

    // Hide current layer and create new one
    var currentLayer = doc.activeLayer;
    currentLayer.visible = false;
    var newLayer = doc.layers.add();
    newLayer.name = "truchet";

    // Create a 120x120 rectangle with white fill and no stroke
    var rect = newLayer.pathItems.rectangle(0, 0, 120, 120);
    var whiteColor = new RGBColor();
    whiteColor.red = 255;
    whiteColor.green = 255;
    whiteColor.blue = 255;
    rect.filled = true;
    rect.fillColor = whiteColor;
    rect.stroked = false;

    // Delete the top left anchor point to form a triangle
    rect.pathPoints[0].remove();

    // Clone the item to create the grid
    for (var row = 0; row < numRows; row++) {
        for (var col = 0; col < numCols; col++) {
            if (row === 0 && col === 0) continue; // Skip the original item
            var newItem = rect.duplicate();
            newItem.position = [col * spacing, -row * spacing];
        }
    }

    // Select all items in the new layer
    newLayer.hasSelectedArtwork = true;
    var selectedItems = doc.selection;

    // Rotate and set random opacity for each item
    for (var i = 0; i < selectedItems.length; i++) {
        var item = selectedItems[i];
        if (!item.locked && !item.hidden) {
            var randomRotation = [0, 90, 180, 270][Math.floor(Math.random() * 4)];
            var randomOpacity = Math.random() * 100;
            item.rotate(randomRotation);
            item.opacity = randomOpacity;
        }
    }

    // Group the selection and center it on the artboard
    var group = doc.groupItems.add();
    for (var i = 0; i < selectedItems.length; i++) {
        selectedItems[i].moveToBeginning(group);
    }

    var artboard = doc.artboards[doc.artboards.getActiveArtboardIndex()];
    var artboardRect = artboard.artboardRect;
    var artboardCenterX = (artboardRect[2] + artboardRect[0]) / 2;
    var artboardCenterY = (artboardRect[1] + artboardRect[3]) / 2;

    var groupBounds = group.visibleBounds;
    var groupWidth = groupBounds[2] - groupBounds[0];
    var groupHeight = groupBounds[1] - groupBounds[3];
    var groupCenterX = groupBounds[0] + groupWidth / 2;
    var groupCenterY = groupBounds[1] - groupHeight / 2;

    var offsetX = artboardCenterX - groupCenterX;
    var offsetY = artboardCenterY - groupCenterY;

    group.position = [group.position[0] + offsetX, group.position[1] + offsetY];

    dialog.close();
};

dialog.show();
