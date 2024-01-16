import { Module } from '@nestjs/common';
import { TransactionController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { Transaction } from './transaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/product.entity';
import { TransactionProduct } from './transaction-product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, Product, TransactionProduct])],
  controllers: [TransactionController],
  providers: [TransactionsService]
})
export class TransactionsModule {}
