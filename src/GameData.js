/**
 * 
 */

function ClassGameData() {
	var _this = this;
	this.taskList = null;
	this.curTaskIndex = -1;
	
	if (typeof ClassGameData._initialized == "undefined") {
		cc.log("ClassGameData constructor()");
		var url = "res/TaskList.json";
		var json = cc.loader.loadJson(url, function(err, json) {
			if (err) {
				cc.log("加载任务列表失败: %s", url);
				return;
			}
			
			cc.log(json);
			_this.taskList = json;
		});
		
		ClassGameData._initialized = true;
	}
}

var gameData = new ClassGameData();
