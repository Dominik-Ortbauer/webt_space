import { Entity } from './Entity';
class Player extends Entity {
    constructor(imgSrc) {
        super(imgSrc);
        document.addEventListener('keydown', (ev) => {
            if (ev.key === 'space')
                this.shoot();
        });
    }
    move() {
    }
    shoot() {
    }
}
//# sourceMappingURL=Player.js.map