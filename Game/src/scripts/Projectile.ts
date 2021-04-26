import {Entity, Position} from "./Entity.js";
import {destroy} from "./Game.js";

export class Projectile extends Entity{
    constructor(private readonly startPos: Position, private readonly dir: Position) {
        super('./U2cZy+.jpg', startPos.x, startPos.y);
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