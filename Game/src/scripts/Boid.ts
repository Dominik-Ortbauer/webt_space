import {Enemy} from "./Enemy.js";
import {Entity, Vector} from "./Entity.js";
import {Flock} from "./Flock.js";
import {canvas, destroy} from "./Game.js";
import {Player} from "./Player.js";

export class Boid extends Enemy{
    private static readonly lookingDist = 30;
    private static readonly maxForce = 0.2;
    private static readonly maxSpeed = 5;
    public static separation = 10;
    public static cohesion = 1;
    public static alignment = 1;

    private vel: Vector = Vector.random();
    private acc: Vector = new Vector(0.0, 0.0);

    private mouse: Vector;

    constructor(health: number, public pos: Vector, rotation: number) {
        super('Boid.png', health, pos, rotation);
        this.vel.scale(10);

        canvas.addEventListener("mousemove", (ev: MouseEvent) => {
            this.mouse = new Vector(ev.clientX, ev.clientY);
            this.mouse.sub(new Vector(canvas.offsetLeft, canvas.offsetTop));
        });

        canvas.addEventListener("mouseleave", (ev: MouseEvent) => {
            this.mouse = null;
        });
    }

    public update(deltaTime: number): void {
        this.acc = new Vector(0, 0);
        this.alignment();
        this.cohesion();
        this.separation();
        this.loopEdges();
        //this.repelEdges();

        if(this.mouse !== undefined && this.mouse !== null){
            this.moveTowards(this.mouse);
        }

        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.vel.limit(Boid.maxSpeed);
        this.rotation = Math.atan2(this.vel.y, this.vel.x) + Math.PI/2;
        this.setPosition(this.pos);
    }

    private moveTowards(pos: Vector): void{
        let force: Vector = Vector.sub(pos, this.pos);
        force.setMagnitude(Boid.maxSpeed);
        force.limit(Boid.maxForce);
        this.acc.add(force);
    }

    private loopEdges(): void{
        if(this.pos.x < 0){
            this.pos.x = canvas.width;
        }if(this.pos.x > canvas.width){
            this.pos.x = 0;
        }
        if(this.pos.y < 0){
            this.pos.y = canvas.height;
        }if(this.pos.y > canvas.height){
            this.pos.y = 0;
        }
    }

    private repelEdges(): void{
        const see: number = 50;
        const strength = 500;
        let avg: Vector = new Vector(0, 0);

        let d: number = canvas.width - this.pos.x;
        if(d <= see){
            d /= strength;
            avg.add(new Vector(-1 / (d*d), 0));
        }

        d = this.pos.x;
        if(d <= see){
            d /= strength;
            avg.add(new Vector(1 / (d*d), 0));
        }

        d = canvas.height - this.pos.y;
        if(d <= see){
            d /= strength;
            avg.add(new Vector(0, -1 / (d*d)));
        }

        d = this.pos.y;
        if(d <= see){
            d /= strength;
            avg.add(new Vector(0,1 / (d*d)));
        }

        if(avg.magnitude() > 0){
            avg.scale(Boid.maxSpeed);
            avg.limit(Boid.maxForce * 2);
        }
        this.acc.add(avg);

        if(this.pos.x > canvas.width){
            this.pos.x = canvas.width;
        } else if(this.pos.x < 0){
            this.pos.x = 0;
        }
        if(this.pos.y > canvas.height){
            this.pos.y = canvas.height;
        } else if(this.pos.y < 0){
            this.pos.y = 0;
        }
    }

    private separation(): void{
        const otherBoids: Boid[] = Flock.getBoids(this.pos, Boid.lookingDist);
        let avg: Vector = new Vector(0, 0);
        for (let boid of otherBoids){
            if(boid != this)
            {
                const d: number = boid.pos.distanceTo(this.pos);
                let forceVec: Vector = Vector.sub(this.pos, boid.pos);
                forceVec.div(d * d);
                avg.add(forceVec);
            }
        }

        if(otherBoids.length > 1){
            avg.div(otherBoids.length-1);
            avg.setMagnitude(Boid.maxSpeed);
            avg.sub(this.vel);
            avg.scale(Boid.separation);
            avg.limit(Boid.maxForce * 2);
        }

        this.acc.add(avg);
    }

    private alignment(): void{
        const otherBoids: Boid[] = Flock.getBoids(this.pos, Boid.lookingDist);
        let avg = new Vector(0.0, 0.0);
        for(let boid of otherBoids){
            if(boid != this){
                avg.add(boid.vel);
            }
        }
        if(otherBoids.length > 1){
            avg.div(otherBoids.length-1);
            avg.setMagnitude(Boid.maxSpeed);
            avg.sub(this.vel);
            avg.scale(Boid.alignment);
            avg.limit(Boid.maxForce);
        }

        this.acc.add(avg);
    }

    private cohesion(): void{
        const otherBoids: Boid[] = Flock.getBoids(this.pos, Boid.lookingDist*2);
        let avg = new Vector(0.0, 0.0);
        for(let boid of otherBoids){
            if(boid != this){
                avg.add(boid.pos);
            }
        }
        if(otherBoids.length > 1){
            avg.div(otherBoids.length-1);
            avg.sub(this.pos);
            avg.setMagnitude(Boid.maxSpeed);
            avg.sub(this.vel);
            avg.scale(Boid.cohesion);
            avg.limit(Boid.maxForce);
        }

        this.acc.add(avg);
    }

    public onCollision(other: Entity) {
        if(other instanceof Player){
            other.takeDamage(10);
            destroy(this);
        }
    }
}