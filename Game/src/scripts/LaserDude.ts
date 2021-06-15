import {Vector} from "./Entity.js";
import {Game} from "./Game.js";
import {Boid} from "./Boid.js";
import {Laser} from "./Projectile.js";

export class LaserDude extends Boid{

    private laserTimer: number;
    private cooldownTime: number = 4;
    private delayTimer: number = 0.5;
    private delay: number = 0.5;

    private playerPosWasSet: boolean = false;
    private PlayerPos: Vector;

    public constructor(health: number, pos: Vector, rotation: number) {
        super(health, pos, rotation);
        this.img.src = './Images/LaserDude.png';
        this.laserTimer = Math.random() * this.cooldownTime;
    }

    private shootLaser(): void{
        let tmp = Vector.sub(this.PlayerPos, this.getPosition());
        tmp.setMagnitude(2000);
        Game.instantiate(new Laser(this.getPosition(), Vector.add(this.getPosition(), tmp)));
    }

    update(deltaTime: number): void {
        super.update(deltaTime);
        if(this.laserTimer > 0){
            this.laserTimer -= deltaTime;
        }
        else{
            if(!this.playerPosWasSet) {
                this.PlayerPos = Game.player.getPosition();
                this.playerPosWasSet = true;
            }

            if(this.delayTimer > 0){
                this.delayTimer -= deltaTime;
            }
            else{
                this.delayTimer = this.delay;
                this.laserTimer = this.cooldownTime;
                this.playerPosWasSet = false;
                this.shootLaser();
            }
        }
    }
}