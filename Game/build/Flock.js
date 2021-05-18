import { Vector } from "./Entity.js";
import { Boid } from "./Boid.js";
import { getBoids, instantiate } from "./Game.js";
export class Flock {
    static createBoids(amountOfBoids, pos, spray) {
        for (let i = 0; i < amountOfBoids; i++) {
            const offset = Math.random() * spray;
            const angle = Math.random() * (Math.PI * 2);
            const y = Math.sin(angle) * offset;
            const x = Math.cos(angle) * offset;
            const boid = new Boid(3, Vector.add(new Vector(x, y), pos), Math.random() * (Math.PI * 2));
            instantiate(boid);
        }
    }
    static getBoids(pos, dist) {
        const boids = getBoids();
        let visibleBoids = [];
        for (let boid of boids) {
            if (boid.pos.distanceTo(pos) <= dist) {
                visibleBoids.push(boid);
            }
        }
        return visibleBoids;
    }
}
//# sourceMappingURL=Flock.js.map