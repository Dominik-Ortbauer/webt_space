import {Entity} from "./Entity.js";
import {Player} from "./Player.js";

let ctx: CanvasRenderingContext2D;
export let canvas: HTMLCanvasElement;

let entities: Entity[] = [];

let lastTimeStamp: number = 0;

function init(): void{
    canvas = <HTMLCanvasElement>document.getElementById("space");
    ctx = canvas.getContext("2d");


    instantiate(new Player('./U2cZy+.jpg'));
    lastTimeStamp = Date.now();
    update();
}

export function instantiate(entity: Entity){
    entities.push(entity);
}

export function destroy(entity: Entity){
    const idx = entities.indexOf(entity, 0);

    if(idx > -1){
        entities.splice(idx, 1);
    }
}

function clearCanvas(): void{
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function updateAllEntities(deltaTime: number): void{
    for(let en of entities){
        en.update(deltaTime);
        en.draw();
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