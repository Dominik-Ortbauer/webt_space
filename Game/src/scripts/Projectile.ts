import {Entity, Vector} from "./Entity.js";
import {Game} from "./Game.js";
import {Enemy} from "./Enemy.js";

export class Projectile extends Entity{
    private speed: number = 10;
    private damage: number = 1
    constructor(private readonly startPos: Vector, private readonly dir: Vector) {
        super('Boid.png', startPos, dir.getAngle() + Math.PI/2);

        dir.setMagnitude(this.speed);
    }

    public update(deltaTime: number) {
        if(this.loaded){
            if(this.hitbox.rightLower.y < 0){
                Game.destroy(this);
                return;
            }
        }

        super.moveX(this.dir.x);
        super.moveY(this.dir.y);
    }

    public onCollision(other: Entity) {
        if(other instanceof Enemy){
            other.takeDamage(this.damage);
        }
    }
}