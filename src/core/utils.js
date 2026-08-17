function getPixelCoords(gridX, gridY) {
    return {
        x: (gridX * TILE_SIZE) + (TILE_SIZE / 2) - worldState.halfWidth,
        y: (gridY * TILE_SIZE) + (TILE_SIZE / 2) - worldState.halfHeight
    };
}

function getGridKey(gridX, gridY) {
    const p = getPixelCoords(gridX, gridY);
    return p.x + "," + p.y;
}

function getGridFromPixels(pixelX, pixelY) {
    return {
        x: round((pixelX + worldState.halfWidth - TILE_SIZE / 2) / TILE_SIZE),
        y: round((pixelY + worldState.halfHeight - TILE_SIZE / 2) / TILE_SIZE)
    };
}

function updateCameraFocus(x, y) {
    cameraTarget.x = x;
    cameraTarget.y = y;

    if (!camera) return;
    camera.__anim({ __x: x, __y: -y }, STEP_DURATION);

    windowManager.$('hud', function(hud) {
        hud.__anim({ __x: x, __y: y }, STEP_DURATION);
    });
}

function loadGameState() {
    const saved = LocalGetKey('game_state');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            gameState = { ...gameState,...parsed };
        } catch (e) {
            gameState = {level: 1}
        }
    }
}

function saveGameState() {
    LocalSetKey('game_state', JSON.stringify(gameState));
}

function getSavedLevelIndex() {
    return gameState.level || 1;
}

function saveLevelIndex(index) {
    gameState.level = index;
    saveGameState();
}