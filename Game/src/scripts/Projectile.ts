import {Entity, Vector} from "./Entity.js";
import {destroy} from "./Game.js";

export class Projectile extends Entity{
    constructor(private readonly startPos: Vector, private readonly dir: Vector) {
        super('./U2cZy+.jpg', startPos, 0);
    }

    public update(deltaTime: number) {
        if(this.loaded && this.hitbox.rightLower.y < 0){
            destroy(this);
            return;
        }

        super.moveX(this.dir.x);
        super.moveY(this.dir.y);
    }
}