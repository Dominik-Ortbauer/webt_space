import { Entity, Vector } from "./Entity.js";
import { Flock } from "./Flock.js";
let ctx;
export let canvas;
let updates = [];
let lastTimeStamp = 0;
function init() {
    canvas = document.getElementById("space");
    ctx = canvas.getContext("2d");
    //instantiate(new Player());
    const flock = new Flock(10, new Vector(600, 400), 50);
    instantiate(flock);
    lastTimeStamp = Date.now();
    update();
}
export function instantiate(update) {
    updates.push(update);
}
export function destroy(update) {
    const idx = updates.indexOf(update, 0);
    if (idx > -1) {
        updates.splice(idx, 1);
    }
}
function clearCanvas() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
function updateAllEntities(deltaTime) {
    for (let en of updates) {
        en.update(deltaTime);
        if (en instanceof Entity) {
            en.draw();
        }
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