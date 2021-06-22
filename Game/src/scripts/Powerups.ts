import {Player} from "./Player.js";
import {Game} from "./Game.js";
import {Laser, Projectile} from "./Projectile.js";
import {Entity, Vector} from "./Entity.js";
import {Enemy} from "./Enemy.js";

export class LaserShotItem extends Entity{
    constructor(pos: Vector) {
        super('LaserPowerup.png', pos, 0);
    }

    update(deltaTime: number) {
    }

    public onCollision(other: Entity) {
        if(other instanceof Player){
            other.addPowerup(new LaserShot());
            Game.destroy(this);
        }
    }
}

export class MultishotItem extends Entity{
    constructor(pos: Vector) {
        super('MultishotPowerup.png', pos, 0);
    }

    update(deltaTime: number) {
    }

    public onCollision(other: Entity) {
        if(other instanceof Player){
            other.addPowerup(new Multishot());
            Game.destroy(this);
        }
    }
}

export class FasterReloadItem extends Entity{
    constructor(pos: Vector) {
        super('MultishotPowerup.png', pos, 0);
    }

    update(deltaTime: number) {
    }

    public onCollision(other: Entity) {
        if(other instanceof Player){
            other.addPowerup(new FasterReload());
            Game.destroy(this);
        }
    }
}

export abstract class Powerup {
    public static powerups: Powerup[] = [];

    public static init() {
        //add one instance of each subclass to powerups array
        this.powerups.push(new Multishot());
        this.powerups.push(new LaserShot());
        this.powerups.push(new FasterReload());
        this.powerups.push(new LaserHell());
    }

    public abstract copy(): Powerup;
    public abstract onShoot(player: Player): void;
    public abstract onUpdate(player: Player, deltaTime: number): void;
}

class Multishot extends Powerup{
    public copy(): Powerup{
        return new Multishot();
    }

    public onShoot(player: Player): void{
        const offset = Math.PI / 8; //16th of a circle
        let rot = player.getRotation() - Math.PI/2;
        rot += Math.random()*offset - offset/2;
        const y = Math.sin(rot);
        const x = Math.cos(rot);

        Game.instantiate(new Projectile(player.getPosition(), new Vector(x, y)));
    }

    public onUpdate(player: Player, deltaTime: number) {}
}

class LaserShot extends Powerup{
    public copy(): Powerup{
        return new LaserShot();
    }

    public onShoot(player: Player): void{
        let rot = player.getRotation() - Math.PI / 2;
        const y = Math.sin(rot);
        const x = Math.cos(rot);
        let target: Vector = new Vector(x, y);
        target.setMagnitude(2000);
        target.add(player.getPosition());

        Game.instantiate(new Laser(player.getPosition(), target, (laser: Laser, other: Entity) => {
            if(other instanceof Enemy && laser.alreadyHit.indexOf(other) == -1){
                other.takeDamage(1);
                laser.alreadyHit.push(other);
            }
        }));
    }

    public onUpdate(player: Player, deltaTime: number) {}
}

class FasterReload extends Powerup{
    public copy(): Powerup{
        return new FasterReload();
    }

    public onShoot(player: Player) {}

    public onUpdate(player: Player, deltaTime: number) {
        if(player.shootCooldown > 0){
            player.shootCooldown -= deltaTime;
        }
    }
}

class LaserHell extends Powerup{
    private liveTime = 10;

    public copy(): Powerup{
        return new LaserHell();
    }

    public onShoot(player: Player) {}

    public onUpdate(player: Player, deltaTime: number) {
        if(this.liveTime <= 0){
            player.removePowerup(this);
        }

        this.liveTime -= deltaTime;

        let rot = Math.random() * Math.PI * 2;
        const y = Math.sin(rot);
        const x = Math.cos(rot);
        let target: Vector = new Vector(x, y);
        target.setMagnitude(2000);
        target.add(player.getPosition());

        Game.instantiate(new Laser(player.getPosition(), target, (laser: Laser, other: Entity) => {
            if(other instanceof Enemy && laser.alreadyHit.indexOf(other) == -1){
                other.takeDamage(1);
                laser.alreadyHit.push(other);
            }
        }));
    }
}
