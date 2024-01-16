import { PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, Entity } from "typeorm";
import { TransactionProduct } from "./transaction-product.entity";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ nullable: true })
    total: number;
  
    @OneToMany(() => TransactionProduct, (transactionProduct) => transactionProduct.transaction, { cascade: true })
    transactionProducts: TransactionProduct[];
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
}