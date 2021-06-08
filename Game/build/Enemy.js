import { Entity } from "./Entity.js";
import { Game } from "./Game.js";
export class Enemy extends Entity {
    constructor(imgSrc, health, pos, rotation) {
        super(imgSrc, pos, rotation);
        this.health = health;
    }
    takeDamage(value) {
        this.health -= value;
        this.checkHealth();
    }
    checkHealth() {
        if (this.health <= 0) {
            Game.destroy(this);
        }
    }
}
export class WormHole extends Enemy {
    constructor(imgSrc, health, pos, rotation) {
        super(imgSrc, health, pos, rotation);
        this.health = health;
        this.startCooldown = 1;
        this.spwanCooldown = 1;
    }
    update(deltaTime) {
        this.spwanCooldown -= deltaTime;
        if (this.spwanCooldown == 0) {
            this.spawnEnemy();
            this.spwanCooldown = this.startCooldown;
        }
    }
    spawnEnemy() {
        //Game.instantiate(new Boid(3, this.getPosition(), 0));
    }
}
//# sourceMappingURL=Enemy.js.map