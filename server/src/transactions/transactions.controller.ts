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

    @Put(':id')
    async updateTransaction(@Param('id') transactionId: number, @Body() transactionDto: TransactionDto): Promise<Transaction> {
        return this.transactionService.updateTransaction(transactionId, transactionDto);
    }

    @Delete(':id')
    async deleteTransaction(@Param('id') transactionId: number) {
        return this.transactionService.deleteTransaction(transactionId);
    }
}
