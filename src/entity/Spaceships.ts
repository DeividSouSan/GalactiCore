import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

@Entity()
@Unique(["model"])
export class Spaceship {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    model: string

    @Column()
    manufacturer: string

    @Column()
    capacity: number
}
