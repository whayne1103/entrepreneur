/**
 * 
 */

var global = new Object();

global.isLocationInNode = function(node, location) {
	var locationInNode = node.convertToNodeSpace(location);
	var s = node.getContentSize();
	var rect = cc.rect(0, 0, s.width, s.height);
    return cc.rectContainsPoint(rect, locationInNode);
}
