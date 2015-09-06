/**
 * 
 */

var StartLayer = cc.Layer.extend({
    sprite: null,
    newGameBtn: null,

    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();
        //cc.log("StartLayer:ctor");

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;

        var scene = ccs.load(res.StartScene_json);
        var root = scene.node;
        this.addChild(root);
        
        this.newGameBtn = ccui.helper.seekWidgetByName(root, "NewGameButton");
        this.newGameBtn.addTouchEventListener(this.onTouchEvent, this);

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
    		if (widget.getName() === this.newGameBtn.getName()) {
                cc.director.pushScene(new MainScene());
    		}
        	break;
        }
    },

    onExit:function () {
        this._super();
        //cc.log("StartLayer:onExit");
    }
	
});

var StartScene = cc.Scene.extend({
    ctor:function () {
    	cc.log(res);
        this._super();
	    //cc.log("StartScene:ctor");
        var layer = new StartLayer();
        this.addChild(layer);
    }
});

