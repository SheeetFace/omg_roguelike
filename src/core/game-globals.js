let level = null;
let player = null;

let gameState = { level: 1 };
let cameraTarget = { x: 0, y: 0 };

let levelCamera = null;
let uiCamera = null;

let worldState = {
    targetContainer: null, //ph_world - мб нужен будет
    worldWidth: 400,
    worldHeight: 600,
    halfWidth: 200,
    halfHeight: 300,
    maxGridX: 4,
    maxGridY: 6,
    walls: {},
    exitCells: {},
    trader: {},
    enemies: {},
};