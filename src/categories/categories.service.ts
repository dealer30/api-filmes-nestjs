import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './categories.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categories_repo: Repository<Category>,
  ) {}
  public async createCategories(
    categories: string[],
    movieId: string,
  ): Promise<Category[]> {
    const categoriesList = categories.map((category) => {
      const categoryDB = new Category();
      categoryDB.movie = movieId;
      categoryDB.category = category;
      return categoryDB;
    });
    return categoriesList;
  }

  public async saveCategories(categories: Category[]): Promise<Category[]> {
    return this.categories_repo.save([...categories]);
  }

  public async deleteCategories(categories: Category[]): Promise<void> {
    await this.categories_repo.remove(categories);
  }
}
