export class Entity {
    constructor(imgSrc, x, y) {
        this.img.src = imgSrc;
        this.img.onload = () => {
            this.hitbox = new Hitbox(new Position(x, y), new Position(x + this.img.width, y + this.img.height));
        };
    }
    moveX(pixel) {
        this.hitbox.moveX(pixel);
    }
    moveY(pixel) {
        this.hitbox.moveY(pixel);
    }
}
export class Hitbox {
    constructor(leftUpper, rightLower) {
        this.leftUpper = leftUpper;
        this.rightLower = rightLower;
    }
    moveX(pixel) {
        this.leftUpper.moveX(pixel);
        this.rightLower.moveX(pixel);
    }
    moveY(pixel) {
        this.leftUpper.moveY(pixel);
        this.rightLower.moveY(pixel);
    }
}
export class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    moveX(pixel) {
        this.x += pixel;
    }
    moveY(pixel) {
        this.y += pixel;
    }
    horizontalDistanceTo(other) {
        const distance = this.x - other.x;
        return Math.abs(distance);
    }
    verticalDistanceTo(other) {
        const distance = this.y - other.y;
        return Math.abs(distance);
    }
}
//# sourceMappingURL=Entity.js.map