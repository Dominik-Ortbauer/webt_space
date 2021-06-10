import {Entity, IUpdate, Vector} from "./Entity.js";
import {Game} from "./Game.js";
import {Enemy} from "./Enemy.js";
import {Player} from "./Player.js";

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

export class Laser extends Entity{
    private cooldown = 0.5;
    private readonly angle;
    private alreadyHit: Entity[] = []

    constructor(private readonly startPos: Vector, private readonly endPos: Vector) {
        super(null, startPos, 0);
        this.angle = Vector.sub(this.endPos, this.startPos).getAngle();
    }

    public update(deltaTime: number): void{
        if(this.cooldown <= 0){
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

    public collides(other: Entity): boolean {
        if(!other.loaded){
            return false;
        }

        for(let x = 0; x < Game.canvas.width; x+= 5){
            let y = Math.tan(this.angle) * x;

            let pos = new Vector(x, y);

            if(this.angle < Math.PI/2 && this.angle > -Math.PI/2){
                pos = Vector.add(this.startPos, pos);
            }else{
                pos = Vector.sub(this.startPos, pos);
            }

            if(pos.containedIn(other.hitbox.leftUpper, other.hitbox.rightLower)){
                return true;
            }
        }

        return false;
    }

    public onCollision(other: Entity): void{
        if(other instanceof Enemy && this.alreadyHit.indexOf(other) == -1){
            other.takeDamage(1);
            this.alreadyHit.push(other);
        }
    }
}