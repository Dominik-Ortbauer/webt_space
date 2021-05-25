import { Entity, Vector } from "./Entity.js";
import { Player } from "./Player.js";
import { Flock } from "./Flock.js";
import { Boid } from "./Boid.js";
import { Powerup } from "./Powerups.js";
export class Game {
    static instantiate(update) {
        this.updates.push(update);
    }
    static destroy(update) {
        const idx = this.updates.indexOf(update);
        if (idx > -1) {
            this.updates.splice(idx, 1);
        }
    }
    static clearCanvas() {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    static updateAllEntities(deltaTime) {
        for (let en of this.updates) {
            en.update(deltaTime);
            if (en instanceof Entity) {
                en.draw();
                const others = Game.collidesWith(en);
                for (let other of others) {
                    en.onCollision(other);
                }
            }
        }
    }
    static collidesWith(en) {
        let others = [];
        for (let up of this.updates) {
            if (up instanceof Entity) {
                if (en.collides(up)) {
                    others.push(up);
                }
            }
        }
        return others;
    }
    static gameOver() {
        this.gameInProgress = false;
        let img = new Image();
        img.src = './images/GameOverScreen.png';
        img.height = 800;
        img.width = 1200;
        img.onload = () => {
            this.ctx.drawImage(img, 0, 0);
        };
        //ctx.fillStyle = '80px';
        //ctx.beginPath();
        //this.ctx.fillText('Game Over', 600, 400);
    }
    static getBoids() {
        let boids = [];
        for (let en of this.updates) {
            if (en instanceof Boid) {
                boids.push(en);
            }
        }
        return boids;
    }
    static nextLevel() {
        this.currentLevel++;
        Flock.createBoids(this.currentLevel * 100, new Vector(600, 400), 100);
    }
    static update() {
        Game.clearCanvas();
        Game.updateAllEntities((Date.now() - this.lastTimeStamp) / 1000);
        this.lastTimeStamp = Date.now();
        if (Game.getBoids().length == 0) {
            //Game.nextLevel();
        }
        if (Game.gameInProgress) {
            window.requestAnimationFrame(() => update());
        }
    }
}
Game.updates = [];
Game.lastTimeStamp = 0;
Game.currentLevel = 0;
Game.gameInProgress = true;
function init() {
    Powerup.init();
    Game.canvas = document.getElementById("space");
    Game.ctx = Game.canvas.getContext("2d");
    Game.player = new Player();
    //Game.player.addPowerup(Powerup.powerups[0].copy());
    Game.player.addPowerup(Powerup.powerups[1].copy());
    Game.instantiate(Game.player);
    Game.nextLevel();
    Game.lastTimeStamp = Date.now();
    update();
}
function update() {
    Game.clearCanvas();
    Game.updateAllEntities((Date.now() - Game.lastTimeStamp) / 1000);
    Game.lastTimeStamp = Date.now();
    if (Game.getBoids().length == 0) {
        //Game.nextLevel();
    }
    if (Game.gameInProgress) {
        window.requestAnimationFrame(() => update());
    }
}
document.addEventListener('DOMContentLoaded', (event) => {
    init();
});
//# sourceMappingURL=Game.js.map