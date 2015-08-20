var res = {
    HelloWorld_png : "res/HelloWorld.png",
    //BackBtn_png : "res/Menu/back.png",
    //NewGameBtn_png : "res/StartScene/NewButton.png",
    //MainSceneBG_png : "res/MainScene/bg.png",
    //ComputerBtn_png : "res/MainScene/computer.png",
    //ShopSceneBG_png : "res/ShopScene/bg.png",
    
    StartScene_json : "res/StartScene.json",
    MainScene_json : "res/MainScene.json",
    ShopScene_json : "res/ShopScene.json"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
