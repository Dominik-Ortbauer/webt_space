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
            }
        });
    }
    update() {
    }
    shoot() {
    }
}
//# sourceMappingURL=Player.js.map