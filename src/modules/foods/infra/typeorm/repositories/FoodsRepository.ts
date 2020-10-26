import {
  getMongoRepository,
  In,
  EntityRepository,
  MongoRepository,
} from 'typeorm';
import Food from '@modules/foods/infra/typeorm/schemas/Food';
import Restaurant from '@modules/restaurants/infra/typeorm/schemas/Restaurant';

import IFoodsRepository from '@modules/foods/repositories/IFoodsRepository';
import ICreateFoodDTO from '@modules/foods/dtos/ICreateFoodDTO';
import Category from '@modules/categories/infra/typeorm/schemas/Category';
import FoodCategory from '@modules/foods/infra/typeorm/schemas/FoodCategory';

class FoodsRepository implements IFoodsRepository {
  private ormRepository: MongoRepository<Food>;
  constructor() {
    this.ormRepository = getMongoRepository(Food);
  }

  public async create(data: ICreateFoodDTO): Promise<Food> {
    const food = this.ormRepository.create(data);

    await this.ormRepository.save(food);

    return food;
  }

  public async find(
    restaurant: Restaurant,
    category: FoodCategory,
  ): Promise<Food[]> {
    const foods = await this.ormRepository.find({
      where: { restaurant, category },
    });

    return foods;
  }

  public async findOneFood(food_name: string): Promise<Food | undefined> {
    const food = await this.ormRepository.findOne({
      where: { title: food_name },
    });

    return food;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default FoodsRepository;
