const enemyHpTextStyle = {
    __color: "#ffffb1",
    __fontsize: 14,
    __lineWidth: 1,
    __fontspacing: 2,
    __fontface: "GAMERIA"
};
let currentHp = 88;
let maxHp = 100;

const MAX_BAR_WIDTH = 780; //! вынести в константы, когда все заработает


function showHud() {

    const hpPercent = mmin(1, mmax(0, currentHp / 100));

    showWindow('hud', wnd => {

        wnd.__setAliasesData({
            lvl_counter: {
                __text: getSavedLevelIndex(),
            },

            hp_line_fill: {
                cropx: (MAX_BAR_WIDTH * hpPercent)
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
    let index = 0;

    for (let key in worldState.enemies) {
        const currentEnemy = worldState.enemies[key];
        if (!currentEnemy) continue;

        const posX = index * (boxSize + boxGap);

        let box = container.__addChildBox({
            __img: "trader", //!
            __size: [boxSize, boxSize],
            __ofs: [posX, 0, 0],
        });

        let hpTextNode = box.__addChildBox({
            __text: {
                __text: currentEnemy.hp,
                ...enemyHpTextStyle
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
    const boxNode  = liveEnemy.hudBoxNode;

    if (liveEnemy.hp > 0) {
        textNode.__text.__text = liveEnemy.hp;
    } else {
        _setTimeout(() => {
            textNode.__text.__text = 0;
            boxNode.__color = "#ff3333";
            
        }, ATTACK_DELAY);
    }
}

