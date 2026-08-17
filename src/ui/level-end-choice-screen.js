function showLevelEndChoice() {
    // stopAndResetAmbient();
    // playSound('win');
    closeWindow('hud');

    showWindow('level_end_choice', wnd => {

    wnd.__x = camera.__x;
    wnd.__y = -camera.__y;

        wnd.__setAliasesData({
            button_next_lvl: {
                __onTap() {
                    // stopAndResetAmbient();
                    closeWindow('level_end_choice');

                    // saveLevelIndex(getSavedLevelIndex() + 1); //!
                    if(getSavedLevelIndex() === 2) {
                        saveLevelIndex(1);
                    }
                    // saveLevelIndex(1);

                    initLevel();
                },
                __onTapHighlight: 1
            },

            button_back_to_hub: {
                __onTap() {
                    closeWindow('level_end_choice');
                    // stopAndResetAmbient();

                    saveLevelIndex(1);
                    initLevel();
                },
                __onTapHighlight: 1
            }
        });
    });
}