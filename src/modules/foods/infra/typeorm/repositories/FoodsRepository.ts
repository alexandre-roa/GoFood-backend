import fs from 'fs';
import {
  getMongoRepository,
  In,
  EntityRepository,
  MongoRepository,
} from 'typeorm';
import Food from '@modules/foods/infra/typeorm/schemas/Food';
import FoodCategory from '@modules/foods/infra/typeorm/schemas/FoodCategory';

import IFoodsRepository from '@modules/foods/repositories/IFoodsRepository';
import ICreateFoodDTO from '@modules/foods/dtos/ICreateFoodDTO';

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

  public async find(): Promise<Food[]> {
    const foods = await this.ormRepository.find();

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
