function initLevel() {
    options.__soundDisabled = 0;

    level = null;
    player = null;

    const curLvl = "level_1" //!

    const initPlayerSpawnX = levelsConfig[curLvl].playerSpawnX;
    const initPlayerSpawnY = levelsConfig[curLvl].playerSpawnY;

    const initPlayerRatateX = levelsConfig[curLvl].playerRotateX;
    const initPlayerRatateY = levelsConfig[curLvl].playerRotateY;

    level = scene.__addChildBox(curLvl);

    _setTimeout(() => {
        if (!level || level.__destructed) return;
        parseLevel();
        initGameInput()

        initPlayer(initPlayerSpawnX, initPlayerSpawnY, initPlayerRatateX, initPlayerRatateY);

    }, 0.01);
}

function parseLevel() {

    worldState.targetContainer = null;
    worldState.walls = {};
    worldState.exitCells = {};

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
            //! трейдер
            //! энэмис???
        });
    }
    worldState.halfWidth = worldState.worldWidth / 2;
    worldState.halfHeight = worldState.worldHeight / 2;

    worldState.maxGridX = floor(worldState.worldWidth / TILE_SIZE);
    worldState.maxGridY = floor(worldState.worldHeight / TILE_SIZE);

}