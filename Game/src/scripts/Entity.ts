export abstract class Entity{
    private hitbox: Hitbox;
    private img: HTMLImageElement;

    protected constructor(imgSrc: string, x: number, y: number) {
        this.img.src = imgSrc;

        this.img.onload = () => {
            this.hitbox = new Hitbox(new Position(x, y), new Position(x + this.img.width, y + this.img.height));
        }
    }

    abstract update(): void;
}

export class Hitbox {
    constructor(private readonly leftUpper: Position,
                private readonly rightLower: Position) {
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