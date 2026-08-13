function showLevelEndChoice() {
    // stopAndResetAmbient();
    // playSound('win');
    closeWindow('hud');

    showWindow('level_end_choice', wnd => {
        isAnimating = true;

        wnd.__setAliasesData({
            button_next_lvl: {
                __onTap() {
                    // stopAndResetAmbient();
                    closeWindow('level_end_choice');

                    isAnimating = false;

                    // saveLevelIndex(getSavedLevelIndex() + 1); //!
                    saveLevelIndex(1);

                    initLevel();
                },
                __onTapHighlight: 1
            },

            button_back_to_hub: {
                __onTap() {
                    closeWindow('level_end_choice');

                    isAnimating = false;
                    // stopAndResetAmbient();

                    saveLevelIndex(1);
                    initLevel();
                },
                __onTapHighlight: 1
            }
        });
    });
}