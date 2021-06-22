import { Entity } from "./Entity.js";
import { Game } from "./Game.js";
import { FasterReloadItem, LaserShotItem, MultishotItem } from "./Powerups.js";
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
            let rand = Math.random() * 12;
            if (rand <= 1) {
                Game.instantiate(new MultishotItem(this.getPosition()));
            }
            else if (rand <= 2) {
                Game.instantiate(new LaserShotItem(this.getPosition()));
            }
            else if (rand <= 3) {
                Game.instantiate(new FasterReloadItem(this.getPosition()));
            }
            Game.destroy(this);
        }
    }
}
//# sourceMappingURL=Enemy.js.map