import { Entity } from "./Entity.js";
export class Enemy extends Entity {
    constructor(imgSrc, health, pos, rotation) {
        super(imgSrc, pos, rotation);
        this.health = health;
    }
}
//# sourceMappingURL=Enemy.js.map