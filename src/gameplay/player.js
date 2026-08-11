function initPlayer(gridX, gridY, rX, rY) {
    const container = worldState.targetContainer;

    player = container.__addChildBox(PLAYER_CONFIG);

    const startPixels = getPixelCoordsOrKey(gridX, gridY, true);

    player.__x = startPixels.x;
    player.__y = startPixels.y;

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

    const pixels = getPixelCoordsOrKey(player.gridX, player.gridY, true);

    player.__img = "hero_walk_anim";

    player.__anim({
        __x: pixels.x,
        __y: pixels.y
    }, STEP_DURATION);

    _setTimeout(() => {
        isAnimating = false;
        player.__img = "hero_idle";
        checkCellTriggers(player.gridX, player.gridY);
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

    const key = getPixelCoordsOrKey(targetGridX, targetGridY);

    if (worldState.walls[key] === true) {
        consoleLog("блок кретка");
        return false;
    }
    if (worldState.enemies[key]) return false;
    
    return true;
}


function checkCellTriggers(targetGridX, targetGridY) {

    const key = getPixelCoordsOrKey(targetGridX, targetGridY);

    if (worldState.exitCells[key] === true) {
        consoleLog(`выход`);
        // loadNextLevel();
        return;
    }

    if (worldState.trader[key] === true) {
        consoleLog(`трейдер`);
        // openTraderUI()
        return
    }
}

function playerAttack() {
    if (isAnimating) return;

    isAnimating = true;
    player.__img = "hero_attack_anim";

    _setTimeout(() => {
        isAnimating = false;
        player.__img = "hero_idle";
    }, STEP_DURATION);
}