export abstract class Entity{
    private hitbox: Hitbox;
    private img: HTMLImageElement;

    protected constructor(imgSrc: string) {
        this.img.src = imgSrc;

        this.img.onload = () =>{

        }
    }

    abstract update(): void;
}

export class Hitbox {
    constructor(private readonly leftUpper: Position,
                private readonly rightLower: Position) {
    }
}

export class Position {
    constructor(public x: number,
                public y: number) {
    }

    public moveX(pixel: number): Position {
        return new Position(this.x + pixel, this.y);
    }

    public moveY(pixel: number): Position {
        return new Position(this.x, this.y + pixel);
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