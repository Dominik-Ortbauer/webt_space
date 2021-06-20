import {Entity, Vector} from './Entity.js'
import {Game} from './Game.js'
import {Projectile} from "./Projectile.js";
import {Powerup} from "./Powerups.js";

export class Player extends Entity {
    private keysPressed = {};
    private speed: number = 5;
    private startShootCooldown: number = 1;
    public shootCooldown = 0;
    private maxHealth = 200;
    private health = 200;
    private powerups: Powerup[] = [];
    private mouse: MouseEvent;

    constructor() {
        super('Spaceship.png', new Vector(Game.canvas.width/2, Game.canvas.height - 100), 0);

        document.addEventListener('keydown', (ev)=>{
            this.keysPressed[ev.key] = true;
        });

        document.addEventListener('keyup', (ev) => {
            delete this.keysPressed[ev.key];
        });

        document.addEventListener('mousedown', (ev)=>{
            this.keysPressed[ev.button] = true;
        });

        document.addEventListener('mouseup', (ev) => {
            delete this.keysPressed[ev.button];
        });

        document.addEventListener('mousemove', (ev) => {
            this.mouse = ev;
        });
    }

    public update(deltaTime: number): void {
        if(this.mouse !== undefined){
            this.pointToward(Vector.sub(new Vector(this.mouse.clientX, this.mouse.clientY), new Vector(Game.canvas.offsetLeft, Game.canvas.offsetTop)));
        }

        if(this.shootCooldown > 0){
            this.shootCooldown -= deltaTime;
        }

        //console.log(deltaTime);

        for(let pow of this.powerups){
            pow.onUpdate(this, deltaTime);
        }

        if(this.keysPressed['w'] && this.hitbox.leftUpper.y > 0)
            this.move(0, -1);

        if(this.keysPressed['a'] && this.hitbox.leftUpper.x > 0)
            this.move(-1, 0);

        if(this.keysPressed['s'] && this.hitbox.rightLower.y < Game.canvas.height)
            this.move(0, 1);

        if(this.keysPressed['d'] && this.hitbox.rightLower.x < Game.canvas.width)
            this.move(1, 0);

        if((this.keysPressed[0] || this.keysPressed[' ']) && this.shootCooldown <= 0) {
            this.shoot();
        }
    }

    public drawHud(): void{
        Game.drawBar(this.maxHealth, this.health, 400, 20, 20, 20, 'red', 'white');

        Game.drawBar(this.startShootCooldown, this.startShootCooldown - this.shootCooldown, 200, 20, 20, 60, 'green', 'white');
    }

    public addPowerup(powerup: Powerup): void{
        this.powerups.push(powerup);
    }

    public removePowerup(powerup: Powerup): void{
        let idx = this.powerups.indexOf(powerup);

        if(idx >= 0)
        {
            this.powerups.splice(idx, 1);
        }
    }

    private move(x: number, y: number): void{
        x *= this.speed;
        y *= this.speed;
        super.moveX(x);
        super.moveY(y);
    }

    private shoot(): void{
        this.shootCooldown = this.startShootCooldown;

        for(let p of this.powerups){
            p.onShoot(this);
        }
    }

    public takeDamage(amount: number): void{
        //this.health -= amount;
        if(this.health <= 0){
            Game.destroy(this);
            Game.gameOver();
        }
    }
}