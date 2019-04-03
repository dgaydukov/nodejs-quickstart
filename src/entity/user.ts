import {Entity, Column, PrimaryGeneratedColumn, Unique} from "typeorm";

@Entity()
@Unique(['email', 'role'])
export default class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    email: string;

    @Column()
    password_hash: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column({default: 0})
    role: number;

    @Column({default: 0})
    status: number;

    @Column({nullable: true})
    confirmation_code: string;
}