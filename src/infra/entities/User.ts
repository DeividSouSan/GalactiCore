import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    BeforeInsert,
} from "typeorm";

@Entity()
@Unique(["email", "username"])
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @BeforeInsert()
    defaultActive() {
        this.active = false;
    }

    @Column()
    active: boolean = false;
}
