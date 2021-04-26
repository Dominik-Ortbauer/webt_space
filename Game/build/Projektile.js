import { Entity } from "./Entity.js";
export class Projektile extends Entity {
    constructor(startPos, dir) {
        super('./U2cZy+.jpg', startPos.x, startPos.y);
        this.startPos = startPos;
        this.dir = dir;
    }
    update() {
        super.moveX(this.dir.x);
        super.moveY(this.dir.y);
    }
}
//# sourceMappingURL=Projektile.js.map