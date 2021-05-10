import {Entity, IUpdate, Vector} from "./Entity.js";
import {Player} from "./Player.js";
import {Flock} from "./Flock.js";

let ctx: CanvasRenderingContext2D;
export let canvas: HTMLCanvasElement;

let updates: IUpdate[] = [];

let lastTimeStamp: number = 0;

function init(): void{
    canvas = <HTMLCanvasElement>document.getElementById("space");
    ctx = canvas.getContext("2d");


    //instantiate(new Player());
    const flock: Flock = new Flock(100, new Vector(600, 400), 100);
    instantiate(flock);
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
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function updateAllEntities(deltaTime: number): void{
    for(let en of updates){
        en.update(deltaTime);
        if(en instanceof Entity){
            (<Entity>en).draw();
        }
    }
}

function update(): void{
    clearCanvas();
    updateAllEntities((Date.now() - lastTimeStamp) / 1000);
    lastTimeStamp = Date.now();

    window.requestAnimationFrame(() => update());
}

document.addEventListener('DOMContentLoaded', (event) => {
    init();
});
