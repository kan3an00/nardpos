import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';
import { Repository, FindManyOptions, DeepPartial, In  } from 'typeorm';
import { Product } from 'src/products/product.entity';
import { TransactionDto } from './transaction.dto';
import { TransactionProduct } from './transaction-product.entity';

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Transaction)
        private readonly transactionRepository: Repository<Transaction>,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) {}

    async getAllTransactions(): Promise<Transaction[]> {
        return this.transactionRepository.find({
            relations: ['transactionProducts', 'transactionProducts.product'],
        });
    }

    async createTransaction(transactionDto: TransactionDto): Promise<Transaction> {
        const { products: productQuantities } = transactionDto;

        const transactionProducts: TransactionProduct[] = [];
      
        for (const { product_id, quantity } of productQuantities) {
            const product = await this.productRepository.findOne({
                where: { id: product_id },
            });
        
            if (!product) {
                throw new NotFoundException(`Product with ID ${product_id} not found`);
            }
        
            if (product.quantity < quantity) {
                throw new NotFoundException(`Product with ID ${product_id} does not have sufficient quantity`);
            }
        
            const transactionProduct = new TransactionProduct();
            transactionProduct.product = product;
            transactionProduct.quantity = quantity;
        
            transactionProducts.push(transactionProduct);
        }
      
        const total = transactionProducts.reduce((acc, transactionProduct) => {
            const productPrice = transactionProduct.product.price;
            const productQuantity = transactionProduct.quantity;

            return acc + productPrice * productQuantity;
        }, 0);
        
        const transaction = this.transactionRepository.create({
            total,
            transactionProducts,
        });
        
        const savedTransaction = this.transactionRepository.save(transaction);

        for (const transactionProduct of transactionProducts) {
            const product = transactionProduct.product;
            product.quantity -= transactionProduct.quantity;
            await this.productRepository.save(product);
        }

        return savedTransaction;
    }
}
