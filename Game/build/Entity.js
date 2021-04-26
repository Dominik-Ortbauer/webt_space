export class Entity {
    constructor(imgSrc, x, y) {
        this.loaded = false;
        this.img = new Image();
        this.img.src = imgSrc;
        this.img.onload = () => {
            const halfWidth = this.img.width / 2;
            const halfHeight = this.img.height / 2;
            this.hitbox = new Hitbox(new Position(x - halfWidth, y - halfHeight), new Position(x + halfWidth, y + halfHeight));
            this.draw();
            this.loaded = true;
        };
    }
    moveX(pixel) {
        if (!this.loaded)
            return;
        this.hitbox.moveX(pixel);
    }
    moveY(pixel) {
        if (!this.loaded)
            return;
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
    middle(other) {
        return new Position((this.x + other.x) / 2, (this.y + other.y) / 2);
    }
}
//# sourceMappingURL=Entity.js.map