import {Entity} from './Entity.js'

<<<<<<< Updated upstream
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
=======
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
>>>>>>> Stashed changes
            }
        });
    }

<<<<<<< Updated upstream
    update(){

=======
    public update() {
        super.draw();
    }

    private move(x: number, y: number): void{
        super.moveX(x);
        super.moveY(y);
>>>>>>> Stashed changes
    }

    private shoot(): void{
    }
}