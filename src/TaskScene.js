/**
 * 
 */

var TaskLayer = cc.Layer.extend({
    sprite : null,
    backBtn : null,
    listView : null,
    doTaskBtn : null,
    abortTaskBtn : null,

    ctor : function () {
        this._super();
        //cc.log("StartLayer:ctor");

        var size = cc.winSize;

        var scene = ccs.load(res.TaskScene_json);
        var root = scene.node;
        this.addChild(root);
        
        this.backBtn = ccui.helper.seekWidgetByName(root, "BackButton");
        this.backBtn.addTouchEventListener(this.onTouchEvent, this);
        
        this.listView = ccui.helper.seekWidgetByName(root, "ListView_1");
        this.listView.addEventListener(this.onSelectedItemEvent, this);
        this.addListItem();
        
        this.doTaskBtn = ccui.helper.seekWidgetByName(root, "StartButton");
        this.doTaskBtn.addTouchEventListener(this.onTouchEvent, this);
        
        this.abortTaskBtn = ccui.helper.seekWidgetByName(root, "StopButton");
        this.abortTaskBtn.addTouchEventListener(this.onTouchEvent, this);

        return true;
    },
    
    onEnter : function () {
        this._super();
        //cc.log("StartLayer:onEnter");
    },
    
    addListItem : function() {
    	cc.log("addListItem");
        var listItems = gameData.taskList.Items;
        for (x in listItems) {
    		var item = new ccui.Button;
    		item.titleText = listItems[x].Name + " " + listItems[x].Title;
    		this.listView.pushBackCustomItem(item);
        }
    },
    
    onTouchEvent : function (sender, evtType) {
        switch (evtType) {
        case ccui.Widget.TOUCH_BEGAN:
            cc.log("TOUCH_BEGAN");
        	break;
        case ccui.Widget.TOUCH_ENDED:
            cc.log("TOUCH_ENDED");
    		if (this.backBtn.getName() === sender.getName()) {
    			cc.director.popScene();
    		}
    		else if (this.doTaskBtn.getName() === sender.getName()) {
    			gameData.curTaskIndex = this.listView.getCurSelectedIndex();
    			cc.log(gameData.curTaskIndex);
    			if (gameData.curTaskIndex >= 0) {
    				cc.director.runScene(new DoTaskScene());
    			}
    		}
    		else if (this.abortTaskBtn.getName() === sender.getName()) {
    			
    		}
        	break;
        }
    },
    
    onSelectedItemEvent : function(sender, evtType) {
    	cc.log("onSelectedItemEvent");
    },

    onExit:function () {
        this._super();
        //cc.log("StartLayer:onExit");
    }
	
});

var TaskScene = cc.Scene.extend({
    ctor:function () {
        this._super();
	    //cc.log("StartScene:ctor");
        var layer = new TaskLayer();
        this.addChild(layer);
    }
});

