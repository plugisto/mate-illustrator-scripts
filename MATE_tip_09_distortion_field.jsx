
var doc = app.activeDocument;
var gridLayer = doc.layers.getByName("grid");
var refLayer = doc.layers.getByName("ref");
var refCircle = refLayer.pathItems[0];

var minOpacity = 5; // Minimum opacity value
var maxOpacity = 100; // Maximum opacity value
var minSize = 10; // Minimum size value
var maxSize = 100; // Maximum size value
var invertSize = true; // Invert size scaling
var affectOpacity = true; // Flag to affect opacity
var affectSize = true; // Flag to affect size
var defaultOpacity = 100; // Default opacity value
var defaultSize = 20; // Default size value

var refCenter = [refCircle.position[0] + refCircle.width / 2, refCircle.position[1] - refCircle.height / 2];
var refRadius = refCircle.width / 2;

for (var i = 0; i < gridLayer.pathItems.length; i++) {
    var item = gridLayer.pathItems[i];
    if (item.locked || item.hidden) continue;

    // Initialize default values
    item.opacity = defaultOpacity;
    var scaleFactor = defaultSize / item.width;
    item.resize(scaleFactor * 100, scaleFactor * 100, true, true, true, true, scaleFactor * 100, Transformation.CENTER);

    var itemCenter = [item.position[0] + item.width / 2, item.position[1] - item.height / 2];
    var distance = Math.sqrt(Math.pow(itemCenter[0] - refCenter[0], 2) + Math.pow(itemCenter[1] - refCenter[1], 2));

    if (affectOpacity) {
        var opacity = maxOpacity - ((distance / refRadius) * (maxOpacity - minOpacity));
        if (opacity < minOpacity) opacity = minOpacity;
        if (opacity > maxOpacity) opacity = maxOpacity;
        item.opacity = opacity;
    }

    if (affectSize) {
        var sizeFactor = (distance / refRadius);
        if (invertSize) sizeFactor = 1 - sizeFactor;
        var newSize = minSize + (sizeFactor * (maxSize - minSize));
        if (newSize < minSize) newSize = minSize;
        if (newSize > maxSize) newSize = maxSize;

        var scaleFactor = newSize / item.width;
        item.resize(scaleFactor * 100, scaleFactor * 100, true, true, true, true, scaleFactor * 100, Transformation.CENTER);
    }
}
