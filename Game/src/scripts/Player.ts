import {Entity} from './Entity'

class Player extends Entity {
    private speed:number;

    constructor(imgSrc: string, x: number, y: number) {
        super(imgSrc, x, y);

        document.addEventListener('keydown', (ev)=>{
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

    update(){

    }

    private shoot(): void{
    }
}