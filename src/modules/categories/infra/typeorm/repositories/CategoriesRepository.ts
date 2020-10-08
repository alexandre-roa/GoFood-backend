import { getMongoRepository, MongoRepository, Not } from 'typeorm';

import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';
import ICreateCategoryDTO from '@modules/categories/dtos/ICreateCategoryDTO';

import Category from '../schemas/Category';

class CategoriesRepository implements ICategoriesRepository {
  private ormRepository: MongoRepository<Category>;
  constructor() {
    this.ormRepository = getMongoRepository(Category);
  }

  public async findCategory(
    category_name: string,
  ): Promise<Category | undefined> {
    const category = await this.ormRepository.findOne({
      where: { category_name },
    });

    return category;
  }

  public async listCategories(): Promise<Category[] | undefined> {
    const categories = await this.ormRepository.find();

    return categories;
  }

  public async create(CategoryData: ICreateCategoryDTO): Promise<Category> {
    const category = this.ormRepository.create(CategoryData);

    await this.ormRepository.save(category);

    return category;
  }
}

export default CategoriesRepository;
