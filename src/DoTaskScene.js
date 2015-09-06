/**
 * 
 */

var EC_DIALOG_FINISHED = "dialog_finished";

var AwardLayer = cc.Layer.extend({
	award : null,
	root : null,
	index : 0,
	listener : null,
	
	ctor : function(award) {
		this._super();
		
		this.award = award;
		
		var layer = ccs.load(res.AwardLayer_json);
		this.root = layer.node;
		this.addChild(this.root);
		
		if (typeof this.award.Courage != "undefined") {
			this.setText("勇气", this.award.Courage);
		}
		if (typeof this.award.Execution != "undefined") {
			this.setText("执行力", this.award.Execution);
		}
		if (typeof this.award.Vision != "undefined") {
			this.setText("视野", this.award.Vision);
		}
		if (typeof this.award.Leadership != "undefined") {
			this.setText("领导力", this.award.Leadership);
		}
		if (typeof this.award.Affinity != "undefined") {
			this.setText("亲和力", this.award.Affinity);
		}
		if (typeof this.award.Introspection != "undefined") {
			this.setText("反省", this.award.Introspection);
		}
		if (typeof this.award.Challenge != "undefined") {
			this.setText("挑战点数", this.award.Challenge);
		}
        
		this.listener = cc.EventListener.create({
        	event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan.bind(this)
        })
        cc.eventManager.addListener(this.listener, -1);
	},
	
	setText : function(name, value) {
		var node1 = ccui.helper.seekWidgetByTag(this.root, this.index);
		node1.string = name;
		var node2 = ccui.helper.seekWidgetByTag(this.root, this.index + 1);
		node2.string = "+" + value;
		this.index += 2;
	},

	onTouchBegan : function(touch, event) {
    	cc.log("AwardLayer.onTouchBegan() start");
    	this.scheduleOnce(function a() {
    		cc.log("scheduleOnce");
    		this.removeFromParent(true);
   		cc.eventManager.dispatchCustomEvent(EC_DIALOG_FINISHED);
    	}, 0);
		cc.log("AwardLayer.onTouchBegan() end");
		return true;
	},
	
	onExit : function() {
		cc.log("onExit");
		this._super();
		cc.eventManager.removeListener(this.listener);
	}
});

var LINE_SPACE = 80;

var AnswerLayer = cc.Layer.extend({
	size : null,
	items : null,
	_itemMenu : null,
	
	ctor : function(dlg) {
		this._super();
		
		this.items = dlg.Items;
    	
        var size = cc.winSize;
		
		var layer = ccs.load(res[dlg.Res]);
		var root = layer.node;
		this.addChild(root);
		
		var sprite = ccui.helper.seekWidgetByName(root, "Background");
		this.size = sprite.getContentSize();
		
		this._itemMenu = new cc.Menu();
		for (var i = 0, len = this.items.length; i < len; i++) {
			var label = new cc.LabelTTF(this.items[i].Text, "Arial", 24);
			label.boundingWidth = this.size.width;
			label.boundingHeight = LINE_SPACE;
			//label.lineWidth = DIALOG_SIZE.width;
    		var menuItem = new cc.MenuItemLabel(label, this.onMenuCallback, this);
            this._itemMenu.addChild(menuItem, i + 10000);
            menuItem.x = this.size.width / 2;
	        menuItem.y = (this.size.height - (i + 1) * LINE_SPACE);
		}
        this._itemMenu.width = this.size.width;
	    this._itemMenu.height = (this.items.length + 1) * LINE_SPACE;
        this._itemMenu.x = 0;
	    this._itemMenu.y = 0;
	    sprite.addChild(this._itemMenu);
	    
        if ('touches' in cc.sys.capabilities)
            cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ALL_AT_ONCE,
                onTouchesMoved: function (touches, event) {
                    var target = event.getCurrentTarget();
                    var delta = touches[0].getDelta();
                    target.moveMenu(delta);
                    return true;
                }
            }, this);
        else if ('mouse' in cc.sys.capabilities) {
            cc.eventManager.addListener({
                event: cc.EventListener.MOUSE,
                onMouseMove: function (event) {
                    if(event.getButton() == cc.EventMouse.BUTTON_LEFT)
                        event.getCurrentTarget().moveMenu(event.getDelta());
                },
                onMouseScroll: function (event) {
                    var delta = cc.sys.isNative ? event.getScrollY() * 6 : -event.getScrollY();
                    event.getCurrentTarget().moveMenu({y : delta});
                    return true;
                }
            }, this);
        }

	},
	
    onMenuCallback:function (sender) {
        var idx = sender.getLocalZOrder() - 10000;
        var layer = new AwardLayer(this.items[idx]);
        this.parent.addChild(layer);
        this.removeFromParent(true);
    },

    moveMenu:function(delta) {
        var newY = this._itemMenu.y + delta.y;
        if (newY < 0 )
            newY = 0;

        if( newY > ((this.items.length + 1) * LINE_SPACE - this.size.height))
            newY = ((this.items.length + 1) * LINE_SPACE - this.size.height);

	    this._itemMenu.y = newY;
    }
});

var DoTaskLayer = cc.Layer.extend({
	bg : null,
	text : null,
	task : null,
	step : 0,

    ctor : function () {
    	this._super();

    	this.task = gameData.taskList.Items[gameData.curTaskIndex];
    	
        var size = cc.winSize;

        var scene = ccs.load(res.DoTaskScene_json);
        var root = scene.node;
        this.addChild(root);
        
        this.bg = ccui.helper.seekWidgetByName(root, "Background");
        this.bg.setTexture(res[this.task.Steps[0].Background]);
        
        this.text = ccui.helper.seekWidgetByName(root, "Text_1");
        this.text.setPosition(cc.p(size.width / 2, size.height / 10));
        this.text.setSize(cc.size(600, 200));
        this.text.fontName = "宋体";
        this.text.fontSize = 32;
        this.text.string = this.task.Steps[0].Text;
        
        cc.eventManager.addListener({
        	event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan.bind(this)
        }, this);
        
        cc.eventManager.addCustomListener(EC_DIALOG_FINISHED, this.onDialogFinished.bind(this));
    },
    
    doNextStep : function() {
    	cc.log("doNextStep");
    	++this.step;
    	if (this.step < this.task.Steps.length) {
	    	if (typeof this.task.Steps[this.step].Background != "undefined") {
	            this.bg.setTexture(res[this.task.Steps[this.step].Background]);
	    	}
	    	if (typeof this.task.Steps[this.step].Text != "undefined") {
	            this.text.string = this.task.Steps[this.step].Text;
	    	}
	    	if (typeof this.task.Steps[this.step].Dialog != "undefined") {
	            this.addChild(new AnswerLayer(this.task.Steps[this.step].Dialog));
	    	}
    	}
    	else {
    		cc.director.popScene();
    	}
    },

	onTouchBegan : function(touch, event) {
		cc.log("DoTaskLayer");
		this.doNextStep();
	},
	
	onDialogFinished : function(event) {
		cc.log("onDialogFinished");
		this.doNextStep();
	},
	
	onExit : function() {
		this._super();
		cc.eventManager.removeCustomListeners(EC_DIALOG_FINISHED);
	}

});

var DoTaskScene = cc.Scene.extend({
    ctor:function () {
        this._super();
        var layer = new DoTaskLayer();
        this.addChild(layer);
    }
});
