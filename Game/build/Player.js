import { Entity, Vector } from './Entity.js';
import { canvas, instantiate } from './Game.js';
import { Projectile } from "./Projectile.js";
export class Player extends Entity {
    constructor() {
        super('./U2cZy+.jpg', new Vector(canvas.width / 2, canvas.height - 100), 0);
        this.keysPressed = {};
        this.speed = 3;
        this.startShootCooldown = 1;
        this.shootCooldown = 0;
        document.addEventListener('keydown', (ev) => {
            this.keysPressed[ev.key] = true;
        });
        document.addEventListener('keyup', (ev) => {
            delete this.keysPressed[ev.key];
        });
    }
    update(deltaTime) {
        this.shootCooldown -= deltaTime;
        if (this.keysPressed['w'] && this.hitbox.leftUpper.y > 0)
            this.move(0, -1);
        if (this.keysPressed['a'] && this.hitbox.leftUpper.x > 0)
            this.move(-1, 0);
        if (this.keysPressed['s'] && this.hitbox.rightLower.y < canvas.height)
            this.move(0, 1);
        if (this.keysPressed['d'] && this.hitbox.rightLower.x < canvas.width)
            this.move(1, 0);
        if (this.keysPressed[' '] && this.shootCooldown <= 0) {
            instantiate(new Projectile(this.hitbox.leftUpper.middle(this.hitbox.rightLower), new Vector(0, -5)));
            this.shootCooldown = this.startShootCooldown;
        }
    }
    move(x, y) {
        x *= this.speed;
        y *= this.speed;
        super.moveX(x);
        super.moveY(y);
    }
    shoot() {
    }
}
//# sourceMappingURL=Player.js.map