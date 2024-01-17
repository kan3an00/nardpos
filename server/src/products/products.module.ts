import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Transaction } from 'src/transactions/transaction.entity';
import { TransactionProduct } from 'src/transactions/transaction-product.entity';
import { RoleGuard } from 'src/guards/role.guard';
import { AccessContorlService } from 'src/shared/access-control.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Transaction, TransactionProduct])],
  controllers: [ProductController],
  providers: [ProductService, AccessContorlService ,RoleGuard],
})
export class ProductsModule {}
