import {Entity, Vector} from "./Entity.js";
import {destroy} from "./Game.js";
import {Enemy} from "./Enemy.js";

export class Projectile extends Entity{
    constructor(private readonly startPos: Vector, private readonly dir: Vector) {
        super('Boid.png', startPos, 0);
    }

    public update(deltaTime: number) {
        if(this.loaded){
            if(this.hitbox.rightLower.y < 0){
                destroy(this);
                return;
            }
        }

        super.moveX(this.dir.x);
        super.moveY(this.dir.y);
    }

    public onCollision(other: Entity) {
        if(other instanceof Enemy)
            destroy(other);
    }
}