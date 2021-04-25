export abstract class Entity{
    private hitbox: Hitbox;
    readonly img: HTMLImageElement;
    private loaded: boolean = false;

    protected constructor(imgSrc: string, x: number, y: number) {
        this.img = new Image();
        this.img.src = imgSrc;
        this.img.onload = () => {
            this.hitbox = new Hitbox(new Position(x, y), new Position(x + this.img.width, y + this.img.height));
            this.draw();
            this.loaded = true;
        }
    }

    public moveX(pixel: number): void {
        this.hitbox.moveX(pixel);
    }

    public moveY(pixel: number): void {
        this.hitbox.moveY(pixel);
    }

    public draw(): void {
        if(!this.loaded)
            return;

        const canvas = <HTMLCanvasElement>document.getElementById("space");
        const ctx = canvas.getContext("2d");
        ctx.drawImage(this.img, this.hitbox.leftUpper.x, this.hitbox.leftUpper.y);
    }

    abstract update(): void;
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

    public horizontalDistanceTo(other: Position): number {
        const distance = this.x - other.x;
        return Math.abs(distance);
    }

    public verticalDistanceTo(other: Position): number {
        const distance = this.y - other.y;
        return Math.abs(distance);
    }
}