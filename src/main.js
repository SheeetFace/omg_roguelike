BUS.__addEventListener(__ON_GAME_LOADED, a => {

    levelCamera = new CameraOrtho();
    updateCamera(__screenSize.x, __screenSize.y, levelCamera, 0, 0);
    
    uiCamera = camera;
    
    renderer.__renderLoop = function () {
        var c = 0;
        
        $each(scenes, function (s) {
            if (s.__childs.length) {
                renderer.__setRenderTarget(0);
                if (!c) {
                    renderer.__clear();
                    c = 1;
                }
                for (var i = 0; i < s.__childs.length; i++) {
                    var node = s.__childs[i];
                    var cam = (node === level || node.__isLevel) ? levelCamera : uiCamera;
                    renderer.__render(node, cam);
                }
            }
        });
        
        if (c) renderer.__finishRender();
    };
    
    loadGameState();
    initLevel();
    return 1;
});