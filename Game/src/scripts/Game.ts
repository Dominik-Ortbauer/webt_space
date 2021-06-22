import {Entity, Hitbox, IUpdate, Vector} from "./Entity.js";
import {Player} from "./Player.js";
import {Flock} from "./Flock.js";
import {Boid} from "./Boid.js";
import {WormHole} from "./WormHole.js";
import {Powerup} from "./Powerups.js";
import {Quadtree} from "./Quadtree.js";
import {Laser} from "./Projectile.js";

export class Game{
    public static ctx: CanvasRenderingContext2D;
    public static canvas: HTMLCanvasElement;

    private static updates: IUpdate[] = [];

    private static currentLevel: number = 0;
    public static player: Player;

    public static qtree: Quadtree;

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
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    public static buildQTree(): void{
        this.qtree = new Quadtree(new Hitbox(new Vector(0, 0), new Vector(this.canvas.width, this.canvas.height)), 4);

        for(let en of this.updates){
            if(en instanceof Entity){
                this.qtree.insert(en);
            }
        }

        //this.qtree.show();
    }

    static updateAllEntities(): void{
        for(let en of this.updates){
            const deltaTime = (Date.now() - en.lastTimeStamp) / 1000;
            en.update(deltaTime);
            en.lastTimeStamp = Date.now();

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
        let others = [];
        if(en instanceof Laser){
            for(let e of this.updates){
                if(e instanceof Entity){
                    if(en.collides(e)){
                        others.push(e);
                    }
                }
            }

            return others;
        }

        return en.loaded ? this.qtree.query(en.hitbox) : [];
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
        Flock.createBoids(this.currentLevel * 50, new Vector(600, 400), 100);
        this.createWormholes(this.currentLevel);
    }

    public static gameIsPaused = false;

    public static pressPause(): void{
        this.gameIsPaused = !this.gameIsPaused;
        this.lastTimeStamp = Date.now();
    }

    public static drawHud(): void{
        this.player.drawHud();
    }

    public static drawBar(maxLength: number, length: number, width: number, height: number, x: number, y: number, fill: string, outline: string){
        Game.ctx.lineWidth = 1;
        Game.ctx.strokeStyle = outline;
        Game.ctx.strokeRect(x-1, y-1, width + 2, height + 2);

        Game.ctx.fillStyle = fill;
        Game.ctx.fillRect(x, y, (length / maxLength) * width, height);
    }
}

function init(): void{
    Powerup.init();
    Game.canvas = <HTMLCanvasElement>document.getElementById("space");
    Game.ctx = Game.canvas.getContext("2d");

    document.getElementById("pause").addEventListener("click", () =>{
        Game.pressPause();
    })

    Game.player = new Player();
    Game.instantiate(Game.player);
    Game.nextLevel();
    update();
}

function update(): void{
    if(Game.gameInProgress && !Game.gameIsPaused) {
        Game.clearCanvas();

        Game.buildQTree();

        Game.updateAllEntities();

        Game.drawHud();

        if (Game.getBoids().length == 0) {
            Game.nextLevel();
        }
    }

    window.requestAnimationFrame(() => update());
}

document.addEventListener('DOMContentLoaded', (event) => {
    init();
});
