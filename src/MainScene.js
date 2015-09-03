/**
 * 
 */

var MainLayer = cc.Layer.extend({
    sprite:null,
    BackBtn:null,
    ComputerBtn:null,
    InfoBtn:null,
    TaskBtn:null,

    ctor:function () {
        this._super();
        //cc.log("MainLayer:ctor");

        var size = cc.winSize;

        var scene = ccs.load(res.MainScene_json);
        var root = scene.node;
        this.addChild(root);
        
        this.BackBtn = ccui.helper.seekWidgetByName(root, "BackButton");
        this.BackBtn.addTouchEventListener(this.onTouchEvent, this);
        
        this.ComputerBtn = ccui.helper.seekWidgetByName(root, "ComputerButton");
        this.ComputerBtn.addTouchEventListener(this.onTouchEvent, this);
        
        this.InfoBtn = ccui.helper.seekWidgetByName(root, "InfoButton");
        this.InfoBtn.addTouchEventListener(this.onTouchEvent, this);
        
        this.TaskBtn = ccui.helper.seekWidgetByName(root, "TaskButton");
        this.TaskBtn.addTouchEventListener(this.onTouchEvent, this);

        return true;
    },
    
    onEnter:function () {
        this._super();
        //cc.log("MainLayer:onEnter");
    },
    
    onTouchEvent: function (widget, evtType) {
        switch (evtType) {
        case ccui.Widget.TOUCH_BEGAN:
            cc.log("TOUCH_BEGAN");
        	break;
        case ccui.Widget.TOUCH_ENDED:
            cc.log("TOUCH_ENDED");
    		if (widget.getName() === this.ComputerBtn.getName()) {
                cc.director.pushScene(new ShopScene());
    		}
    		else if (widget.getName() === this.BackBtn.getName()) {
    			cc.director.popScene();
    		}
    		else if (widget.getName() === this.InfoBtn.getName()) {
                cc.director.pushScene(new InfoScene());
    		}
    		else if (widget.getName() === this.TaskBtn.getName()) {
                cc.director.pushScene(new TaskScene());
    		}
        	break;
        }
    },

    onExit:function () {
        this._super();
        //cc.log("MainLayer:onExit");
    }
	
});

var MainScene = cc.Scene.extend({
    ctor:function () {
        this._super();
	    //cc.log("MainScene:ctor");
        var layer = new MainLayer();
        this.addChild(layer);
    }
});

