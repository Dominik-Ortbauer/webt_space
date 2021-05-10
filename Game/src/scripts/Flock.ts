import {IUpdate, Vector} from "./Entity.js";
import {Boid} from "./Boid.js";
import {canvas, instantiate} from "./Game.js";

export class Flock implements IUpdate{
    private boids: Boid[] = [];

    constructor(amountOfBoids: number, pos: Vector, spray: number) {
        for (let i = 0; i < amountOfBoids; i++)
        {
            const offset = Math.random() * spray;
            const angle = Math.random() * (Math.PI * 2);

            const y = Math.sin(angle) * offset;
            const x = Math.cos(angle) * offset;

            const boid: Boid = new Boid(3, Vector.add(new Vector(x, y), pos), Math.random() * (Math.PI * 2), this);
            this.boids.push(boid);
        }
    }

    public getBoids(pos: Vector, dist: number): Boid[]{
        let visibleBoids = [];

        for(let boid of this.boids){
            if(boid.pos.distanceTo(pos) <= dist){
                visibleBoids.push(boid);
            }
        }

        return visibleBoids;
    }

    update(deltaTime: number) {
        for(let boid of this.boids){
            boid.update(deltaTime);
            boid.draw();
        }
    }
}