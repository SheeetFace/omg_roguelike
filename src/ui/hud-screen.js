let currentHp = 88;
let maxHp = 100;

const MAX_BAR_WIDTH = 780; //! вынести в константы, когда все заработает

function showHud() {
    const currentLevel = getSavedLevelIndex();

    const hpPercent = mmin(1, mmax(0, currentHp / 100));
    const finalCropX = MAX_BAR_WIDTH * hpPercent;

    showWindow('hud', wnd => {
        
        wnd.__setAliasesData({
            lvl_counter: {
                __text: currentLevel,
            },

            hp_line_fill: {
                cropx: finalCropX 
            },

            hp_counter: {
                __text: currentHp
            },

            bottle_counter: {
                 __text: 777
            }
        });
    });
}
