import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number = -1;

    @Column()
    firstName: string = '';

    @Column()
    lastName: string = '';

    @Column()
    age: number = -1;

}
