import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn
  } from 'typeorm';
  
  @Entity()
  export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    firstName: string;
  
    @Column()
    lastName: string;
  
    @Column()
    email: string;
  
    @Column()
    password: string;

    @Column({
      default: 0
    })
    balance: number;

    @Column( {
      default: false
    } )
    confirmed: boolean;

    @Column( {
      default: false
    } )
    deleted: boolean;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }