function initGameInput() {

    gestures.__onKeyDown = function(_, keyChar) {

        if(isAnimating) return;

        switch (keyChar) {
            case 'w': case 'arrowup':    movePlayer(0, -1);  return true;
            case 's': case 'arrowdown':  movePlayer(0, 1);   return true;
            case 'a': case 'arrowleft':  movePlayer(-1, 0);  return true;
            case 'd': case 'arrowright': movePlayer(1, 0);   return true;
        }

        return false;
    }
}