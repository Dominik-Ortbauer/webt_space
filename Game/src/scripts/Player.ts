import {Entity, Vector} from './Entity.js'
import {Game} from './Game.js'
import {Projectile} from "./Projectile.js";
import {Powerup} from "./Powerups.js";

export class Player extends Entity {
    private keysPressed = {};
    private speed: number = 5;
    private startShootCooldown: number = 1;
    private shootCooldown = 0;
    private health = 200;
    private powerups: Powerup[] = [];

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
            this.pointToward(Vector.sub(new Vector(ev.clientX, ev.clientY), new Vector(Game.canvas.offsetLeft, Game.canvas.offsetTop)));
        });
    }

    public update(deltaTime: number): void {
        this.shootCooldown -= deltaTime;

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

    public addPowerup(powerup: Powerup): void{
        this.powerups.push(powerup);
    }

    private move(x: number, y: number): void{
        x *= this.speed;
        y *= this.speed;
        super.moveX(x);
        super.moveY(y);
    }

    private shoot(): void{
        const rot = this.rotation - Math.PI/2;
        const y = Math.sin(rot);
        const x = Math.cos(rot);

        Game.instantiate(new Projectile(this.hitbox.leftUpper.middle(this.hitbox.rightLower), new Vector(x, y)));
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