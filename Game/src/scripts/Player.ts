import {Entity} from './Entity.js'


export class Player extends Entity {
    constructor(imgSrc: string) {
        super(imgSrc, 100, 100);

        document.addEventListener('keydown', (ev)=>{
            if(ev.key === 'space')
                this.shoot();

            switch (ev.key){
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
            }
        });
    }

    public update() {
        super.draw();
    }

    private move(x: number, y: number): void{
        super.moveX(x);
        super.moveY(y);
    }

    private shoot(): void{
    }
}