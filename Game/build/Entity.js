export class Entity {
    constructor(imgSrc, x, y) {
        this.loaded = false;
        this.img = new Image();
        this.img.src = imgSrc;
        this.img.onload = () => {
            this.hitbox = new Hitbox(new Position(x, y), new Position(x + this.img.width, y + this.img.height));
            this.draw();
            this.loaded = true;
        };
    }
    moveX(pixel) {
        this.hitbox.moveX(pixel);
    }
    moveY(pixel) {
        this.hitbox.moveY(pixel);
    }
    draw() {
        if (!this.loaded)
            return;
        const canvas = document.getElementById("space");
        const ctx = canvas.getContext("2d");
        ctx.drawImage(this.img, this.hitbox.leftUpper.x, this.hitbox.leftUpper.y);
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