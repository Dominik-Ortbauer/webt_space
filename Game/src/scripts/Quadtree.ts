import {Entity, Hitbox, Vector} from "./Entity.js";
import {Boid} from "./Boid.js";
import {Game} from "./Game.js";


export class Quadtree{
    private nw: Quadtree;
    private ne: Quadtree;
    private se: Quadtree;
    private sw: Quadtree;

    private boids: Boid[];

    private divided: boolean = false;

    constructor(private readonly boundary: Hitbox, private readonly capacity) {
        this.boids = [];
    }

    private subdivide(): void{
        this.nw = new Quadtree(new Hitbox(this.boundary.leftUpper, this.boundary.leftUpper.middle(this.boundary.rightLower)), this.capacity);
        this.ne = new Quadtree(new Hitbox(new Vector((this.boundary.leftUpper.x + this.boundary.rightLower.x) / 2, this.boundary.leftUpper.y)
            , new Vector(this.boundary.rightLower.x, (this.boundary.leftUpper.y + this.boundary.rightLower.y) / 2)), this.capacity);
        this.se = new Quadtree(new Hitbox(this.boundary.leftUpper.middle(this.boundary.rightLower), this.boundary.rightLower), this.capacity);
        this.sw = new Quadtree(new Hitbox(new Vector(this.boundary.leftUpper.x, (this.boundary.leftUpper.y + this.boundary.rightLower.y) / 2)
            , new Vector((this.boundary.leftUpper.x + this.boundary.rightLower.x) / 2, this.boundary.rightLower.y)), this.capacity);

        this.divided = true;
    }

    public insert(boid: Boid): void{
        if(!boid.getPosition().containedIn(this.boundary.leftUpper, this.boundary.rightLower)){
            return;
        }

        if(this.boids.length < this.capacity){
            this.boids.push(boid);
        } else{
            if(!this.divided){
                this.subdivide();
            }

            this.nw.insert(boid);
            this.ne.insert(boid);
            this.se.insert(boid);
            this.sw.insert(boid);
        }
    }

    public query(range: Hitbox): Boid[]{
        let found: Boid[] = [];

        if(!this.boundary.collides(range)){
            return found;
        }

        for(let en of this.boids){
            if(en.getPosition().containedIn(range.leftUpper, range.rightLower)){
                found.push(en);
            }
        }

        if(this.divided){
            found = found.concat(this.nw.query(range));
            found = found.concat(this.ne.query(range));
            found = found.concat(this.se.query(range));
            found = found.concat(this.sw.query(range));
        }

        return found;
    }

    public show(): void{
        Game.ctx.strokeStyle = '2px white';
        Game.ctx.strokeRect(this.boundary.leftUpper.x, this.boundary.leftUpper.y, this.boundary.rightLower.x - this.boundary.leftUpper.x, this.boundary.rightLower.y - this.boundary.leftUpper.y);

        if(this.divided){
            this.nw.show();
            this.ne.show();
            this.sw.show();
            this.se.show();
        }
    }
}