import {Entity, IUpdate, Vector} from "./Entity.js";
import {Player} from "./Player.js";
import {Flock} from "./Flock.js";
import {Boid} from "./Boid.js";

let ctx: CanvasRenderingContext2D;
export let canvas: HTMLCanvasElement;

let updates: IUpdate[] = [];

let lastTimeStamp: number = 0;

export let player: Player;

function init(): void{
    canvas = <HTMLCanvasElement>document.getElementById("space");
    ctx = canvas.getContext("2d");

    //ctx.fillStyle = '80px arial';
    //ctx.beginPath();
    //ctx.fillText('test', 100, 100);
    //gameOver();
    instantiate(new Player());
    const flock: Flock = new Flock(100, new Vector(600, 400), 100);
    lastTimeStamp = Date.now();
    update();
}

export function instantiate(update: IUpdate){
    updates.push(update);
}

export function destroy(update: IUpdate){
    const idx = updates.indexOf(update);

    if(idx > -1){
        updates.splice(idx, 1);
    }
}

function clearCanvas(): void{
    ctx.fillStyle = '';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function updateAllEntities(deltaTime: number): void{
    for(let en of updates){
        en.update(deltaTime);

        if(en instanceof Entity){
            (<Entity>en).draw();

            const others: Entity[] = collidesWith(en);

            for(let other of others){
                en.onCollision(other);
            }
        }
    }
}

function collidesWith(en: Entity): Entity[]{
    let others: Entity[] = [];

    for(let up of updates){
        if(up instanceof Entity){
            if(en.loaded && up.loaded && en != up && en.collides(up)){
                others.push(up);
            }
        }
    }

    return others;
}

let gameInProgress:boolean = true;

export function gameOver(): void{
    gameInProgress = false;
    let img: HTMLImageElement = new Image();
    img.src = './images/GameOverScreen.png';
    img.height = 800;
    img.width = 1200;
    img.onload = () => {
        ctx.drawImage(img, 120, 50);
    }
    //ctx.fillStyle = '80px';
    //ctx.beginPath();
    //this.ctx.fillText('Game Over', 600, 400);
export function getBoidsOf(flock: Flock): Boid[]{
    let boids: Boid[] = [];

    for(let en of updates){
        if(en instanceof Boid){
            if(en.myFlock === flock){
                boids.push(en);
            }
        }
    }

    return boids;
}

function update(): void{
    clearCanvas();
    updateAllEntities((Date.now() - lastTimeStamp) / 1000);
    lastTimeStamp = Date.now();

    if(gameInProgress){
        window.requestAnimationFrame(() => update());
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    init();
});
