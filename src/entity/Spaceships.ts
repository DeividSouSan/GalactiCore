import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
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
