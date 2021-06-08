import {Entity, IUpdate, Vector} from "./Entity.js";
import {Player} from "./Player.js";
import {Flock} from "./Flock.js";
import {Boid} from "./Boid.js";
import {WormHole} from "./Enemy.js";
import instantiate = WebAssembly.instantiate;

export class Game{
    public static ctx: CanvasRenderingContext2D;
    public static canvas: HTMLCanvasElement;

    private static updates: IUpdate[] = [];

    public static lastTimeStamp: number = 0;

    private static currentLevel: number = 0;
    public static player: Player;

    public static instantiate(update: IUpdate){
        this.updates.push(update);
    }

    public static destroy(update: IUpdate){
        const idx = this.updates.indexOf(update);

        if(idx > -1){
            this.updates.splice(idx, 1);
        }
    }

    static clearCanvas(): void{
        this.ctx.fillStyle = '';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    static updateAllEntities(deltaTime: number): void{
        for(let en of this.updates){
            en.update(deltaTime);

            if(en instanceof Entity){
                (<Entity>en).draw();

                const others: Entity[] = Game.collidesWith(en);

                for(let other of others){
                    en.onCollision(other);
                }
            }
        }
    }

    private static collidesWith(en: Entity): Entity[]{
        let others: Entity[] = [];

        for(let up of this.updates){
            if(up instanceof Entity){
                if(en.loaded && up.loaded && en != up && en.collides(up)){
                    others.push(up);
                }
            }
        }

        return others;
    }

    static gameInProgress:boolean = true;

    public static gameOver(): void {
        this.gameInProgress = false;
        let img: HTMLImageElement = new Image();
        img.src = './images/GameOverScreen.png';
        img.height = 800;
        img.width = 1200;
        img.onload = () => {
            this.ctx.drawImage(img, 0, 0);
        }
        //ctx.fillStyle = '80px';
        //ctx.beginPath();
        //this.ctx.fillText('Game Over', 600, 400);
    }

    public static getBoids(): Boid[]{
        let boids: Boid[] = [];

        for(let en of this.updates){
            if(en instanceof Boid){
                boids.push(en);
            }
        }

        return boids;
    }

    public static createWormholes(amount:number){
        for(let i:number = 0; i < amount; i++){
            Game.instantiate(new WormHole("WormHole.png", 12, Vector.randomPos(), 0));
        }
    }

    public static nextLevel(): void{
        this.currentLevel++;
        Flock.createBoids(this.currentLevel * 100, new Vector(600, 400), 100)
    }

    public static gameIsPaused = false;

    public static pressPause(): void{
        this.gameIsPaused = !this.gameIsPaused;
    }
}



function init(): void{
    Game.canvas = <HTMLCanvasElement>document.getElementById("space");
    Game.ctx = Game.canvas.getContext("2d");

    document.getElementById("pause").addEventListener("click", () =>{
        Game.pressPause();
    })

    Game.player = new Player();
    Game.instantiate(Game.player);
    Game.nextLevel();
    Game.lastTimeStamp = Date.now();
    update();
}

function update(): void{
    if(Game.gameInProgress && !Game.gameIsPaused) {

        Game.clearCanvas();
        Game.updateAllEntities((Date.now() - Game.lastTimeStamp) / 1000);
        Game.lastTimeStamp = Date.now();

        if (Game.getBoids().length == 0) {
            Game.nextLevel();
        }
    }

    window.requestAnimationFrame(() => update());
}

document.addEventListener('DOMContentLoaded', (event) => {
    init();
});
