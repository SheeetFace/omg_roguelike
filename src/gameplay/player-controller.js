function initGameInput() {

    gestures.__onKeyDown = function(_, keyChar) {

        if (windowManager.$('level_end_choice')) return true;

        switch (keyChar) {
            case 'w': case 'arrowup':    handlePlayerMove(0, -1);  return true;
            case 's': case 'arrowdown':  handlePlayerMove(0, 1);   return true;
            case 'a': case 'arrowleft':  handlePlayerMove(-1, 0);  return true;
            case 'd': case 'arrowright': handlePlayerMove(1, 0);   return true;
            
            case ' ': case 'spacebar':   playerAttack();     return true;
        }

        return false;
    }
}