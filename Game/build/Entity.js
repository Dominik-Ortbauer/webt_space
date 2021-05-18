export class Entity {
    constructor(imgSrc, pos, rotation) {
        this.rotation = rotation;
        this.showHitboxxes = false;
        this.loaded = false;
        this.img = new Image();
        this.img.src = './Images/' + imgSrc;
        this.img.onload = () => {
            const halfWidth = this.img.width / 2;
            const halfHeight = this.img.height / 2;
            this.hitbox = new Hitbox(new Vector(pos.x - halfWidth, pos.y - halfHeight), new Vector(pos.x + halfWidth, pos.y + halfHeight));
            this.draw();
            this.loaded = true;
        };
    }
    setPosition(pos) {
        const halfWidth = this.img.width / 2;
        const halfHeight = this.img.height / 2;
        this.hitbox = new Hitbox(new Vector(pos.x - halfWidth, pos.y - halfHeight), new Vector(pos.x + halfWidth, pos.y + halfHeight));
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
        const middle = this.hitbox.leftUpper.middle(this.hitbox.rightLower);
        ctx.save();
        ctx.translate(middle.x, middle.y);
        ctx.rotate(this.rotation);
        ctx.drawImage(this.img, -this.img.width / 2, -this.img.height / 2);
        ctx.restore();
        if (this.showHitboxxes) {
            ctx.strokeStyle = 'white';
            ctx.beginPath();
            ctx.rect(this.hitbox.leftUpper.x, this.hitbox.leftUpper.y, this.hitbox.rightLower.x - this.hitbox.leftUpper.x, this.hitbox.rightLower.y - this.hitbox.leftUpper.y);
            ctx.stroke();
        }
    }
    collides(other) {
        return this.hitbox.collides(other.hitbox);
    }
    onCollision(other) { }
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
    collides(other) {
        let collides = this.leftUpper.containedIn(other.leftUpper, other.rightLower);
        collides = collides || this.rightLower.containedIn(other.leftUpper, other.rightLower);
        collides = collides || other.leftUpper.containedIn(this.leftUpper, this.rightLower);
        collides = collides || other.rightLower.containedIn(this.leftUpper, this.rightLower);
        return collides;
    }
}
export class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    containedIn(leftUpper, rightLower) {
        let collides = this.x >= leftUpper.x && this.x <= rightLower.x;
        return collides && this.y >= leftUpper.y && this.y <= rightLower.y;
    }
    moveX(pixel) {
        this.x += pixel;
    }
    moveY(pixel) {
        this.y += pixel;
    }
    middle(other) {
        return new Vector((this.x + other.x) / 2, (this.y + other.y) / 2);
    }
    static add(v1, v2) {
        return new Vector(v1.x + v2.x, v1.y + v2.y);
    }
    add(other) {
        this.x += other.x;
        this.y += other.y;
    }
    static sub(v1, v2) {
        return new Vector(v1.x - v2.x, v1.y - v2.y);
    }
    sub(other) {
        this.x -= other.x;
        this.y -= other.y;
    }
    div(value) {
        this.x /= value;
        this.y /= value;
    }
    scale(value) {
        this.x *= value;
        this.y *= value;
    }
    distanceTo(other) {
        return Math.sqrt((this.x - other.x) * (this.x - other.x) + (this.y - other.y) * (this.y - other.y));
    }
    static random() {
        const angle = Math.random() * Math.PI * 2;
        return new Vector(Math.cos(angle), Math.sin(angle));
    }
    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    setMagnitude(value) {
        this.scale(value / this.magnitude());
    }
    limit(value) {
        if (this.magnitude() > value) {
            this.setMagnitude(value);
        }
    }
}
//# sourceMappingURL=Entity.js.map