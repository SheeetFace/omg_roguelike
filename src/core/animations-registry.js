//fps
//frames
//actions
//padFormat
//preparedFames
//reverseLoop

const heroWalk =[1,2,3,1,2,3].map(i => "hero_walk_" + i);
const heroAttack = [1,2,3,4,5].map(i => "hero_attack_" + i);

function registerHeroAnimations() {
    registerSpriteSheetAnimations({"hero_walk_anim": [6, 8, heroWalk, 0, 0, 0, false]});
    registerSpriteSheetAnimations({"hero_attack_anim": [6, 8, heroAttack, 0, 0, 0, false]});

}