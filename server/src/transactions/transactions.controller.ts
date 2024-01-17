// src/transactions/transaction.controller.ts

import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Transaction } from './transaction.entity';
import { TransactionDto } from './transaction.dto';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionsService) {}

    @Get()
    async getAllTransactions(): Promise<Transaction[]> {
        return this.transactionService.getAllTransactions();
    }

    @Post()
    async createTransaction(@Body() transactionDto: TransactionDto) {
        return this.transactionService.createTransaction(transactionDto);
    }
}
