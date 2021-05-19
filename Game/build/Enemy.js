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
//# sourceMappingURL=Enemy.js.map