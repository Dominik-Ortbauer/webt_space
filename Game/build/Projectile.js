import { Entity } from "./Entity.js";
import { destroy } from "./Game.js";
export class Projectile extends Entity {
    constructor(startPos, dir) {
        super('U2cZy+.jpg', startPos.x, startPos.y);
        this.startPos = startPos;
        this.dir = dir;
    }
    update(deltaTime) {
        if (this.loaded && this.hitbox.rightLower.y < 0) {
            destroy(this);
            return;
        }
        super.moveX(this.dir.x);
        super.moveY(this.dir.y);
    }
}
//# sourceMappingURL=Projectile.js.map