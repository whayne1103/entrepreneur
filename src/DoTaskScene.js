/**
 * 
 */

var AnswerLayer = cc.Layer.extend({
	
	ctor : function() {
		this._super();
		
		var layer = ccs.load(res.AnswerLayer_json);
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
        this.text.setTextAreaSize(cc.size(600, 200));
        this.text.fontName = "宋体";
        this.text.fontSize = 32;
        this.text.string = this.task.Steps[0].Text;
        
        cc.eventManager.addListener({
        	event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan.bind(this)
        }, this);
    },
    
    onTouchBegan : function(touch, event) {
    	++this.step;
    	if (this.step < this.task.Steps.length) {
	    	if (typeof this.task.Steps[this.step].Background != "undefined") {
	            this.bg.setTexture(res[this.task.Steps[this.step].Background]);
	    	}
	    	if (typeof this.task.Steps[this.step].Text != "undefined") {
	            this.text.string = this.task.Steps[this.step].Text;
	    	}
    	}
    }

});

var DoTaskScene = cc.Scene.extend({
    ctor:function () {
        this._super();
        var layer = new DoTaskLayer();
        this.addChild(layer);
        this.addChild(new AnswerLayer());
    }
});
