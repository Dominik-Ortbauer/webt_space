import { Entity } from "./Entity.js";
import { Game } from "./Game.js";
import { Enemy } from "./Enemy.js";
export class Projectile extends Entity {
    constructor(startPos, dir) {
        super('Boid.png', startPos, dir.getAngle() + Math.PI / 2);
        this.startPos = startPos;
        this.dir = dir;
        this.speed = 10;
        this.damage = 1;
        dir.setMagnitude(this.speed);
    }
    update(deltaTime) {
        if (this.loaded) {
            if (this.hitbox.rightLower.y < 0) {
                Game.destroy(this);
                return;
            }
        }
        super.moveX(this.dir.x);
        super.moveY(this.dir.y);
    }
    onCollision(other) {
        if (other instanceof Enemy) {
            other.takeDamage(this.damage);
        }
    }
}
//# sourceMappingURL=Projectile.js.map