//fps
//frames
//actions
//padFormat
//preparedFames
//reverseLoop

const heroWalk = [
    "hero_walk_1",
    "hero_walk_2",
    "hero_walk_3",
    "hero_walk_1",
    "hero_walk_2",
    "hero_walk_3"
]

const heroAttack = [
    "hero_attack_1",
     "hero_attack_2", 
     "hero_attack_3", 
     "hero_attack_4", 
     "hero_attack_5"
]

function registerHeroAnimations() {
    registerSpriteSheetAnimations({"hero_walk_anim": [6, 8, heroWalk, 0, 0, 0, false]});
    registerSpriteSheetAnimations({"hero_attack_anim": [6, 8, heroAttack, 0, 0, 0, false]});

}