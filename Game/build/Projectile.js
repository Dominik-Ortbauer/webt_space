import { Entity, Vector } from "./Entity.js";
import { Game } from "./Game.js";
import { Enemy } from "./Enemy.js";
export class Projectile extends Entity {
    constructor(startPos, dir) {
        super('Boid.png', startPos, dir.getAngle() + Math.PI / 2);
        this.startPos = startPos;
        this.dir = dir;
        this.speed = 10;
        this.damage = 3;
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
export class Laser extends Entity {
    constructor(startPos, endPos) {
        super(null, startPos, 0);
        this.startPos = startPos;
        this.endPos = endPos;
        this.cooldown = 0.5;
        this.alreadyHit = [];
        this.angle = Vector.sub(this.endPos, this.startPos).getAngle();
    }
    update(deltaTime) {
        if (this.cooldown <= 0) {
            Game.destroy(this);
        }
        Game.ctx.strokeStyle = 'red';
        Game.ctx.lineWidth = this.cooldown * 20;
        Game.ctx.beginPath();
        Game.ctx.moveTo(this.startPos.x, this.startPos.y);
        Game.ctx.lineTo(this.endPos.x, this.endPos.y);
        Game.ctx.stroke();
        this.cooldown -= deltaTime;
    }
    collides(other) {
        if (!other.loaded) {
            return false;
        }
        for (let x = 0; x < Game.canvas.width; x += 5) {
            let y = Math.tan(this.angle) * x;
            let pos = new Vector(x, y);
            if (this.angle < Math.PI / 2 && this.angle > -Math.PI / 2) {
                pos = Vector.add(this.startPos, pos);
            }
            else {
                pos = Vector.sub(this.startPos, pos);
            }
            if (pos.containedIn(other.hitbox.leftUpper, other.hitbox.rightLower)) {
                return true;
            }
        }
        return false;
    }
    onCollision(other) {
        if (other instanceof Enemy && this.alreadyHit.indexOf(other) == -1) {
            other.takeDamage(1);
            this.alreadyHit.push(other);
        }
    }
}
//# sourceMappingURL=Projectile.js.map