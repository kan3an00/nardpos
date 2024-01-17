import { Module } from '@nestjs/common';
import { TransactionController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { Transaction } from './transaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/product.entity';
import { TransactionProduct } from './transaction-product.entity';
import { RoleGuard } from 'src/guards/role.guard';
import { AccessContorlService } from 'src/shared/access-control.service';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, Product, TransactionProduct])],
  controllers: [TransactionController],
  providers: [TransactionsService, AccessContorlService ,RoleGuard]
})
export class TransactionsModule {}
