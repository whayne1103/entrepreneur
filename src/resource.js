var res = {
    HelloWorld_png : "res/HelloWorld.png",
    Task_1_bg_png : "res/DoTaskScene/1/bg.png", 
    
    StartScene_json : "res/StartScene.json",
    MainScene_json : "res/MainScene.json",
    ShopScene_json : "res/ShopScene.json",
    InfoScene_json : "res/InfoScene.json",
    TaskScene_json : "res/TaskScene.json",
    
    DoTaskScene_json : "res/DoTaskScene.json",
    AnswerLayer_json : "res/AnswerLayer.json",
    AwardLayer_json : "res/AwardLayer.json",
    
    TaskList_json : "res/TaskList.json"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
