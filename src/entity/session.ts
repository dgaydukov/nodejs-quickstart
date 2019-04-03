import {Entity, Column, Index, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export default class Session {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Index({ unique: true })
    @Column()
    user_id: string;

    @Column()
    timestamp: string;

    @Column()
    key: string;
}