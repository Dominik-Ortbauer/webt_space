import { Hitbox, Vector } from "./Entity.js";
import { Boid } from "./Boid.js";
import { Game } from "./Game.js";
import { LaserDude } from "./LaserDude.js";
export class Flock {
    static createBoids(amountOfBoids, pos, spray) {
        for (let i = 0; i < amountOfBoids * 0.95; i++) {
            const offset = Math.random() * spray;
            const angle = Math.random() * (Math.PI * 2);
            const y = Math.sin(angle) * offset;
            const x = Math.cos(angle) * offset;
            const boid = new Boid(3, Vector.add(new Vector(x, y), pos), Math.random() * (Math.PI * 2));
            Game.instantiate(boid);
        }
        for (let i = 0; i < amountOfBoids * 0.05; i++) {
            const offset = Math.random() * spray;
            const angle = Math.random() * (Math.PI * 2);
            const y = Math.sin(angle) * offset;
            const x = Math.cos(angle) * offset;
            const boid = new LaserDude(3, Vector.add(new Vector(x, y), pos), Math.random() * (Math.PI * 2));
            Game.instantiate(boid);
        }
    }
    static getBoids(pos, dist) {
        let tmp = Game.qtree.query(new Hitbox(Vector.sub(pos, new Vector(dist / 2, dist / 2)), Vector.add(pos, new Vector(dist / 2, dist / 2))));
        let real = [];
        for (let b of tmp) {
            if (b.pos.distanceTo(pos) <= dist) {
                real.push(b);
            }
        }
        return real;
        /*const boids = Game.getBoids();
        let visibleBoids = [];

        for(let boid of boids){
            if(boid.pos.distanceTo(pos) <= dist){
                visibleBoids.push(boid);
            }
        }

        return visibleBoids;*/
    }
}
//# sourceMappingURL=Flock.js.map