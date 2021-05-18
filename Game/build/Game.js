import { Entity, Vector } from "./Entity.js";
import { Player } from "./Player.js";
import { Flock } from "./Flock.js";
import { Boid } from "./Boid.js";
let ctx;
export let canvas;
let updates = [];
let lastTimeStamp = 0;
let currentLevel = 0;
function init() {
    canvas = document.getElementById("space");
    ctx = canvas.getContext("2d");
    //ctx.fillStyle = '80px arial';
    //ctx.beginPath();
    //ctx.fillText('test', 100, 100);
    //gameOver();
    instantiate(new Player());
    nextLevel();
    lastTimeStamp = Date.now();
    update();
}
export function instantiate(update) {
    updates.push(update);
}
export function destroy(update) {
    const idx = updates.indexOf(update);
    if (idx > -1) {
        updates.splice(idx, 1);
    }
}
function clearCanvas() {
    ctx.fillStyle = '';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
function updateAllEntities(deltaTime) {
    for (let en of updates) {
        en.update(deltaTime);
        if (en instanceof Entity) {
            en.draw();
            const others = collidesWith(en);
            for (let other of others) {
                en.onCollision(other);
            }
        }
    }
}
function collidesWith(en) {
    let others = [];
    for (let up of updates) {
        if (up instanceof Entity) {
            if (en.loaded && up.loaded && en != up && en.collides(up)) {
                others.push(up);
            }
        }
    }
    return others;
}
let gameInProgress = true;
export function gameOver() {
    gameInProgress = false;
    let img = new Image();
    img.src = './images/GameOverScreen.png';
    img.height = 800;
    img.width = 1200;
    img.onload = () => {
        ctx.drawImage(img, 120, 50);
    };
    //ctx.fillStyle = '80px';
    //ctx.beginPath();
    //this.ctx.fillText('Game Over', 600, 400);
}
export function getBoids() {
    let boids = [];
    for (let en of updates) {
        if (en instanceof Boid) {
            boids.push(en);
        }
    }
    return boids;
}
function nextLevel() {
    currentLevel++;
    Flock.createBoids(currentLevel * 100, new Vector(600, 400), 100);
}
function update() {
    clearCanvas();
    updateAllEntities((Date.now() - lastTimeStamp) / 1000);
    lastTimeStamp = Date.now();
    if (getBoids().length == 0) {
        nextLevel();
    }
    if (gameInProgress) {
        window.requestAnimationFrame(() => update());
    }
}
document.addEventListener('DOMContentLoaded', (event) => {
    init();
});
//# sourceMappingURL=Game.js.map