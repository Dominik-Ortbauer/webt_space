export interface IUpdate{
    update(deltaTime: number): void;
}

export abstract class Entity implements IUpdate{
    private readonly showHitboxxes = false;
    protected hitbox: Hitbox;
    readonly img: HTMLImageElement;
    public loaded: boolean = false;

    protected constructor(imgSrc: string, pos: Vector, protected rotation: number) {
        this.img = new Image();
        this.img.src = './Images/' + imgSrc;
        this.img.onload = () => {
            const halfWidth = this.img.width/2;
            const halfHeight = this.img.height/2;
            this.hitbox = new Hitbox(new Vector(pos.x - halfWidth, pos.y - halfHeight), new Vector(pos.x + halfWidth, pos.y + halfHeight));
            this.draw();
            this.loaded = true;
        }
    }

    public pointToward(other: Vector): void{
        let dir: Vector = Vector.sub(other, this.getPosition());
        this.rotation = Math.atan2(dir.y, dir.x) + Math.PI/2;
    }

    public setPosition(pos: Vector): void{
        const halfWidth = this.img.width/2;
        const halfHeight = this.img.height/2;
        this.hitbox = new Hitbox(new Vector(pos.x - halfWidth, pos.y - halfHeight), new Vector(pos.x + halfWidth, pos.y + halfHeight));
    }

    public getPosition(): Vector{
        const halfWidth = this.img.width/2;
        const halfHeight = this.img.height/2;
        const middleVector = new Vector(halfWidth, halfHeight);
        if(this.loaded){
            return Vector.add(this.hitbox.leftUpper, middleVector);
        }else{
            return new Vector(0, 0);
        }
    }

    public moveX(pixel: number): void {
        if(!this.loaded)
            return;

        this.hitbox.moveX(pixel);
    }

    public moveY(pixel: number): void {
        if(!this.loaded)
            return;

        this.hitbox.moveY(pixel);
    }

    public draw(): void {
        if(!this.loaded)
            return;

        const canvas = <HTMLCanvasElement>document.getElementById("space");
        const ctx = canvas.getContext("2d");
        const middle: Vector = this.hitbox.leftUpper.middle(this.hitbox.rightLower);
        ctx.save();
        ctx.translate(middle.x, middle.y);
        ctx.rotate(this.rotation);
        ctx.drawImage(this.img, -this.img.width/2, -this.img.height/2);
        ctx.restore();

        if(this.showHitboxxes)
        {
            ctx.strokeStyle = 'white';
            ctx.beginPath();
            ctx.rect(this.hitbox.leftUpper.x, this.hitbox.leftUpper.y, this.hitbox.rightLower.x - this.hitbox.leftUpper.x, this.hitbox.rightLower.y - this.hitbox.leftUpper.y);
            ctx.stroke();
        }
    }

    public collides(other: Entity): boolean{
        return this.hitbox.collides(other.hitbox);
    }

    public abstract update(deltaTime: number): void;

    public onCollision(other: Entity): void{}
}

export class Hitbox {
    constructor(public readonly leftUpper: Vector,
                public readonly rightLower: Vector) {
    }

    public moveX(pixel: number): void {
        this.leftUpper.moveX(pixel);
        this.rightLower.moveX(pixel);
    }

    public moveY(pixel: number): void {
        this.leftUpper.moveY(pixel);
        this.rightLower.moveY(pixel);
    }

    public collides(other: Hitbox): boolean{
        let collides: boolean = this.leftUpper.containedIn(other.leftUpper, other.rightLower);
        collides = collides || this.rightLower.containedIn(other.leftUpper, other.rightLower);

        collides = collides || other.leftUpper.containedIn(this.leftUpper, this.rightLower);
        collides = collides || other.rightLower.containedIn(this.leftUpper, this.rightLower);

        return collides;
    }
}

export class Vector {
    constructor(public x: number,
                public y: number) {
    }

    public containedIn(leftUpper: Vector, rightLower: Vector): boolean{
        let collides: boolean = this.x >= leftUpper.x && this.x <= rightLower.x;
        return collides && this.y >= leftUpper.y && this.y <= rightLower.y;
    }

    public moveX(pixel: number): void {
        this.x += pixel;
    }

    public moveY(pixel: number): void {
        this.y += pixel;
    }

    public middle(other: Vector): Vector {
        return new Vector((this.x + other.x) / 2, (this.y + other.y) / 2);
    }

    public static add(v1: Vector, v2: Vector): Vector{
        return new Vector(v1.x + v2.x, v1.y + v2.y);
    }

    public add(other: Vector): void{
        this.x += other.x;
        this.y += other.y;
    }

    public static sub(v1: Vector, v2: Vector): Vector{
        return new Vector(v1.x - v2.x, v1.y - v2.y);
    }

    public sub(other: Vector): void{
        this.x -= other.x;
        this.y -= other.y;
    }

    public div(value: number): void{
        this.x /= value;
        this.y /= value;
    }

    public scale(value: number): void{
        this.x *= value;
        this.y *= value;
    }

    public distanceTo(other: Vector): number{
        return Math.sqrt((this.x - other.x) * (this.x - other.x) + (this.y - other.y) * (this.y - other.y));
    }

    public static random(): Vector{
        const angle: number = Math.random() * Math.PI * 2;

        return new Vector(Math.cos(angle), Math.sin(angle));
    }

    public static randomPos(): Vector{
        return new Vector(Math.random() % 1200, Math.random() % 800);
    }

    public magnitude(): number{
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    public setMagnitude(value: number): void{
        this.scale(value / this.magnitude());
    }

    public limit(value: number): void{
        if(this.magnitude() > value){
            this.setMagnitude(value);
        }
    }

    public getAngle(): number{
        return Math.atan2(this.y, this.x);
    }
}