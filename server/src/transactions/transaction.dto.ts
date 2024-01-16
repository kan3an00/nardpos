import { IsNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ProductDto {
    @IsNotEmpty()
    product_id: number;

    @IsNotEmpty()
    quantity: number;
}

export class TransactionDto {
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductDto)
    products: ProductDto[];
}