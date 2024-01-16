import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, RelationId } from 'typeorm';
import { Transaction } from './transaction.entity';
import { Product } from 'src/products/product.entity';

@Entity('transaction_products')
export class TransactionProduct {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: number;

    @ManyToOne(() => Transaction, (transaction) => transaction.transactionProducts, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'transaction_id' })
    transaction: Transaction;

    @RelationId((transactionProduct: TransactionProduct) => transactionProduct.product)
    productId: number;

    @ManyToOne(() => Product, (product) => product.transactionProducts, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'product_id' })
    product: Product;
}
