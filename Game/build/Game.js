import { Player } from "./Player.js";
let ctx;
let canvas;
function init() {
    canvas = document.getElementById("space");
    ctx = canvas.getContext("2d");
    player = new Player('./U2cZy+.jpg');
    update();
}
let player;
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.update();
    window.requestAnimationFrame(() => update());
}
document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('Start').addEventListener('click', () => {
        init();
    });
});
//# sourceMappingURL=Game.js.map