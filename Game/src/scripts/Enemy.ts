import {Entity, Vector} from "./Entity.js";
import {Game} from "./Game.js";
import {Boid} from "./Boid.js";
import {FasterReloadItem, LaserShotItem, MultishotItem} from "./Powerups.js";

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
            let rand = Math.random() * 12;

            if(rand <= 1){
                Game.instantiate(new MultishotItem(this.getPosition()));
            } else if(rand <= 2){
                Game.instantiate(new LaserShotItem(this.getPosition()));
            } else if(rand <= 3){
                Game.instantiate(new FasterReloadItem(this.getPosition()));
            }

            Game.destroy(this);
        }
    }
}
