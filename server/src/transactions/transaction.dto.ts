import { IsNotEmpty, IsArray, ValidateNested, ArrayMinSize } from 'class-validator';
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
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => ProductDto)
    products: ProductDto[];
}