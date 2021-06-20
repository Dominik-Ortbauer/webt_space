import { Entity, Hitbox, Vector } from "./Entity.js";
import { Player } from "./Player.js";
import { Flock } from "./Flock.js";
import { Boid } from "./Boid.js";
import { WormHole } from "./WormHole.js";
import { Powerup } from "./Powerups.js";
import { Quadtree } from "./Quadtree.js";
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
    static buildQTree() {
        this.qtree = new Quadtree(new Hitbox(new Vector(0, 0), new Vector(this.canvas.width, this.canvas.height)), 4);
        for (let en of this.updates) {
            if (en instanceof Boid) {
                this.qtree.insert(en);
            }
        }
        this.qtree.show();
    }
    static updateAllEntities() {
        for (let en of this.updates) {
            const deltaTime = (Date.now() - en.lastTimeStamp) / 1000;
            en.update(deltaTime);
            en.lastTimeStamp = Date.now();
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
    static createWormholes(amount) {
        for (let i = 0; i < amount; i++) {
            Game.instantiate(new WormHole("WormHole.png", 12, Vector.randomPos(), 0));
        }
    }
    static nextLevel() {
        this.currentLevel++;
        Flock.createBoids(this.currentLevel * 100, new Vector(600, 400), 100);
        this.createWormholes(this.currentLevel);
    }
    static pressPause() {
        this.gameIsPaused = !this.gameIsPaused;
    }
    static drawHud() {
        this.player.drawHud();
    }
    static drawBar(maxLength, length, width, height, x, y, fill, outline) {
        Game.ctx.lineWidth = 1;
        Game.ctx.strokeStyle = outline;
        Game.ctx.strokeRect(x - 1, y - 1, width + 2, height + 2);
        Game.ctx.fillStyle = fill;
        Game.ctx.fillRect(x, y, (length / maxLength) * width, height);
    }
}
Game.updates = [];
Game.currentLevel = 0;
Game.gameInProgress = true;
Game.gameIsPaused = false;
function init() {
    Powerup.init();
    Game.canvas = document.getElementById("space");
    Game.ctx = Game.canvas.getContext("2d");
    document.getElementById("pause").addEventListener("click", () => {
        Game.pressPause();
    });
    Game.player = new Player();
    Game.player.addPowerup(Powerup.powerups[1].copy());
    Game.player.addPowerup(Powerup.powerups[2].copy());
    Game.player.addPowerup(Powerup.powerups[2].copy());
    Game.player.addPowerup(Powerup.powerups[2].copy());
    Game.instantiate(Game.player);
    Game.nextLevel();
    update();
}
function update() {
    if (Game.gameInProgress && !Game.gameIsPaused) {
        Game.clearCanvas();
        Game.buildQTree();
        Game.updateAllEntities();
        Game.drawHud();
        if (Game.getBoids().length == 0) {
            Game.nextLevel();
        }
    }
    window.requestAnimationFrame(() => update());
}
document.addEventListener('DOMContentLoaded', (event) => {
    init();
});
//# sourceMappingURL=Game.js.map