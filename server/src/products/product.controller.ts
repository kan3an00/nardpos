import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './product.dto';
import { Product } from './product.entity';

@Controller('products')
export class ProductController {
  constructor(private readonly productsService: ProductService) {}

  @Get()
  async getAllProducts(
    @Query('search') searchQuery?: string,
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
  ): Promise<Product[]> {
    return this.productsService.getAllProducts(searchQuery, minPrice, maxPrice);
  }

  @Get(':id')
  async getProductById(@Param('id') id: number): Promise<Product> {
    return this.productsService.getProductById(id);
  }

  @Post()
  async createProduct(@Body() productDTO: ProductDto): Promise<Product> {
    return this.productsService.createProduct(productDTO);
  }

  @Put(':id')
  async updateProduct(@Param('id') id: number, @Body() productDTO: ProductDto): Promise<Product> {
    return this.productsService.updateProduct(id, productDTO);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: number): Promise<void> {
    return this.productsService.deleteProduct(id);
  }
}