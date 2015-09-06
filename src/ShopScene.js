/**
 * 
 */

var ShopLayer = cc.Layer.extend({
    sprite: null,
    backBtn: null,

    ctor:function () {
        this._super();
        //cc.log("StartLayer:ctor");

        var size = cc.winSize;

        var scene = ccs.load(res.ShopScene_json);
        var root = scene.node;
        this.addChild(root);
        
        this.backBtn = ccui.helper.seekWidgetByName(root, "BackButton");
        this.backBtn.addTouchEventListener(this.onTouchEvent, this);

        return true;
    },
    
    onEnter:function () {
        this._super();
        //cc.log("StartLayer:onEnter");
    },
    
    onTouchEvent: function (widget, evtType) {
        switch (evtType) {
        case ccui.Widget.TOUCH_BEGAN:
            //cc.log("TOUCH_BEGAN");
        	break;
        case ccui.Widget.TOUCH_ENDED:
            //cc.log("TOUCH_ENDED");
    		if (widget.getName() === this.backBtn.getName()) {
    			cc.director.popScene();
    		}
        	break;
        }
    },

    onExit:function () {
        this._super();
        //cc.log("StartLayer:onExit");
    }
	
});

var ShopScene = cc.Scene.extend({
    ctor:function () {
        this._super();
	    //cc.log("StartScene:ctor");
        var layer = new ShopLayer();
        this.addChild(layer);
    }
});

