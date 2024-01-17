import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions  } from 'typeorm';
import { Product } from './product.entity';
import { ProductDto } from './product.dto';
import { SearchFilterTrait } from '../utils/search-filter.trait';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) {}

    async getAllProducts(searchQuery?: string, minPrice?: number, maxPrice?: number): Promise<Product[]> {
        let options: FindManyOptions = {};

        // Apply search and filter using the trait
        options = SearchFilterTrait.applySearchAndFilter(options, searchQuery, minPrice, maxPrice);

        return this.productRepository.find(options);
    }
    
    async getProductById(id: number): Promise<Product> {
        const product = await this.productRepository.findOne({
            where: { id },
        });
        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
        return product;
    }

    async createProduct(productDTO: ProductDto): Promise<Product> {
        const newProduct = this.productRepository.create(productDTO);
        return this.productRepository.save(newProduct);
    }

    async updateProduct(id: number, productDTO: ProductDto): Promise<Product> {
        const existingProduct = await this.getProductById(id);
        this.productRepository.merge(existingProduct, productDTO);
        return this.productRepository.save(existingProduct);
    }

    async deleteProduct(id: number): Promise<void> {
        const existingProduct = await this.getProductById(id);

        if(!existingProduct) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }

        await this.productRepository.softRemove(existingProduct);
    }
}
