let playerEntity = null;

class Player {
    constructor(node, gridX, gridY) {
        this.node = node;
        this.gridX = gridX;
        this.gridY = gridY;
        this.isAnimating = false;

        this.node.gridX = gridX;
        this.node.gridY = gridY;
    }

    rotate(x, y) {
        if (!this.node) return;
        let targetAngle = atan2(-y, x) * (180 / PI);
        this.node.__rotate = targetAngle;
    }

    move(dx, dy) {
        if (this.isAnimating) return;

        const targetX = this.gridX + dx;
        const targetY = this.gridY + dy;

        this.rotate(dx, dy);

        if (!this.isMovePossible(targetX, targetY)) return;

        this.isAnimating = true;
        this.gridX = targetX;
        this.gridY = targetY;

        this.node.gridX = targetX;
        this.node.gridY = targetY;

        const pixels = getPixelCoords(this.gridX, this.gridY );

        this.node.__img = "hero_walk_anim";
        this.node.__anim({ __x: pixels.x, __y: pixels.y }, STEP_DURATION);

        _setTimeout(() => {
            this.isAnimating = false;
            this.node.__img = "hero_idle";
            checkCellTriggers(this.gridX, this.gridY);
        }, STEP_DURATION);

        return pixels;
    }

    isMovePossible(targetGridX, targetGridY) {
        if (targetGridX < 0 || targetGridX >= worldState.maxGridX) {
            consoleLog("край х");
            return false;
        }
        if (targetGridY < 0 || targetGridY >= worldState.maxGridY) {
            consoleLog("край у");
            return false;
        }

        const key = getGridKey(targetGridX, targetGridY);

        if (worldState.walls[key] === true) {
            consoleLog("блок кретка");
            return false;
        }
        if (worldState.enemies[key]) return false;

        return true;
    }

    attack() {
        if (this.isAnimating) return;

        this.isAnimating = true;
        this.node.__img = "hero_attack_anim";

        const angleInRadians = this.node.__rotate * DEG2RAD;
        const dX = round(cos(angleInRadians));
        const dY = round(-sin(angleInRadians));

        const targetX = this.gridX + dX;
        const targetY = this.gridY + dY;
        const key = getGridKey(targetX, targetY);

        if (worldState.enemies && worldState.enemies[key]) {
            let enemy = worldState.enemies[key];
            if (enemy.hp > 0) {
                enemy.hp -= 10;
                consoleLog({ hp: enemy.hp });
                updateSingleEnemyHudIcon(enemy);
                if (enemy.hp <= 0) {
                    _setTimeout(() => {
                        enemy.node.__destruct();
                        delete worldState.enemies[key];
                    }, ATTACK_DELAY);
                }
            }
        }

        _setTimeout(() => {
            this.isAnimating = false;
            this.node.__img = "hero_idle";
        }, STEP_DURATION);
    }
}

function initPlayer() {
    const container = worldState.targetContainer;
    const spawn = worldState.playerSpawn;

    if (!spawn) return;

    const node = container.__addChildBox(PLAYER_CONFIG);

    node.__x = spawn.__x;
    node.__y = spawn.__y;

    const grid = getGridFromPixels(spawn.__x, spawn.__y);

    player = node;
    playerEntity = new Player(node, grid.x, grid.y);

    if (spawn.__rotate !== undefined) {
        node.__rotate = spawn.__rotate;
    }

    updateCameraFocus(spawn.__x, spawn.__y);

    if (spawn.__removeFromParent) {
        spawn.__removeFromParent();
    }
}

function handlePlayerMove(x, y) {
    if (!playerEntity) return;
    const pixels = playerEntity.move(x, y);

    updateCameraFocus(pixels.x, pixels.y);
    
}

function rotatePlayer(x, y) {
    if (playerEntity) playerEntity.rotate(x, y);
}

function playerAttack() {
    if (playerEntity) playerEntity.attack();
}

function isPlayerMovePossible(targetGridX, targetGridY) {
    if (playerEntity) return playerEntity.isMovePossible(targetGridX, targetGridY);
    return false;
}

function checkCellTriggers(targetGridX, targetGridY) {
    const key = getGridKey(targetGridX, targetGridY);

    if (worldState.exitCells[key] === true) {
        consoleLog("выход");

        const currentLevelIndex = getSavedLevelIndex();

        if (currentLevelIndex === 1) {
            saveLevelIndex(2);
            initLevel();
        } else {
            showLevelEndChoice();
        }

        return;
    }

    if (worldState.trader[key] === true) {
        consoleLog("трейдер");
        // openTraderUI()
        return;
    }
}