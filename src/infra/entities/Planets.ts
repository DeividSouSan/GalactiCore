import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique } from "typeorm";
import { StellarSystem } from "./StellarSystems";

@Entity()
@Unique(["name"])
export class Planet {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    weather: string

    @Column()
    terrain: string

    @Column()
    population: number

    @Column({ nullable: false })
    stellarSystemId: number

    @ManyToOne(() => StellarSystem, (stellarSystem) => stellarSystem.planets)
    stellarSystem: StellarSystem
}
