let currentHp = 88;
let maxHp = 100;

function showHud() {

    const hpPercent = mmin(1, mmax(0, currentHp / 100));

    showWindow('hud', wnd => {
        wnd.__x = cameraTarget.x;
        wnd.__y = cameraTarget.y;

        const maxBarWidth = wnd.hp_container.hp_line_fill.__size.x;

        wnd.__setAliasesData({
            lvl_counter: {
                __text: getSavedLevelIndex(),
            },

            hp_line_fill: {
                cropx: (maxBarWidth * hpPercent)
            },

            hp_counter: {
                __text: currentHp
            },

            bottle_counter: {
                __text: 777
            },

            enemy_health_bar_container: function (container) {
                spawnEnemyHudIcons(container);
            }
        });
    });
}

function spawnEnemyHudIcons(container) {
    const boxSize = 40;
    const boxGap = 10;
    const paddingX = 10;
    const paddingY = 5;
    let count = 0;

    for (let key in worldState.enemies) {
        if (worldState.enemies[key]) count++;
    }

    if (count === 0) {
        container.__visible = 0;
        return;
    }

    const contentWidth = count * boxSize + (count - 1) * boxGap;
    const totalWidth = contentWidth + paddingX * 2;
    const totalHeight = boxSize + paddingY * 2;

    container.__size = [totalWidth, totalHeight];
    container.__visible = 1;

    const ofsY = container.__ofs;

    container.__ofs = [0, ofsY.y];


    const startX = -contentWidth / 2 + boxSize / 2;
    const startY = 0;

    let index = 0;
    for (let key in worldState.enemies) {
        const currentEnemy = worldState.enemies[key];
        if (!currentEnemy) continue;

        const posX = startX + index * (boxSize + boxGap);

        let box = container.__addChildBox({
            __img: "trader",
            __size: [boxSize, boxSize],
            __ofs: [posX, startY, 0]
        });

        let hpTextNode = box.__addChildBox({
            __text: {
                __text: currentEnemy.hp,
                __color: "#ffffb1",
                __fontsize: 14,
                __lineWidth: 1,
                __fontspacing: 2,
                __fontface: "GAMERIA"
            },
            __ofs: [15, 10, 0]
        });

        currentEnemy.hudBoxNode = box;
        currentEnemy.hudTextNode = hpTextNode;

        index++;
    }
}

function updateSingleEnemyHudIcon(liveEnemy) {

    if (!liveEnemy) return;

    const textNode = liveEnemy.hudTextNode;
    const boxNode = liveEnemy.hudBoxNode;

    if (liveEnemy.hp > 0) {
        textNode.__text.__text = liveEnemy.hp;
    } else {
        _setTimeout(() => {
            textNode.__text.__text = 0;
            boxNode.__color = "#ff3333";

        }, ATTACK_DELAY);
    }
}