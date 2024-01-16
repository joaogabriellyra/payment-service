import { Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Token {
    @PrimaryGeneratedColumn()
    token: string
}