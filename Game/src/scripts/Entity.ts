export interface IUpdate{
    update(deltaTime: number): void;
}

export abstract class Entity implements IUpdate{
    protected hitbox: Hitbox;
    readonly img: HTMLImageElement;
    protected loaded: boolean = false;

    protected constructor(imgSrc: string, pos: Vector, protected rotation: number) {
        this.img = new Image();
        this.img.src = imgSrc;
        this.img.onload = () => {
            const halfWidth = this.img.width/2;
            const halfHeight = this.img.height/2;
            this.hitbox = new Hitbox(new Vector(pos.x - halfWidth, pos.y - halfHeight), new Vector(pos.x + halfWidth, pos.y + halfHeight));
            this.draw();
            this.loaded = true;
        }
    }

    public setPosition(pos: Vector): void{
        const halfWidth = this.img.width/2;
        const halfHeight = this.img.height/2;
        this.hitbox = new Hitbox(new Vector(pos.x - halfWidth, pos.y - halfHeight), new Vector(pos.x + halfWidth, pos.y + halfHeight));
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
    }

    abstract update(deltaTime: number): void;
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
}

export class Vector {
    constructor(public x: number,
                public y: number) {
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
}