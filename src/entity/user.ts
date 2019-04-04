import { Entity, Column, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['email', 'role'])
export default class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column({nullable: true})
    confirmation_code: string;

    @Column({default: 0})
    role: number;

    @Column({default: 0})
    status: number;
}