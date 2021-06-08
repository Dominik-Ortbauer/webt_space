import {Entity, Vector} from "./Entity.js";
import {Game} from "./Game.js";
import {Boid} from "./Boid.js";

export abstract class Enemy extends Entity{
    protected constructor(imgSrc: string, protected health: number, pos: Vector, rotation: number) {
        super(imgSrc, pos, rotation);
    }

    public abstract update(deltaTime: number): void;
    public takeDamage(value: number): void{
        this.health -= value;
        this.checkHealth();
    }

    private checkHealth(): void{
        if(this.health <= 0){
            Game.destroy(this);
        }
    }
}

export class WormHole extends Enemy{
    private readonly startCooldown = 1;
    private spwanCooldown:number = 1;
    public constructor(imgSrc: string, protected health: number, pos: Vector, rotation: number) {
        super(imgSrc, health, pos, rotation);
    }

    public update(deltaTime: number): void{
        this.spwanCooldown -= deltaTime;
        if(this.spwanCooldown == 0){
            this.spawnEnemy();
            this.spwanCooldown = this.startCooldown;
        }
    }

    private spawnEnemy(): void{
        Game.instantiate(new Boid(3, this.getPosition(), 0));
    }
}