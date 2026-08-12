function initLevel() {
    options.__soundDisabled = 0;

    closeWindow('hud');

    if (level && level.__destruct) level.__destruct();

    level = null;
    player = null;

    const curLvl = "level_" + getSavedLevelIndex(); 
    consoleLog({curLvl});

    const initPlayerSpawnX = levelsConfig[curLvl].playerSpawnX;
    const initPlayerSpawnY = levelsConfig[curLvl].playerSpawnY;

    const initPlayerRatateX = levelsConfig[curLvl].playerRotateX;
    const initPlayerRatateY = levelsConfig[curLvl].playerRotateY;

    const minEnemy = levelsConfig[curLvl].minEnemies;
    const maxEnemy = levelsConfig[curLvl].maxEnemies;

    level = scene.__addChildBox(curLvl);

    _setTimeout(() => {
        if (!level || level.__destructed) return;
        parseLevel();
        initGameInput()

        initPlayer(initPlayerSpawnX, initPlayerSpawnY, initPlayerRatateX, initPlayerRatateY);
        registerHeroAnimations();

        if (minEnemy > 0) spawnLevelEnemies(minEnemy, maxEnemy);

        showHud();
    }, 0.01);

}

function parseLevel() {

    worldState.targetContainer = null;
    worldState.walls = {};
    worldState.exitCells = {};
    worldState.trader = {};
    worldState.enemies = {};

    if (level && level.__traverse) {
        level.__traverse(node => {
            if (!node) return;

            if (node.name === 'ph_world') {
                worldState.targetContainer = node;

                if (node.__width) worldState.worldWidth = node.__width;
                if (node.__height) worldState.worldHeight = node.__height;
            }

            // const objX = node.__x ?? 0;
            // const objY = node.__y ?? 0;
            const objX = node.__x !== undefined ? node.__x : 0;
            const objY = node.__y !== undefined ? node.__y : 0;

            if (node.name && node.name.includes('wall_block')) {
                worldState.walls[`${objX},${objY}`] = true;
            }

            if (node.name && node.name.includes('exit_block')) {
                worldState.exitCells[`${objX},${objY}`] = true;
            }
            if (node.name && node.name.includes('trader_block')) {
                worldState.trader[`${objX},${objY}`] = true;
            }
        });
    }
    worldState.halfWidth = worldState.worldWidth / 2;
    worldState.halfHeight = worldState.worldHeight / 2;

    worldState.maxGridX = floor(worldState.worldWidth / TILE_SIZE);
    worldState.maxGridY = floor(worldState.worldHeight / TILE_SIZE);

}

function spawnLevelEnemies(minE, maxE) {

    let count = floor(random() * (maxE - minE + 1)) + minE;
    consoleLog({count});

    const container = worldState.targetContainer;
    let spawned = 0;

        while (spawned <= count -1 ) {
        
        const randX = floor(random() * worldState.maxGridX);
        const randY = floor(random() * worldState.maxGridY);

        const key = getPixelCoordsOrKey(randX, randY);

        const isWall = worldState.walls[key] === true;
        const isExit = worldState.exitCells[key] === true;
        const isTrader = worldState.trader[key] === true;
        const isAlreadyHasEnemy = worldState.enemies[key];
        const isPlayer = (randX === player.gridX && randY === player.gridY);

        if (!isWall && !isExit && !isTrader && !isPlayer && !isAlreadyHasEnemy) {

            const pixels = getPixelCoordsOrKey(randX, randY, true);
            
            const enemyNode = container.__addChildBox({
                __img: "trader",
                __size: [55, 55]
            });

            enemyNode.__x = pixels.x;
            enemyNode.__y = pixels.y;

            worldState.enemies[key] = {
                type: "enemy1",
                hp: 30,
                gridX: randX,
                gridY: randY,
                node: enemyNode
                // броня мис крит дамаге
            };

            spawned++;
        }
    }
}
