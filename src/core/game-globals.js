let level = null;
let player = null;
let isAnimating = false;

let worldState = {
    targetContainer: null, //ph_world - мб нужен будет
    worldWidth: 400,
    worldHeight: 600,
    halfWidth: 200,
    halfHeight: 300,
    maxGridX: 4,
    maxGridY: 6,
    walls: {},
};