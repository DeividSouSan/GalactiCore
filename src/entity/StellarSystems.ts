import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique } from "typeorm";
import { Planet } from "./Planets";

@Entity()
@Unique(["name"])
export class StellarSystem {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @OneToMany(() => Planet, (planet) => planet.name, {
        cascade: true,
    })
    planets: Planet[]
}
