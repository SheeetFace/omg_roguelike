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

function registerHeroAnimations() {
    registerSpriteSheetAnimations({"hero_walk_anim": [6, 8, heroWalk, 0, 0, 0, false]});
}