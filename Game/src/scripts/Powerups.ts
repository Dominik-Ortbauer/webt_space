import {Player} from "./Player.js";
import {Game} from "./Game.js";
import {Laser, Projectile} from "./Projectile.js";
import {Vector} from "./Entity.js";

export abstract class Powerup {
    public static powerups: Powerup[] = [];

    public static init() {
        //add in instance of each subclass to powerups array
        this.powerups.push(new Multishot());
        this.powerups.push(new LaserShot());
    }

    public abstract copy(): Powerup;
    public abstract onShoot(player: Player): void;
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

        Game.instantiate(new Laser(player.getPosition(), target));
    }
}
