import { Vector } from "./Entity.js";
import { Boid } from "./Boid.js";
export class Flock {
    constructor(amountOfBoids, pos, spray) {
        this.boids = [];
        for (let i = 0; i < amountOfBoids; i++) {
            const offset = Math.random() * spray;
            const angle = Math.random() * (Math.PI * 2);
            const y = Math.sin(angle) * offset;
            const x = Math.cos(angle) * offset;
            const boid = new Boid(3, Vector.add(new Vector(x, y), pos), Math.random() * (Math.PI * 2), this);
            this.boids.push(boid);
        }
    }
    getBoids(pos, dist) {
        let visibleBoids = [];
        for (let boid of this.boids) {
            if (boid.pos.distanceTo(pos) <= dist) {
                visibleBoids.push(boid);
            }
        }
        return visibleBoids;
    }
    update(deltaTime) {
        for (let boid of this.boids) {
            boid.update(deltaTime);
            boid.draw();
        }
    }
}
//# sourceMappingURL=Flock.js.map