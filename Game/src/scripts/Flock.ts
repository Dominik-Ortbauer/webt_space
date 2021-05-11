import {IUpdate, Vector} from "./Entity.js";
import {Boid} from "./Boid.js";
import {destroy, getBoidsOf, instantiate} from "./Game.js";

export class Flock{
    constructor(amountOfBoids: number, pos: Vector, spray: number) {
        for (let i = 0; i < amountOfBoids; i++)
        {
            const offset = Math.random() * spray;
            const angle = Math.random() * (Math.PI * 2);

            const y = Math.sin(angle) * offset;
            const x = Math.cos(angle) * offset;

            const boid: Boid = new Boid(3, Vector.add(new Vector(x, y), pos), Math.random() * (Math.PI * 2), this);
            instantiate(boid);
        }
    }

    public getBoids(pos: Vector, dist: number): Boid[]{
        const boids = getBoidsOf(this);
        let visibleBoids = [];

        for(let boid of boids){
            if(boid.pos.distanceTo(pos) <= dist){
                visibleBoids.push(boid);
            }
        }

        return visibleBoids;
    }
}