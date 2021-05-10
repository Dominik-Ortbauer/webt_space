export abstract class Entity{
    protected hitbox: Hitbox;
    readonly img: HTMLImageElement;
    protected loaded: boolean = false;

    protected constructor(imgSrc: string, x: number, y: number) {
        this.img = new Image();
        this.img.src = './Images/' + imgSrc;
        this.img.onload = () => {
            const halfWidth = this.img.width/2;
            const halfHeight = this.img.height/2;
            this.hitbox = new Hitbox(new Position(x - halfWidth, y - halfHeight), new Position(x + halfWidth, y + halfHeight));
            this.draw();
            this.loaded = true;
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
        ctx.drawImage(this.img, this.hitbox.leftUpper.x, this.hitbox.leftUpper.y);
    }

    abstract update(deltaTime: number): void;
}

export class Hitbox {
    constructor(public readonly leftUpper: Position,
                public readonly rightLower: Position) {
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

export class Position {
    constructor(public x: number,
                public y: number) {
    }

    public moveX(pixel: number): void {
        this.x += pixel;
    }

    public moveY(pixel: number): void {
        this.y += pixel;
    }

    public middle(other: Position): Position {
        return new Position((this.x + other.x) / 2, (this.y + other.y) / 2);
    }
}