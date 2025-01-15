import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from "typeorm";
import { Planet } from "./Planets";

@Entity()
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
