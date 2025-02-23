import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Planet } from "./Planets";

export enum CharacterAffiliation {
    JEDI = "Jedi",
    SITH = "Sith",
    REBEL = "Rebel",
}

@Entity()
export class Character {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    race: string;

    @Column({
        type: "enum",
        enum: CharacterAffiliation,
        default: CharacterAffiliation.JEDI,
    })
    affiliation: CharacterAffiliation;

    @ManyToOne(() => Planet, (planet) => planet.name)
    homePlanet: Planet;
}
