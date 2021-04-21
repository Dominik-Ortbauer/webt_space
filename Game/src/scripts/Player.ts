import {Entity} from './Entity'

class Player extends Entity {
    constructor(imgSrc: string) {
        super(imgSrc);

        document.addEventListener('keydown', (ev)=>{
            if(ev.key === 'space')
                this.shoot();
        });
    }

    private move(): void{
        
    }

    private shoot(): void{

    }
}