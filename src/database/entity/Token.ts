import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn
  } from 'typeorm';
  
  @Entity()
  export class Token extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    token: string;
  
    @CreateDateColumn()
    createdAt: Date;
  }