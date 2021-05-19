import {Entity, Vector} from "./Entity.js";
import {Game} from "./Game.js";

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