import { Entity, Vector } from './Entity.js';
import { Game } from './Game.js';
import { Powerup } from "./Powerups.js";
export class Player extends Entity {
    constructor() {
        super('Spaceship.png', new Vector(Game.canvas.width / 2, Game.canvas.height - 100), 0);
        this.keysPressed = {};
        this.speed = 5;
        this.startShootCooldown = 1;
        this.shootCooldown = 0;
        this.maxHealth = 200;
        this.health = 200;
        this.powerups = [];
        this.addPowerup(Powerup.powerups[0].copy());
        document.addEventListener('keydown', (ev) => {
            this.keysPressed[ev.key] = true;
        });
        document.addEventListener('keyup', (ev) => {
            delete this.keysPressed[ev.key];
        });
        document.addEventListener('mousedown', (ev) => {
            this.keysPressed[ev.button] = true;
        });
        document.addEventListener('mouseup', (ev) => {
            delete this.keysPressed[ev.button];
        });
        document.addEventListener('mousemove', (ev) => {
            this.pointToward(Vector.sub(new Vector(ev.clientX, ev.clientY), new Vector(Game.canvas.offsetLeft, Game.canvas.offsetTop)));
        });
    }
    update(deltaTime) {
        if (this.shootCooldown > 0) {
            this.shootCooldown -= deltaTime;
        }
        //console.log(deltaTime);
        for (let pow of this.powerups) {
            pow.onUpdate(this, deltaTime);
        }
        if (this.keysPressed['w'] && this.hitbox.leftUpper.y > 0)
            this.move(0, -1);
        if (this.keysPressed['a'] && this.hitbox.leftUpper.x > 0)
            this.move(-1, 0);
        if (this.keysPressed['s'] && this.hitbox.rightLower.y < Game.canvas.height)
            this.move(0, 1);
        if (this.keysPressed['d'] && this.hitbox.rightLower.x < Game.canvas.width)
            this.move(1, 0);
        if ((this.keysPressed[0] || this.keysPressed[' ']) && this.shootCooldown <= 0) {
            this.shoot();
        }
    }
    drawHud() {
        Game.drawBar(this.maxHealth, this.health, 400, 20, 20, 20, 'red', 'white');
        Game.drawBar(this.startShootCooldown, this.startShootCooldown - this.shootCooldown, 200, 20, 20, 60, 'green', 'white');
    }
    addPowerup(powerup) {
        this.powerups.push(powerup);
    }
    removePowerup(powerup) {
        let idx = this.powerups.indexOf(powerup);
        if (idx >= 0) {
            this.powerups.splice(idx, 1);
        }
    }
    move(x, y) {
        x *= this.speed;
        y *= this.speed;
        super.moveX(x);
        super.moveY(y);
    }
    shoot() {
        this.shootCooldown = this.startShootCooldown;
        for (let p of this.powerups) {
            p.onShoot(this);
        }
    }
    takeDamage(amount) {
        this.health -= amount;
        if (this.health <= 0) {
            Game.destroy(this);
            Game.gameOver();
        }
    }
}
//# sourceMappingURL=Player.js.map