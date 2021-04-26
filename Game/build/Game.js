import { Player } from "./Player.js";
let ctx;
export let canvas;
let entities = [];
let lastTimeStamp = 0;
function init() {
    canvas = document.getElementById("space");
    ctx = canvas.getContext("2d");
    instantiate(new Player('./U2cZy+.jpg'));
    lastTimeStamp = Date.now();
    update();
}
export function instantiate(entity) {
    entities.push(entity);
}
export function destroy(entity) {
    const idx = entities.indexOf(entity, 0);
    if (idx > -1) {
        entities.splice(idx, 1);
    }
}
function clearCanvas() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
function updateAllEntities(deltaTime) {
    for (let en of entities) {
        en.update(deltaTime);
        en.draw();
    }
}
function update() {
    clearCanvas();
    updateAllEntities((Date.now() - lastTimeStamp) / 1000);
    lastTimeStamp = Date.now();
    window.requestAnimationFrame(() => update());
}
document.addEventListener('DOMContentLoaded', (event) => {
    init();
});
//# sourceMappingURL=Game.js.map