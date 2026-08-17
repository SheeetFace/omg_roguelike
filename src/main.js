BUS.__addEventListener(
    __ON_GAME_LOADED, a => {
        loadGameState();
        initLevel();
        return 1;
    }
);