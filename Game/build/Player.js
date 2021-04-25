<<<<<<< Updated upstream
import { Entity } from './Entity';
class Player extends Entity {
    constructor(imgSrc, x, y) {
        super(imgSrc, x, y);
        document.addEventListener('keydown', (ev) => {
            switch (ev.key) {
                case 'space':
                    this.shoot();
                case 'w':
                    this.moveY(-this.speed);
                case 'a':
                    this.moveX(-this.speed);
                case 's':
                    this.moveY(this.speed);
                case 'd':
                    this.moveX(this.speed);
=======
import { Entity } from './Entity.js';
export class Player extends Entity {
    constructor(imgSrc) {
        super(imgSrc, 100, 100);
        document.addEventListener('keydown', (ev) => {
            if (ev.key === 'space')
                this.shoot();
            switch (ev.key) {
                case " ":
                    this.shoot();
                    break;
                case "w":
                    this.move(0, -1);
                    break;
                case "a":
                    this.move(-1, 0);
                    break;
                case "s":
                    this.move(0, 1);
                    break;
                case "d":
                    this.move(1, 0);
                    break;
>>>>>>> Stashed changes
            }
        });
    }
    update() {
<<<<<<< Updated upstream
=======
        super.draw();
    }
    move(x, y) {
        super.moveX(x);
        super.moveY(y);
>>>>>>> Stashed changes
    }
    shoot() {
    }
}
//# sourceMappingURL=Player.js.map