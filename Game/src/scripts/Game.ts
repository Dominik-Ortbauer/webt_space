import {Entity, IUpdate, Vector} from "./Entity.js";
import {Player} from "./Player.js";
import {Flock} from "./Flock.js";
import {Projectile} from "./Projectile.js";

let ctx: CanvasRenderingContext2D;
export let canvas: HTMLCanvasElement;

let updates: IUpdate[] = [];

let lastTimeStamp: number = 0;

function init(): void{
    canvas = <HTMLCanvasElement>document.getElementById("space");
    ctx = canvas.getContext("2d");


    instantiate(new Player());
    instantiate(new Projectile(new Vector(300, 300), new Vector(0,0)));
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
    ctx.fillStyle = 'black';
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

function update(): void{
    clearCanvas();
    updateAllEntities((Date.now() - lastTimeStamp) / 1000);
    lastTimeStamp = Date.now();

    window.requestAnimationFrame(() => update());
}

document.addEventListener('DOMContentLoaded', (event) => {
    init();
});
