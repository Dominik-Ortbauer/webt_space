import {Entity} from "./Entity.js";
import {Player} from "./Player.js";

let ctx: CanvasRenderingContext2D;
let canvas: HTMLCanvasElement;

function init(): void{
    canvas = <HTMLCanvasElement>document.getElementById("space");
    ctx = canvas.getContext("2d");

    player = new Player('./U2cZy+.jpg');
    update();
}

let player;

function update(): void{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.update();
    window.requestAnimationFrame(() => update());
}

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('Start').addEventListener('click', () => {
        init();
    })
});