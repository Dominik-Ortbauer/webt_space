import {Entity, Vector} from "./Entity.js";

export abstract class Enemy extends Entity{
    protected constructor(imgSrc: string, private health: number, pos: Vector, rotation: number) {
        super(imgSrc, pos, rotation);
    }

    public abstract update(deltaTime: number): void;
}