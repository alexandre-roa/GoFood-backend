import { MongoRepository, getMongoRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import FoodCategory from '@modules/foods/infra/typeorm/schemas/FoodCategory';

import ICategoryFoodsRepository from '@modules/foods/repositories/ICategoryFoodsRepository';
import ICreateCategoryFoodDTO from '@modules/foods/dtos/ICreateCategoryFoodDTO';

class FoodCategoriesRepository implements ICategoryFoodsRepository {
  private ormRepository: MongoRepository<FoodCategory>;

  constructor() {
    this.ormRepository = getMongoRepository(FoodCategory);
  }

  public async create(data: ICreateCategoryFoodDTO): Promise<FoodCategory> {
    const category = this.ormRepository.create(data);

    await this.ormRepository.save(category);

    return category;
  }

  public async findId(category_id: string): Promise<FoodCategory | undefined> {
    const id = JSON.stringify(category_id).replace(/"/g, '');

    const category = await this.ormRepository.findOne(id);

    return category;
  }

  public async findOne(
    categoryTitle: string,
    restaurant_id: string,
  ): Promise<FoodCategory | undefined> {
    const category = this.ormRepository.findOne({
      where: { title: categoryTitle, restaurant_id },
    });

    if (!category) throw new AppError('Category not found');

    return category;
  }

  public async find(
    restaurant_id: string,
  ): Promise<FoodCategory[] | undefined> {
    const categories = this.ormRepository.find({ where: { restaurant_id } });

    return categories;
  }

  public async delete(category_id: string): Promise<void> {
    const id = JSON.stringify(category_id).replace(/"/g, '');

    await this.ormRepository.delete(id);
  }

  public async save(category: FoodCategory): Promise<FoodCategory> {
    return this.ormRepository.save(category);
  }
}

export default FoodCategoriesRepository;
