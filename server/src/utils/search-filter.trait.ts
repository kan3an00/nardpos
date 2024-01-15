import { FindManyOptions, Like, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';

export class SearchFilterTrait {
    static applySearchAndFilter(options: FindManyOptions, searchQuery?: string, minPrice?: number, maxPrice?: number): FindManyOptions {
      if (searchQuery) {
          options.where = { ...options.where, name: Like(`%${searchQuery}%`) };
      }
  
      if (minPrice !== undefined) {
          options.where = { ...options.where, price: MoreThanOrEqual(minPrice) };
      }
  
      if (maxPrice !== undefined) {
          options.where = { ...options.where, price: LessThanOrEqual(maxPrice) };
      }
  
      return options;
    }
  }