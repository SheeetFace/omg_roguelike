function initPlayer(gridX, gridY, rX, rY) {
    const container = worldState.targetContainer;

    player = container.__addChildBox(PLAYER_CONFIG);

    const cellCenterX = (gridX * TILE_SIZE) + (TILE_SIZE / 2);
    const cellCenterY = (gridY * TILE_SIZE) + (TILE_SIZE / 2);

    player.__x = cellCenterX - worldState.halfWidth;
    player.__y = cellCenterY - worldState.halfHeight;

    player.gridX = gridX;
    player.gridY = gridY;

    registerHeroAnimations();

    rotatePlayer(rX, rY);
}

function movePlayer(x, y) {
    if (isAnimating || !player) return;

    const targetX = player.gridX + x;
    const targetY = player.gridY + y;

    consoleLog({
        targetX,
        targetY,
        x,
        y,
        playerX: player.gridX,
        playerY: player.gridY
    });

    rotatePlayer(x, y);

    if (!isPlayerMovePossible(targetX, targetY)) return;

    isAnimating = true;

    player.gridX = targetX;
    player.gridY = targetY;

    const targetPixelX = (player.gridX * TILE_SIZE) + (TILE_SIZE / 2) - worldState.halfWidth;
    const targetPixelY = (player.gridY * TILE_SIZE) + (TILE_SIZE / 2) - worldState.halfHeight;

    player.__img = "hero_walk_anim"; 

    player.__anim({
        __x: targetPixelX,
        __y: targetPixelY
    }, STEP_DURATION);

    _setTimeout(() => {
        isAnimating = false;
        player.__img = "hero_idle"; 
    }, STEP_DURATION);
}

function rotatePlayer(x, y) {
    if (!player) return;

    let targetAngle = atan2(-y, x) * (180 / PI); //RAD2DEG

    player.__rotate = targetAngle;
}

function isPlayerMovePossible(targetGridX, targetGridY) {

    if (targetGridX < 0 || targetGridX >= worldState.maxGridX) {
        consoleLog("край х");
        return false;
    }

    if (targetGridY < 0 || targetGridY >= worldState.maxGridY) {
        consoleLog("край у");
        return false;
    }

    const halfWidth = worldState.worldWidth / 2;
    const halfHeight = worldState.worldHeight / 2;
    const targetPixelX = (targetGridX * TILE_SIZE) + (TILE_SIZE / 2) - halfWidth;
    const targetPixelY = (targetGridY * TILE_SIZE) + (TILE_SIZE / 2) - halfHeight;
    consoleLog(worldState.walls);
    if (worldState.walls[`${targetPixelX},${targetPixelY}`] === true) {
        consoleLog("блок кретка");
        return false;
    }

    return true;
}