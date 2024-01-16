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
        return this.transactionRepository.find();
    }

    async getTransactionById(id: number): Promise<Transaction> {
        return this.transactionRepository.findOne({
            where: { id },
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
      
        const total = transactionProducts.reduce((acc, transactionProduct) => acc + transactionProduct.product.price * transactionProduct.quantity, 0);
      
        const transaction = this.transactionRepository.create({
            total,
            transactionProducts,
        });
      
        return await this.transactionRepository.save(transaction);
    }

    async updateTransaction(transactionId: number, transactionDto: TransactionDto): Promise<Transaction> {
        const { products: productIds, ...transactionData } = transactionDto;
    
        // Fetch the existing transaction
        const existingTransaction = await this.transactionRepository.findOne({
            where: { id: transactionId },
            relations: ['products'],
        });
    
        if (!existingTransaction) {
          // Handle the case when the transaction is not found
          // You can throw an exception or return a specific response
          // For simplicity, let's assume NotFoundException from '@nestjs/common'
          throw new NotFoundException(`Transaction with ID ${transactionId} not found`);
        }
    
        // Fetch the products based on the provided product IDs
        const products = await this.productRepository.findBy({
            id: In(productIds),
        });
        
        // sum the total price of the products
        const total = products.reduce((acc, product) => acc + product.price, 0);

        // Update the transaction data
        existingTransaction.total = total;
        // existingTransaction.products = products;
    
        // Save the updated transaction
        return this.transactionRepository.save(existingTransaction);
    }

    async deleteTransaction(transactionId: number): Promise<void> {
        const existingTransaction = await this.transactionRepository.findOne({
            where: { id: transactionId },
        });
    
        if (!existingTransaction) {
          throw new NotFoundException(`Transaction with ID ${transactionId} not found`);
        }
    
        // Delete transaction
        await this.transactionRepository.delete(transactionId);
    
        // Update product quantities
        // await this.updateProductQuantities(existingTransaction);
    }

    // private async updateProductQuantities(transaction: Transaction): Promise<void> {
    //     // Fetch the product IDs from the transaction
    //     const productIds = transaction.products.map(item => item.product.id);
    
    //     // Fetch the products
    //     const products = await this.productRepository.findBy({
    //       id: In(productIds),
    //     });
    
    //     // Update the product quantities
    //     const updatedProducts = products.map(product => {
    //       // Find the product quantity in the transaction
    //       const transactionProduct = transaction.products.find(item => item.product.id === product.id);
    
    //       // Update the product quantity
    //       product.quantity = transactionProduct.quantity;
    
    //       return product;
    //     });
    
    //     // Save the updated products
    //     await this.productRepository.save(updatedProducts);
    // } 
}
