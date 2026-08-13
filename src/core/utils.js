function getPixelCoordsOrKey(gridX, gridY, asObject) {
    const targetPixelX = (gridX * TILE_SIZE) + (TILE_SIZE / 2) - worldState.halfWidth;
    const targetPixelY = (gridY * TILE_SIZE) + (TILE_SIZE / 2) - worldState.halfHeight;

    if (asObject) return { x: targetPixelX, y: targetPixelY };
    
    return `${targetPixelX},${targetPixelY}`;
}

function getSavedLevelIndex() {
    let saved = localStorage.getItem('current_level_index')|| "1";
    return +saved;
}

function saveLevelIndex(index) {
    localStorage.setItem('current_level_index', index.toString());
}

function updateCameraFocus(x, y) {

    if (!level) return;

    level.__anim({
        __x: -x,
        __y: -y
    }, STEP_DURATION);
}