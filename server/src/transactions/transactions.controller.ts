import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Transaction } from './transaction.entity';
import { TransactionDto } from './transaction.dto';
import {Role} from 'src/enums/role.enum';
import {Roles} from 'src/decorators/roles.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionsService) {}

    @Get()
    async getAllTransactions(): Promise<Transaction[]> {
        return this.transactionService.getAllTransactions();
    }

    @Post()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RoleGuard)
    async createTransaction(@Body() transactionDto: TransactionDto) {
        return this.transactionService.createTransaction(transactionDto);
    }
}
