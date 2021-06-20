import {Entity, Hitbox, Vector} from "./Entity.js";
import {Boid} from "./Boid.js";
import {Game} from "./Game.js";


export class Quadtree{
    private nw: Quadtree;
    private ne: Quadtree;
    private se: Quadtree;
    private sw: Quadtree;

    private enitities: Entity[];

    private divided: boolean = false;

    constructor(private readonly boundary: Hitbox, private readonly capacity) {
        this.enitities = [];
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

    public insert(entitiy: Entity): void{
        if(!entitiy.loaded || !entitiy.getPosition().containedIn(this.boundary.leftUpper, this.boundary.rightLower)){
            return;
        }

        if(this.enitities.length < this.capacity){
            this.enitities.push(entitiy);
        } else{
            if(!this.divided){
                this.subdivide();
            }

            this.nw.insert(entitiy);
            this.ne.insert(entitiy);
            this.se.insert(entitiy);
            this.sw.insert(entitiy);
        }
    }

    public query(range: Hitbox): Entity[]{
        let found: Entity[] = [];

        if(!this.boundary.collides(range)){
            return found;
        }

        for(let en of this.enitities){
            if(en.loaded && en.hitbox.collides(range)){
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