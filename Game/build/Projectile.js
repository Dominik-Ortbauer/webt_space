import { Entity } from "./Entity.js";
import { destroy } from "./Game.js";
import { Enemy } from "./Enemy.js";
export class Projectile extends Entity {
    constructor(startPos, dir) {
        super('Boid.png', startPos, 0);
        this.startPos = startPos;
        this.dir = dir;
    }
    update(deltaTime) {
        if (this.loaded) {
            if (this.hitbox.rightLower.y < 0) {
                destroy(this);
                return;
            }
        }
        super.moveX(this.dir.x);
        super.moveY(this.dir.y);
    }
    onCollision(other) {
        if (other instanceof Enemy)
            destroy(other);
    }
}
//# sourceMappingURL=Projectile.js.map