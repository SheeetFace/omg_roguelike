function getPixelCoordsOrKey(gridX, gridY, asObject) {
    const targetPixelX = (gridX * TILE_SIZE) + (TILE_SIZE / 2) - worldState.halfWidth;
    const targetPixelY = (gridY * TILE_SIZE) + (TILE_SIZE / 2) - worldState.halfHeight;

    if (asObject) return { x: targetPixelX, y: targetPixelY };
    
    return `${targetPixelX},${targetPixelY}`;
}
